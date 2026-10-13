-- CẬP NHẬT: Khoa / Phòng xem được tồn kho (kể cả mặt hàng đã hết), chỉ tính hàng CÒN HẠN.
-- Không lộ giá, số lô, nhà cung cấp, vụ án. Hóa chất Độc bảng A và Tiền chất ma túy vẫn ẩn.
-- Chạy 1 lần trong Supabase -> SQL Editor -> Run.

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
      SELECT COALESCE(SUM(CASE WHEN (b ->> 'quantity') ~ '^-?[0-9]+([.][0-9]+)?$'
                               THEN (b ->> 'quantity')::NUMERIC ELSE 0 END), 0) AS qty
        FROM jsonb_array_elements(
          CASE WHEN jsonb_typeof(it -> 'batches') = 'array' THEN it -> 'batches' ELSE '[]'::jsonb END) b
       -- Không tính lô đã hết hạn (lô không ghi hạn coi như còn hạn)
       WHERE NOT (COALESCE(b ->> 'expiryDate', '') ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
                  AND (b ->> 'expiryDate') < to_char(CURRENT_DATE, 'YYYY-MM-DD'))
    ) q
   WHERE fi.id = 'current_database'
     AND COALESCE(it ->> 'hazardLevel', '') NOT ILIKE '%bảng A%'
     AND COALESCE(it ->> 'hazardLevel', '') NOT ILIKE '%tiền chất%';
$$;
REVOKE ALL ON FUNCTION public.get_public_stock() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_stock() TO anon, authenticated;
