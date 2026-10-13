-- =====================================================================
-- ForensicStore Pro - NÂNG CẤP BẢO MẬT CƠ SỞ DỮ LIỆU SUPABASE
-- Chạy toàn bộ file này 1 lần trong Supabase -> SQL Editor -> Run.
-- Chạy lại nhiều lần cũng an toàn (không mất dữ liệu kho).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. DANH SÁCH TÀI KHOẢN THỦ KHO / QUẢN TRỊ ĐƯỢC PHÉP VÀO KHO
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_admins (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT,
  full_name  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;
-- Không tạo policy nào: bảng này không đọc / sửa được qua API,
-- chỉ thêm / bớt bằng SQL Editor (xem mục 7).
REVOKE ALL ON public.app_admins FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.app_admins WHERE user_id = auth.uid());
$$;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- ---------------------------------------------------------------------
-- 2. BẢNG DỮ LIỆU KHO CHÍNH: CHỈ THỦ KHO ĐÃ ĐĂNG NHẬP MỚI ĐỌC / GHI
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.forensic_inventory (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.forensic_inventory ENABLE ROW LEVEL SECURITY;

-- Xóa chính sách cũ "ai cũng đọc/ghi được"
DROP POLICY IF EXISTS "Allow public read/write" ON public.forensic_inventory;
DROP POLICY IF EXISTS "inv_admin_select" ON public.forensic_inventory;
DROP POLICY IF EXISTS "inv_admin_insert" ON public.forensic_inventory;
DROP POLICY IF EXISTS "inv_admin_update" ON public.forensic_inventory;

CREATE POLICY "inv_admin_select" ON public.forensic_inventory
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "inv_admin_insert" ON public.forensic_inventory
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "inv_admin_update" ON public.forensic_inventory
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
-- Cố ý KHÔNG có policy DELETE: không ai xóa được bản ghi kho qua API.

REVOKE ALL ON public.forensic_inventory FROM anon;
REVOKE DELETE, TRUNCATE ON public.forensic_inventory FROM authenticated;

-- ---------------------------------------------------------------------
-- 3. NHẬT KÝ THAY ĐỔI + BẢN LƯU PHIÊN BẢN (khôi phục khi bị ghi đè nhầm)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.forensic_inventory_history (
  history_id         BIGSERIAL PRIMARY KEY,
  record_id          TEXT,
  operation          TEXT,
  changed_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  changed_by         UUID,
  changed_by_email   TEXT,
  items_count        INT,
  transactions_count INT,
  requisitions_count INT,
  old_data           JSONB   -- bản dữ liệu TRƯỚC khi sửa (lưu tối đa 5 phút / bản, giữ 150 bản gần nhất)
);
ALTER TABLE public.forensic_inventory_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "hist_admin_select" ON public.forensic_inventory_history;
CREATE POLICY "hist_admin_select" ON public.forensic_inventory_history
  FOR SELECT TO authenticated USING (public.is_admin());
-- Không ai được thêm / sửa / xóa nhật ký qua API (chỉ trigger ghi).
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.forensic_inventory_history FROM anon, authenticated;
REVOKE ALL ON public.forensic_inventory_history FROM anon;

CREATE OR REPLACE FUNCTION public.fi_json_len(j JSONB)
RETURNS INT LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE WHEN jsonb_typeof(j) = 'array' THEN jsonb_array_length(j) ELSE 0 END;
$$;

CREATE OR REPLACE FUNCTION public.fi_before_write()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := NOW();   -- giờ do máy chủ ghi, không tin giờ của trình duyệt
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.fi_log_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  last_snapshot TIMESTAMPTZ;
  keep_snapshot BOOLEAN := FALSE;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    SELECT MAX(changed_at) INTO last_snapshot
      FROM public.forensic_inventory_history
     WHERE record_id = OLD.id AND old_data IS NOT NULL;
    keep_snapshot := (last_snapshot IS NULL OR last_snapshot < NOW() - INTERVAL '5 minutes');
  END IF;

  INSERT INTO public.forensic_inventory_history
    (record_id, operation, changed_by, changed_by_email,
     items_count, transactions_count, requisitions_count, old_data)
  VALUES
    (NEW.id, TG_OP, auth.uid(), auth.jwt() ->> 'email',
     public.fi_json_len(NEW.data -> 'items'),
     public.fi_json_len(NEW.data -> 'transactions'),
     public.fi_json_len(NEW.data -> 'requisitions'),
     CASE WHEN keep_snapshot THEN OLD.data ELSE NULL END);

  -- Chỉ giữ 150 bản lưu dữ liệu gần nhất (dòng nhật ký ai-sửa-lúc-nào vẫn giữ mãi)
  UPDATE public.forensic_inventory_history
     SET old_data = NULL
   WHERE old_data IS NOT NULL
     AND history_id NOT IN (
       SELECT history_id FROM public.forensic_inventory_history
        WHERE old_data IS NOT NULL
        ORDER BY history_id DESC LIMIT 150);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_fi_before_write ON public.forensic_inventory;
CREATE TRIGGER trg_fi_before_write
  BEFORE INSERT OR UPDATE ON public.forensic_inventory
  FOR EACH ROW EXECUTE FUNCTION public.fi_before_write();

DROP TRIGGER IF EXISTS trg_fi_log_change ON public.forensic_inventory;
CREATE TRIGGER trg_fi_log_change
  AFTER INSERT OR UPDATE ON public.forensic_inventory
  FOR EACH ROW EXECUTE FUNCTION public.fi_log_change();

-- ---------------------------------------------------------------------
-- 4. HỘP THƯ PHIẾU ĐỀ XUẤT CỦA KHOA / PHÒNG (KHÔNG CẦN ĐĂNG NHẬP)
--    Người ngoài chỉ được GỬI, không được xem / sửa / xóa phiếu nào.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.public_requisitions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payload    JSONB NOT NULL,
  CONSTRAINT pr_payload_object CHECK (jsonb_typeof(payload) = 'object'),
  CONSTRAINT pr_payload_size   CHECK (octet_length(payload::text) <= 20000),
  CONSTRAINT pr_items_count    CHECK (public.fi_json_len(payload -> 'items') BETWEEN 1 AND 50)
);
ALTER TABLE public.public_requisitions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pr_anyone_insert" ON public.public_requisitions;
DROP POLICY IF EXISTS "pr_admin_select" ON public.public_requisitions;
DROP POLICY IF EXISTS "pr_admin_delete" ON public.public_requisitions;
CREATE POLICY "pr_anyone_insert" ON public.public_requisitions
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "pr_admin_select" ON public.public_requisitions
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "pr_admin_delete" ON public.public_requisitions
  FOR DELETE TO authenticated USING (public.is_admin());
REVOKE ALL ON public.public_requisitions FROM anon;
GRANT INSERT ON public.public_requisitions TO anon;
REVOKE UPDATE, TRUNCATE ON public.public_requisitions FROM authenticated;

-- Chống spam: tối đa 20 phiếu / phút và 300 phiếu đang chờ trong hộp thư
CREATE OR REPLACE FUNCTION public.pr_rate_limit()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.public_requisitions
       WHERE created_at > NOW() - INTERVAL '1 minute') >= 20 THEN
    RAISE EXCEPTION 'Hệ thống đang nhận quá nhiều phiếu, vui lòng thử lại sau ít phút.';
  END IF;
  IF (SELECT COUNT(*) FROM public.public_requisitions) >= 300 THEN
    RAISE EXCEPTION 'Hộp thư phiếu đề xuất đã đầy, vui lòng báo Thủ kho.';
  END IF;
  NEW.id := gen_random_uuid();   -- không cho người gửi tự đặt id / thời gian
  NEW.created_at := NOW();
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_pr_rate_limit ON public.public_requisitions;
CREATE TRIGGER trg_pr_rate_limit
  BEFORE INSERT ON public.public_requisitions
  FOR EACH ROW EXECUTE FUNCTION public.pr_rate_limit();

-- ---------------------------------------------------------------------
-- 5. DANH SÁCH HÀNG CÒN TỒN CHO FORM ĐỀ XUẤT (chỉ tên, ĐVT, số lượng)
--    Không lộ giá, số lô, nhà cung cấp, vụ án, lịch sử nhập xuất.
--    Hóa chất Độc bảng A và Tiền chất ma túy KHÔNG hiện ra ngoài.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_public_stock()
RETURNS JSONB
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
           'id',          it ->> 'id',
           'code',        it ->> 'code',
           'name',        it ->> 'name',
           'unit',        it ->> 'unit',
           'warehouseId', it ->> 'warehouseId',
           'qty',         q.qty)), '[]'::jsonb)
    FROM public.forensic_inventory fi
    CROSS JOIN LATERAL jsonb_array_elements(
      CASE WHEN jsonb_typeof(fi.data -> 'items') = 'array' THEN fi.data -> 'items' ELSE '[]'::jsonb END) it
    CROSS JOIN LATERAL (
      SELECT COALESCE(SUM(CASE WHEN (b ->> 'quantity') ~ '^-?[0-9]+(\.[0-9]+)?$'
                               THEN (b ->> 'quantity')::NUMERIC ELSE 0 END), 0) AS qty
        FROM jsonb_array_elements(
          CASE WHEN jsonb_typeof(it -> 'batches') = 'array' THEN it -> 'batches' ELSE '[]'::jsonb END) b
    ) q
   WHERE fi.id = 'current_database'
     AND q.qty > 0
     AND COALESCE(it ->> 'hazardLevel', '') NOT ILIKE '%bảng A%'
     AND COALESCE(it ->> 'hazardLevel', '') NOT ILIKE '%tiền chất%';
$$;
REVOKE ALL ON FUNCTION public.get_public_stock() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_stock() TO anon, authenticated;

-- ---------------------------------------------------------------------
-- 6. BẬT ĐỒNG BỘ THỜI GIAN THỰC (Realtime vẫn tuân theo RLS ở trên)
-- ---------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables
                    WHERE pubname = 'supabase_realtime' AND tablename = 'forensic_inventory') THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.forensic_inventory;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables
                    WHERE pubname = 'supabase_realtime' AND tablename = 'public_requisitions') THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.public_requisitions;
    END IF;
  END IF;
END $$;

-- ---------------------------------------------------------------------
-- 7. CẤP QUYỀN THỦ KHO (chạy SAU khi đã tạo tài khoản trong
--    Authentication -> Users -> Add user). Sửa email rồi chạy riêng đoạn này:
-- ---------------------------------------------------------------------
-- INSERT INTO public.app_admins (user_id, email, full_name)
-- SELECT id, email, 'Lê Văn Quý' FROM auth.users WHERE email = 'email-cua-ban@gmail.com'
-- ON CONFLICT (user_id) DO NOTHING;
--
-- Thu hồi quyền một người:
-- DELETE FROM public.app_admins WHERE email = 'email-nguoi-do@gmail.com';
--
-- Xem nhật ký ai sửa kho, lúc nào:
-- SELECT changed_at, changed_by_email, operation, items_count, transactions_count,
--        (old_data IS NOT NULL) AS co_ban_luu
--   FROM public.forensic_inventory_history ORDER BY history_id DESC LIMIT 50;
