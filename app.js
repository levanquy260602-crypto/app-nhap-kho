/**
 * ForensicStore Pro - Single Standalone Engine
 * Tương thích 100% chạy trực tiếp file:// trên mọi trình duyệt (Chrome, Edge, Cốc Cốc, Firefox)
 * Không cần web server, không bị lỗi CORS module
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DATA & STORAGE MODULE
  // ==========================================
  const STORAGE_KEY = 'forensic_inventory_db_v1';

  const DEPARTMENTS = [
    { id: 'PB_HANHCHINH', name: 'Phòng Tổ chức - Hành chính - Quản trị', code: 'HC-QT', desc: 'Văn thư, tiếp nhận hồ sơ, quản lý tài sản, lưu trữ án' },
    { id: 'PB_TAICHINH', name: 'Phòng Kế hoạch - Tài chính', code: 'KH-TC', desc: 'Kế hoạch mua sắm, dự trù ngân sách hóa chất, vật tư' },
    { id: 'K_GIAMDINH', name: 'Khoa Giám định', code: 'GĐ', desc: 'Khám nghiệm tử thi, giám định tổn thương cơ thể, thương tích' },
    { id: 'K_XN_ADN', name: 'Khoa Xét nghiệm ADN', code: 'XN-ADN', desc: 'Tách chiết gen, khuếch đại PCR, định danh cá thể, huyết thống' },
    { id: 'K_HOAPHAP', name: 'Khoa Hóa pháp', code: 'HP', desc: 'Phân tích ma túy, nồng độ cồn, độc chất, hóa chất giám định' },
    { id: 'K_GPB', name: 'Khoa Giải phẫu bệnh', code: 'GPB', desc: 'Mô bệnh học, sinh thiết vi thể, chẩn đoán mô học tử thi' },
    { id: 'PB_GIAMDOC', name: 'Ban Giám đốc Trung tâm', code: 'BGD', desc: 'Ký duyệt kết luận giám định, phê duyệt mua sắm' }
  ];

  const WAREHOUSES = {
    CHEMICAL: {
      id: 'CHEMICAL',
      name: 'Kho Hóa chất, Sinh phẩm & Vật tư Giám định',
      shortName: 'Kho Hóa chất - Sinh phẩm',
      icon: 'flask',
      color: '#0d9488',
      categories: [
        'Sinh phẩm & Kit ADN',
        'Que test & Kit thử ma túy nhanh',
        'Hóa chất phân tích độc chất & Sắc ký',
        'Chất chuẩn & Hóa chất tinh khiết',
        'Hóa chất bảo quản mô & Giải phẫu bệnh',
        'Dụng cụ phẫu thuật & Mổ tử thi',
        'Vật tư thu thập & Bảo quản mẫu vật',
        'Vật tư tiêu hao xét nghiệm & BHLĐ'
      ]
    },
    OFFICE: {
      id: 'OFFICE',
      name: 'Kho Văn phòng phẩm & Vật tư Hành chính',
      shortName: 'Kho Văn phòng phẩm',
      icon: 'folder',
      color: '#3b82f6',
      categories: [
        'Giấy in bản kết luận & Tài liệu',
        'Bìa còng & Hồ sơ lưu trữ án tích',
        'Mực in & Vật tư thiết bị văn phòng',
        'Tem, nhãn & Băng dính niêm phong',
        'Bút, dấu & Dụng cụ văn phòng',
        'Sổ nhật ký & Biểu mẫu nghiệp vụ',
        'Vật phẩm phục vụ phòng ban'
      ]
    }
  };

  const INITIAL_DATA = {
    settings: {
      parentOrg: 'SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH',
      orgName: 'TRUNG TÂM PHÁP Y THÀNH PHỐ',
      orgAddress: 'Cụm Y tế Tân Kiên, xã Tân Nhựt, TPHCM',
      orgPhone: '(028) 3855.9922 - 3855.9923',
      managerName: '',
      headOfAdmin: '',
      storekeeper: 'Cử nhân Lê Văn Quý',
      lastBackup: null,
      theme: 'light',
      cloudSync: {
        enabled: false,
        supabaseUrl: '',
        supabaseKey: '',
        autoSync: true,
        lastSyncTime: null
      }
    },
    items: [
      {
        id: 'HC-001',
        warehouseId: 'CHEMICAL',
        code: 'HC-ADN-01',
        name: 'Bộ kít khuếch đại gen Identifiler Plus PCR Amplification Kit',
        category: 'Sinh phẩm & Kit ADN',
        chemicalFormula: 'N/A',
        casNumber: 'N/A',
        manufacturer: 'Applied Biosystems / Thermo Fisher',
        origin: 'Mỹ',
        packingSpec: 'Hộp 200 phản ứng (Reactions)',
        unit: 'Bộ',
        minStock: 2,
        maxStock: 8,
        storageCondition: 'Âm sâu -20°C (Tránh ánh sáng)',
        hazardLevel: 'Thường',
        location: 'Tủ đông âm sâu TĐ-01 / Ngăn 2',
        notes: 'Phục vụ khuếch đại 16 locus STR trong giám định ADN hình sự và huyết thống',
        batches: [
          {
            lotNumber: 'ID-8842',
            expiryDate: '2026-09-15',
            quantity: 2,
            unitPrice: 38500000,
            receivedDate: '2025-10-10',
            supplier: 'Công ty CP Thiết bị Y sinh Á Châu'
          },
          {
            lotNumber: 'ID-9910',
            expiryDate: '2027-06-30',
            quantity: 3,
            unitPrice: 39200000,
            receivedDate: '2026-03-20',
            supplier: 'Công ty CP Thiết bị Y sinh Á Châu'
          }
        ]
      },
      {
        id: 'HC-002',
        warehouseId: 'CHEMICAL',
        code: 'HC-ADN-02',
        name: 'Bộ kít tách chiết ADN PrepFiler Express Forensic DNA Extraction Kit',
        category: 'Sinh phẩm & Kit ADN',
        chemicalFormula: 'N/A',
        casNumber: 'N/A',
        manufacturer: 'Applied Biosystems',
        origin: 'Mỹ',
        packingSpec: 'Hộp 52 mẫu (Cartridges)',
        unit: 'Hộp',
        minStock: 5,
        maxStock: 20,
        storageCondition: 'Nhiệt độ phòng mát 15-25°C',
        hazardLevel: 'Thường',
        location: 'Kệ A1 / Tầng 2',
        notes: 'Tách chiết mẫu ADN vết máu, lông tóc, xương tử thi cháy rữa',
        batches: [
          {
            lotNumber: 'PF-2026-08',
            expiryDate: '2026-12-30',
            quantity: 12,
            unitPrice: 14500000,
            receivedDate: '2026-02-15',
            supplier: 'Công ty TNHH Khoa Học Công Nghệ Mới'
          }
        ]
      },
      {
        id: 'HC-003',
        warehouseId: 'CHEMICAL',
        code: 'HC-TEST-01',
        name: 'Que test nhanh phát hiện ma túy 5 chân (MOP/MET/MDMA/THC/KET)',
        category: 'Que test & Kit thử ma túy nhanh',
        chemicalFormula: 'N/A',
        casNumber: 'N/A',
        manufacturer: 'FaStep / Acon Labs',
        origin: 'Mỹ / Trung Quốc',
        packingSpec: 'Hộp 25 test / test cassette',
        unit: 'Hộp',
        minStock: 10,
        maxStock: 50,
        storageCondition: 'Nhiệt độ phòng 2-30°C (Khô ráo)',
        hazardLevel: 'Thường',
        location: 'Kệ B2 / Tầng 1',
        notes: 'Test nhanh nước tiểu/dịch tử thi sàng lọc Morphine, Đá, Thuốc lắc, Cần sa, Ketamine',
        batches: [
          {
            lotNumber: 'FST-5519',
            expiryDate: '2027-05-20',
            quantity: 35,
            unitPrice: 650000,
            receivedDate: '2026-04-12',
            supplier: 'Công ty Dược phẩm & Trang thiết bị Y tế Sài Gòn'
          }
        ]
      },
      {
        id: 'HC-004',
        warehouseId: 'CHEMICAL',
        code: 'HC-DC-01',
        name: 'Methanol sắc ký HPLC Grade (Độ tinh khiết >= 99.9%)',
        category: 'Hóa chất phân tích độc chất & Sắc ký',
        chemicalFormula: 'CH3OH',
        casNumber: '67-56-1',
        manufacturer: 'Merck KGaA',
        origin: 'Đức',
        packingSpec: 'Chai thủy tinh tối màu 2.5 Lít',
        unit: 'Chai',
        minStock: 6,
        maxStock: 25,
        storageCondition: 'Tủ chống cháy nổ, thông gió tốt',
        hazardLevel: 'Độc bảng B & Dễ cháy',
        location: 'Tủ hóa chất an toàn CH-01',
        notes: 'Dung môi chạy máy sắc ký khí ghép khối phổ GC-MS phân tích độc chất',
        batches: [
          {
            lotNumber: 'ME-99120',
            expiryDate: '2027-12-31',
            quantity: 14,
            unitPrice: 850000,
            receivedDate: '2026-01-18',
            supplier: 'Đại lý phân phối Merck Việt Nam'
          }
        ]
      },
      {
        id: 'HC-005',
        warehouseId: 'CHEMICAL',
        code: 'HC-DC-02',
        name: 'Chất chuẩn nồng độ cồn Ethanol Reference Standard 100mg/dL',
        category: 'Chất chuẩn & Hóa chất tinh khiết',
        chemicalFormula: 'C2H5OH in Water',
        casNumber: '64-17-5',
        manufacturer: 'Cerilliant',
        origin: 'Mỹ',
        packingSpec: 'Hộp 10 ống x 1.2 mL ampoule',
        unit: 'Hộp',
        minStock: 4,
        maxStock: 15,
        storageCondition: 'Bảo quản lạnh 2-8°C',
        hazardLevel: 'Dễ cháy',
        location: 'Tủ mát bảo quản sinh phẩm TM-02',
        notes: 'Hiệu chuẩn máy đo nồng độ cồn trong máu nạn nhân TNGT và tử thi',
        batches: [
          {
            lotNumber: 'ET-4432',
            expiryDate: '2026-09-05',
            quantity: 3,
            unitPrice: 3200000,
            receivedDate: '2025-09-10',
            supplier: 'Công ty TNHH Khoa Học Công Nghệ Mới'
          },
          {
            lotNumber: 'ET-5510',
            expiryDate: '2027-08-15',
            quantity: 5,
            unitPrice: 3300000,
            receivedDate: '2026-05-10',
            supplier: 'Công ty TNHH Khoa Học Công Nghệ Mới'
          }
        ]
      },
      {
        id: 'HC-006',
        warehouseId: 'CHEMICAL',
        code: 'HC-DC-03',
        name: 'Chất chuẩn Paraquat Dichloride 100 µg/mL',
        category: 'Chất chuẩn & Hóa chất tinh khiết',
        chemicalFormula: 'C12H14Cl2N2',
        casNumber: '1910-42-5',
        manufacturer: 'Supelco / Sigma-Aldrich',
        origin: 'Đức',
        packingSpec: 'Lọ 1 mL ampoule',
        unit: 'Lọ',
        minStock: 3,
        maxStock: 10,
        storageCondition: 'Bảo quản lạnh 2-8°C, Tủ khóa độc',
        hazardLevel: 'Độc Bảng A (Cực độc)',
        location: 'Két an toàn hóa chất độc K-01',
        notes: 'Giám định các ca tử vong nghi ngộ độc thuốc diệt cỏ cháy Paraquat',
        batches: [
          {
            lotNumber: 'PQ-1102',
            expiryDate: '2027-04-20',
            quantity: 6,
            unitPrice: 2800000,
            receivedDate: '2026-04-05',
            supplier: 'Đại lý phân phối Merck Việt Nam'
          }
        ]
      },
      {
        id: 'HC-007',
        warehouseId: 'CHEMICAL',
        code: 'HC-GPB-01',
        name: 'Dung dịch Formalin 10% đệm trung tính (Neutral Buffered Formalin)',
        category: 'Hóa chất bảo quản mô & Giải phẫu bệnh',
        chemicalFormula: 'CH2O 10%',
        casNumber: '50-00-0',
        manufacturer: 'Việt Nam / Y tế',
        origin: 'Việt Nam',
        packingSpec: 'Can nhựa 5 Lít',
        unit: 'Can',
        minStock: 6,
        maxStock: 30,
        storageCondition: 'Nhiệt độ phòng thông thoáng, tránh ánh sáng',
        hazardLevel: 'Ăn mòn & Độc hại',
        location: 'Khu hóa chất thô Kho C',
        notes: 'Bảo quản bệnh phẩm tim, gan, phổi, não, thận tử thi gửi giám định mô bệnh học',
        batches: [
          {
            lotNumber: 'FOR-2025-08',
            expiryDate: '2026-08-01',
            quantity: 2,
            unitPrice: 240000,
            receivedDate: '2025-08-05',
            supplier: 'Công ty CP Hóa chất Y tế Miền Nam'
          },
          {
            lotNumber: 'FOR-2026-03',
            expiryDate: '2027-08-30',
            quantity: 16,
            unitPrice: 260000,
            receivedDate: '2026-03-15',
            supplier: 'Công ty CP Hóa chất Y tế Miền Nam'
          }
        ]
      },
      {
        id: 'HC-008',
        warehouseId: 'CHEMICAL',
        code: 'HC-TT-01',
        name: 'Lưỡi dao mổ vô trùng số 22 (Dùng cho khám nghiệm tử thi)',
        category: 'Dụng cụ phẫu thuật & Mổ tử thi',
        chemicalFormula: 'Thép Carbon y tế',
        casNumber: 'N/A',
        manufacturer: 'Kiato',
        origin: 'Ấn Độ',
        packingSpec: 'Hộp 100 lưỡi bọc giấy bạc tiệt trùng',
        unit: 'Hộp',
        minStock: 8,
        maxStock: 30,
        storageCondition: 'Khô ráo',
        hazardLevel: 'Thường',
        location: 'Kệ D1 / Tầng 3',
        notes: 'Lắp cán dao số 4 phục vụ rạch da, bộc lộ hộp sọ và nội tạng tử thi',
        batches: [
          {
            lotNumber: 'KT-2026A',
            expiryDate: '2029-01-01',
            quantity: 22,
            unitPrice: 185000,
            receivedDate: '2026-02-10',
            supplier: 'Công ty TNHH Dụng Cụ Y Tế Việt Đức'
          }
        ]
      },
      {
        id: 'HC-009',
        warehouseId: 'CHEMICAL',
        code: 'HC-TT-02',
        name: 'Túi đựng thi thể pháp y chuyên dụng chống thấm có 6 quai khiêng',
        category: 'Vật tư thu thập & Bảo quản mẫu vật',
        chemicalFormula: 'PVC / PEVA Heavy Duty',
        casNumber: 'N/A',
        manufacturer: 'Forensic Armor',
        origin: 'Việt Nam',
        packingSpec: 'Cái (Kích thước 220cm x 90cm, khóa U-shape)',
        unit: 'Cái',
        minStock: 20,
        maxStock: 100,
        storageCondition: 'Nhiệt độ phòng',
        hazardLevel: 'Thường',
        location: 'Kho Vật tư Tử thi / Kệ E',
        notes: 'Tiếp nhận, bảo quản và vận chuyển tử thi tai nạn, đuối nước, phân hủy',
        batches: [
          {
            lotNumber: 'TB-2026',
            expiryDate: '2031-12-31',
            quantity: 48,
            unitPrice: 320000,
            receivedDate: '2026-01-05',
            supplier: 'Công ty TNHH Sản Xuất Thiết Bị Y Tế Hưng Thịnh'
          }
        ]
      },
      {
        id: 'HC-010',
        warehouseId: 'CHEMICAL',
        code: 'HC-BHLD-01',
        name: 'Găng tay cao su y tế không bột Nitrile siêu bền (Dành cho mổ tử thi)',
        category: 'Vật tư tiêu hao xét nghiệm & BHLĐ',
        chemicalFormula: 'Nitrile',
        casNumber: 'N/A',
        manufacturer: 'VGlove / VRG Khải Hoàn',
        origin: 'Việt Nam',
        packingSpec: 'Hộp 100 chiếc (50 đôi, Size M)',
        unit: 'Hộp',
        minStock: 15,
        maxStock: 80,
        storageCondition: 'Khô ráo, tránh ánh nắng trực tiếp',
        hazardLevel: 'Thường',
        location: 'Kệ B1 / Tầng 2',
        notes: 'Bảo hộ chống lây nhiễm sinh học cho Giám định viên và Kỹ thuật viên mổ xác',
        batches: [
          {
            lotNumber: 'GL-2026-M',
            expiryDate: '2029-05-10',
            quantity: 3,
            unitPrice: 110000,
            receivedDate: '2026-01-10',
            supplier: 'Công ty Dược phẩm & Trang thiết bị Y tế Sài Gòn'
          }
        ]
      },
      {
        id: 'VPP-001',
        warehouseId: 'OFFICE',
        code: 'VPP-GIAY-01',
        name: 'Giấy in A4 Double A ĐL 80gsm (Chuyên in Bản Kết Luận Giám Định Pháp Y)',
        category: 'Giấy in bản kết luận & Tài liệu',
        chemicalFormula: 'N/A',
        casNumber: 'N/A',
        manufacturer: 'Double A',
        origin: 'Thái Lan',
        packingSpec: 'Ram (500 tờ) / Thùng 5 Ram',
        unit: 'Ram',
        minStock: 25,
        maxStock: 100,
        storageCondition: 'Khô ráo, kê pallet cách đất',
        hazardLevel: 'Thường',
        location: 'Kho VPP / Kệ Giấy G1',
        notes: 'Giấy trắng dày 80gsm tiêu chuẩn lưu trữ hồ sơ tài liệu cơ quan tố tụng 50 năm',
        batches: [
          {
            lotNumber: 'DA-80-26',
            expiryDate: '2030-12-31',
            quantity: 65,
            unitPrice: 98000,
            receivedDate: '2026-03-01',
            supplier: 'Công ty CP Văn phòng phẩm Hồng Hà'
          }
        ]
      },
      {
        id: 'VPP-002',
        warehouseId: 'OFFICE',
        code: 'VPP-BIA-01',
        name: 'Bìa còng 7cm Kokuyo khổ A4 (Lưu trữ hồ sơ án giám định tử thi)',
        category: 'Bìa còng & Hồ sơ lưu trữ án tích',
        chemicalFormula: 'N/A',
        casNumber: 'N/A',
        manufacturer: 'Kokuyo',
        origin: 'Nhật Bản / Việt Nam',
        packingSpec: 'Chiếc / Thùng 30 chiếc',
        unit: 'Chiếc',
        minStock: 30,
        maxStock: 150,
        storageCondition: 'Khô ráo',
        hazardLevel: 'Thường',
        location: 'Kho VPP / Kệ Bìa B1',
        notes: 'Lưu trữ tài liệu giám định pháp y theo từng năm và mã số vụ án',
        batches: [
          {
            lotNumber: 'KOK-7CM',
            expiryDate: '2035-12-31',
            quantity: 85,
            unitPrice: 46000,
            receivedDate: '2026-02-20',
            supplier: 'Công ty TNHH Thiết Bị Văn Phòng Tân Tiến'
          }
        ]
      },
      {
        id: 'VPP-003',
        warehouseId: 'OFFICE',
        code: 'VPP-MUC-01',
        name: 'Hộp mực máy in HP Laserjet 2900 / Canon 303 (Cartridge 303)',
        category: 'Mực in & Vật tư thiết bị văn phòng',
        chemicalFormula: 'N/A',
        casNumber: 'N/A',
        manufacturer: 'Canon / OEM Premium',
        origin: 'Việt Nam',
        packingSpec: 'Hộp 1 chiếc (In ~2.000 trang)',
        unit: 'Hộp',
        minStock: 5,
        maxStock: 20,
        storageCondition: 'Khô ráo, tránh ánh sáng',
        hazardLevel: 'Thường',
        location: 'Kho VPP / Tủ mực M1',
        notes: 'Thay thế máy in các khoa phòng in kết luận và phiếu tiếp nhận mẫu',
        batches: [
          {
            lotNumber: 'CAN-303-26',
            expiryDate: '2028-12-31',
            quantity: 2,
            unitPrice: 320000,
            receivedDate: '2026-01-15',
            supplier: 'Công ty TNHH Máy Tính & Thiết Bị VP Sài Gòn'
          }
        ]
      },
      {
        id: 'VPP-004',
        warehouseId: 'OFFICE',
        code: 'VPP-TEM-01',
        name: 'Tem niêm phong mẫu vật pháp y vỡ khi bóc (Tamper Evident Security Seal)',
        category: 'Tem, nhãn & Băng dính niêm phong',
        chemicalFormula: 'Decal vỡ bảo mật',
        casNumber: 'N/A',
        manufacturer: 'Bảo Minh An',
        origin: 'Việt Nam',
        packingSpec: 'Tập 100 tem (In logo và dòng chữ TRUNG TÂM PHÁP Y)',
        unit: 'Tập',
        minStock: 15,
        maxStock: 60,
        storageCondition: 'Khô ráo, nhiệt độ thường',
        hazardLevel: 'Thường',
        location: 'Kho VPP / Ngăn Kéo An Toàn V1',
        notes: 'Niêm phong túi chứa phủ tạng, hộp mẫu máu, vật chứng hình sự',
        batches: [
          {
            lotNumber: 'TEM-PY-2026',
            expiryDate: '2030-01-01',
            quantity: 42,
            unitPrice: 85000,
            receivedDate: '2026-03-10',
            supplier: 'Công ty In Ấn & Tem Bảo Mật Sài Gòn'
          }
        ]
      },
      {
        id: 'VPP-005',
        warehouseId: 'OFFICE',
        code: 'VPP-BUT-01',
        name: 'Bút dạ lông dầu đen Sharpie Industrial (Ghi mã mẫu không trôi trong Formalin)',
        category: 'Bút, dấu & Dụng cụ văn phòng',
        chemicalFormula: 'N/A',
        casNumber: 'N/A',
        manufacturer: 'Sharpie',
        origin: 'Mỹ',
        packingSpec: 'Hộp 12 cây (Ngòi Fine Point chịu nhiệt & hóa chất)',
        unit: 'Hộp',
        minStock: 6,
        maxStock: 25,
        storageCondition: 'Nhiệt độ thường',
        hazardLevel: 'Thường',
        location: 'Kho VPP / Kệ Bút B2',
        notes: 'Dùng cho KTV và Giám định viên ghi thông tin nhãn mẫu mô, lọ phủ tạng',
        batches: [
          {
            lotNumber: 'SH-IND-26',
            expiryDate: '2029-12-31',
            quantity: 18,
            unitPrice: 360000,
            receivedDate: '2026-02-18',
            supplier: 'Công ty TNHH Thiết Bị Văn Phòng Tân Tiến'
          }
        ]
      }
    ],
    transactions: [
      {
        id: 'TR-IN-001',
        code: 'PN-20260412-001',
        type: 'IN',
        warehouseId: 'CHEMICAL',
        date: '2026-04-12',
        supplier: 'Công ty Dược phẩm & Trang thiết bị Y tế Sài Gòn',
        invoiceNumber: 'HĐ-88942 / HĐĐT',
        contractNumber: 'HĐMS-04/2026/TTPY',
        deliverer: 'Nguyễn Văn Đạt (Đại diện NCC)',
        receiver: 'Lê Văn Quý (Thủ kho)',
        approver: 'BS.CKII. Nguyễn Văn Hùng (Giám đốc)',
        reason: 'Nhập mua sắm thường quy quý II/2026 phục vụ công tác giám định độc chất ma túy',
        totalAmount: 22750000,
        items: [
          {
            itemId: 'HC-003',
            itemCode: 'HC-TEST-01',
            itemName: 'Que test nhanh phát hiện ma túy 5 chân (MOP/MET/MDMA/THC/KET)',
            unit: 'Hộp',
            lotNumber: 'FST-5519',
            expiryDate: '2027-05-20',
            quantity: 35,
            unitPrice: 650000,
            amount: 22750000
          }
        ]
      },
      {
        id: 'TR-OUT-001',
        code: 'PX-20260515-001',
        type: 'OUT',
        warehouseId: 'CHEMICAL',
        date: '2026-05-15',
        departmentId: 'K_HOAPHAP',
        departmentName: 'Khoa Hóa pháp',
        caseCode: 'Vụ án #HS-2026-089 / CA Quận 1 trưng cầu',
        deliverer: 'Lê Văn Quý (Thủ kho)',
        receiver: 'CN. Phạm Thị Mai (KTV Hóa pháp)',
        approver: 'ThS. Nguyễn Hoàng Long (Trưởng khoa Hóa pháp)',
        reason: 'Xuất hóa chất dung môi và que test sàng lọc vụ án ngộ độc ma túy tập thể quán Bar Club 99',
        totalAmount: 6450000,
        items: [
          {
            itemId: 'HC-003',
            itemCode: 'HC-TEST-01',
            itemName: 'Que test nhanh phát hiện ma túy 5 chân (MOP/MET/MDMA/THC/KET)',
            unit: 'Hộp',
            lotNumber: 'FST-5519',
            expiryDate: '2027-05-20',
            quantity: 5,
            unitPrice: 650000,
            amount: 3250000
          },
          {
            itemId: 'HC-005',
            itemCode: 'HC-DC-02',
            itemName: 'Chất chuẩn nồng độ cồn Ethanol Reference Standard 100mg/dL',
            unit: 'Hộp',
            lotNumber: 'ET-4432',
            expiryDate: '2026-09-05',
            quantity: 1,
            unitPrice: 3200000,
            amount: 3200000
          }
        ]
      },
      {
        id: 'TR-OUT-002',
        code: 'PX-20260601-002',
        type: 'OUT',
        warehouseId: 'OFFICE',
        date: '2026-06-01',
        departmentId: 'PB_HANHCHINH',
        departmentName: 'Phòng Tổ chức - Hành chính - Quản trị',
        caseCode: 'Cấp phát định kỳ Quý II/2026',
        deliverer: 'Lê Văn Quý (Thủ kho)',
        receiver: 'Trần Thị Kim Oanh (Trưởng phòng TCHC)',
        approver: 'BS.CKII. Nguyễn Văn Hùng (Giám đốc)',
        reason: 'Cấp phát giấy in bản kết luận giám định và bìa hồ sơ lưu trữ án tích 6 tháng đầu năm',
        totalAmount: 1840000,
        items: [
          {
            itemId: 'VPP-001',
            itemCode: 'VPP-GIAY-01',
            itemName: 'Giấy in A4 Double A ĐL 80gsm (Chuyên in Bản Kết Luận Giám Định Pháp Y)',
            unit: 'Ram',
            lotNumber: 'DA-80-26',
            expiryDate: '2030-12-31',
            quantity: 10,
            unitPrice: 98000,
            amount: 980000
          },
          {
            itemId: 'VPP-002',
            itemCode: 'VPP-BIA-01',
            itemName: 'Bìa còng 7cm Kokuyo khổ A4 (Lưu trữ hồ sơ án giám định tử thi)',
            unit: 'Chiếc',
            lotNumber: 'KOK-7CM',
            expiryDate: '2035-12-31',
            quantity: 15,
            unitPrice: 46000,
            amount: 690000
          },
          {
            itemId: 'VPP-005',
            itemCode: 'VPP-BUT-01',
            itemName: 'Bút dạ lông dầu đen Sharpie Industrial (Ghi mã mẫu không trôi trong Formalin)',
            unit: 'Hộp',
            lotNumber: 'SH-IND-26',
            expiryDate: '2029-12-31',
            quantity: 1,
            unitPrice: 360000,
            amount: 360000
          }
        ]
      }
    ]
  };

  class ForensicStorage {
    constructor() {
      this.data = null;
    }

    init() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.data = JSON.parse(stored);
          if (!this.data.settings) {
            this.data.settings = { ...INITIAL_DATA.settings };
            this.save();
          } else {
            // Tự động cập nhật cơ quan chủ quản cấp trên Sở Y Tế TPHCM
            if (!this.data.settings.parentOrg || this.data.settings.parentOrg.includes('ỦY BAN NHÂN DÂN')) {
              this.data.settings.parentOrg = 'SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH';
            }
            // Tự động cập nhật địa chỉ cơ quan mới nếu còn lưu địa chỉ cũ
            if (!this.data.settings.orgAddress || this.data.settings.orgAddress.includes('Nguyễn Tri Phương')) {
              this.data.settings.orgAddress = 'Cụm Y tế Tân Kiên, xã Tân Nhựt, TPHCM';
            }
            // Xóa tên lãnh đạo mẫu cũ để người dùng ký và ghi tay
            if (this.data.settings.managerName === 'BS.CKII. Nguyễn Văn Hùng' || !this.data.settings.managerName) {
              this.data.settings.managerName = '';
            }
            if (this.data.settings.headOfAdmin === 'ThS. Trần Thị Kim Oanh' || !this.data.settings.headOfAdmin) {
              this.data.settings.headOfAdmin = '';
            }
            this.save();
          }
        } else {
          this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
          this.save();
        }
      } catch (e) {
        console.warn('Lỗi đọc LocalStorage, dùng dữ liệu mẫu:', e);
        this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
        this.save();
      }
      return this.data;
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.error('Lỗi khi lưu dữ liệu:', e);
      }
    }

    getData() {
      if (!this.data) this.init();
      return this.data;
    }

    getItems(warehouseId = null) {
      const data = this.getData();
      if (!warehouseId || warehouseId === 'ALL') return data.items;
      return data.items.filter(item => item.warehouseId === warehouseId);
    }

    getItemById(id) {
      const data = this.getData();
      return data.items.find(item => item.id === id);
    }

    saveItem(item) {
      const data = this.getData();
      const index = data.items.findIndex(i => i.id === item.id);
      if (index >= 0) {
        data.items[index] = { ...data.items[index], ...item, updatedAt: new Date().toISOString() };
      } else {
        if (!item.id) {
          const prefix = item.warehouseId === 'CHEMICAL' ? 'HC' : 'VPP';
          item.id = `${prefix}-${Date.now().toString().slice(-5)}`;
        }
        item.createdAt = new Date().toISOString();
        data.items.unshift(item);
      }
      this.save();
      return item;
    }

    deleteItem(id) {
      const data = this.getData();
      data.items = data.items.filter(i => i.id !== id);
      this.save();
      this.triggerCloudAutoSync();
    }

    getTransactions(warehouseId = null, type = null) {
      const data = this.getData();
      return data.transactions.filter(tr => {
        const matchWarehouse = !warehouseId || warehouseId === 'ALL' || tr.warehouseId === warehouseId;
        const matchType = !type || type === 'ALL' || tr.type === type;
        return matchWarehouse && matchType;
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    createStockInTransaction(transaction) {
      const data = this.getData();
      transaction.id = `TR-IN-${Date.now()}`;
      transaction.type = 'IN';
      transaction.createdAt = new Date().toISOString();

      transaction.items.forEach(trItem => {
        const item = data.items.find(i => i.id === trItem.itemId);
        if (item) {
          if (!item.batches) item.batches = [];
          const existingBatch = item.batches.find(b => b.lotNumber === trItem.lotNumber);
          if (existingBatch) {
            existingBatch.quantity += Number(trItem.quantity);
            if (trItem.expiryDate) existingBatch.expiryDate = trItem.expiryDate;
            if (trItem.unitPrice) existingBatch.unitPrice = Number(trItem.unitPrice);
          } else {
            item.batches.push({
              lotNumber: trItem.lotNumber || 'LÔ-MỚI',
              expiryDate: trItem.expiryDate || '2030-12-31',
              quantity: Number(trItem.quantity),
              unitPrice: Number(trItem.unitPrice || 0),
              receivedDate: transaction.date,
              supplier: transaction.supplier
            });
          }
        }
      });

      data.transactions.unshift(transaction);
      this.save();
      this.triggerCloudAutoSync();
      return transaction;
    }

    createStockOutTransaction(transaction) {
      const data = this.getData();
      transaction.id = `TR-OUT-${Date.now()}`;
      transaction.type = 'OUT';
      transaction.createdAt = new Date().toISOString();

      transaction.items.forEach(trItem => {
        const item = data.items.find(i => i.id === trItem.itemId);
        if (item && item.batches) {
          let remainingToDeduct = Number(trItem.quantity);

          if (trItem.lotNumber) {
            const batch = item.batches.find(b => b.lotNumber === trItem.lotNumber);
            if (batch) {
              const deduct = Math.min(batch.quantity, remainingToDeduct);
              batch.quantity -= deduct;
              remainingToDeduct -= deduct;
            }
          }

          if (remainingToDeduct > 0) {
            item.batches.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
            for (const batch of item.batches) {
              if (batch.quantity > 0 && remainingToDeduct > 0) {
                const deduct = Math.min(batch.quantity, remainingToDeduct);
                batch.quantity -= deduct;
                remainingToDeduct -= deduct;
              }
            }
          }
        }
      });

      data.transactions.unshift(transaction);
      this.save();
      this.triggerCloudAutoSync();
      return transaction;
    }

    deleteTransaction(id) {
      const data = this.getData();
      const trIndex = data.transactions.findIndex(t => t.id === id);
      if (trIndex === -1) return false;

      const tr = data.transactions[trIndex];
      if (tr.type === 'IN') {
        tr.items.forEach(trItem => {
          const item = data.items.find(i => i.id === trItem.itemId);
          if (item && item.batches) {
            const batch = item.batches.find(b => b.lotNumber === trItem.lotNumber);
            if (batch) {
              batch.quantity = Math.max(0, batch.quantity - Number(trItem.quantity));
            }
          }
        });
      } else if (tr.type === 'OUT') {
        tr.items.forEach(trItem => {
          const item = data.items.find(i => i.id === trItem.itemId);
          if (item && item.batches) {
            const batch = item.batches.find(b => b.lotNumber === trItem.lotNumber) || item.batches[0];
            if (batch) {
              batch.quantity += Number(trItem.quantity);
            } else {
              item.batches.push({
                lotNumber: trItem.lotNumber || 'LÔ-HOÀN',
                expiryDate: trItem.expiryDate || '2030-12-31',
                quantity: Number(trItem.quantity),
                unitPrice: Number(trItem.unitPrice || 0)
              });
            }
          }
        });
      }

      data.transactions.splice(trIndex, 1);
      this.save();
      return true;
    }

    getAlerts(warehouseId = null) {
      const items = this.getItems(warehouseId);
      const now = new Date();
      const expiredList = [];
      const expiringSoonList = [];
      const lowStockList = [];

      items.forEach(item => {
        const totalQty = (item.batches || []).reduce((acc, b) => acc + (Number(b.quantity) || 0), 0);

        if (totalQty < item.minStock) {
          lowStockList.push({
            item,
            totalQty,
            minStock: item.minStock,
            diff: item.minStock - totalQty
          });
        }

        (item.batches || []).forEach(batch => {
          if (batch.quantity > 0 && batch.expiryDate) {
            const expDate = new Date(batch.expiryDate);
            const daysLeft = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));

            if (daysLeft < 0) {
              expiredList.push({
                item,
                batch,
                daysOverdue: Math.abs(daysLeft)
              });
            } else if (daysLeft <= 60) {
              expiringSoonList.push({
                item,
                batch,
                daysLeft
              });
            }
          }
        });
      });

      return {
        expired: expiredList.sort((a, b) => b.daysOverdue - a.daysOverdue),
        expiringSoon: expiringSoonList.sort((a, b) => a.daysLeft - b.daysLeft),
        lowStock: lowStockList.sort((a, b) => (b.minStock - b.totalQty) - (a.minStock - a.totalQty))
      };
    }

    getDashboardStats(warehouseId = null) {
      const items = this.getItems(warehouseId);
      const transactions = this.getTransactions(warehouseId);
      const alerts = this.getAlerts(warehouseId);

      let totalItems = items.length;
      let totalStockCount = 0;
      let totalValue = 0;

      items.forEach(item => {
        (item.batches || []).forEach(b => {
          const qty = Number(b.quantity) || 0;
          const price = Number(b.unitPrice) || 0;
          totalStockCount += qty;
          totalValue += qty * price;
        });
      });

      return {
        totalItems,
        totalStockCount,
        totalValue,
        expiredCount: alerts.expired.length,
        expiringSoonCount: alerts.expiringSoon.length,
        lowStockCount: alerts.lowStock.length,
        totalTransactions: transactions.length
      };
    }

    getInventoryReport(warehouseId, fromDate, toDate) {
      const items = this.getItems(warehouseId);
      const allTransactions = this.getTransactions(warehouseId);

      const from = fromDate ? new Date(fromDate) : new Date('2020-01-01');
      const to = toDate ? new Date(toDate + 'T23:59:59') : new Date('2099-12-31');

      return items.map(item => {
        let currentStock = (item.batches || []).reduce((acc, b) => acc + (Number(b.quantity) || 0), 0);
        let periodIn = 0;
        let periodOut = 0;
        let afterPeriodIn = 0;
        let afterPeriodOut = 0;

        allTransactions.forEach(tr => {
          const trDate = new Date(tr.date);
          const trItem = tr.items.find(i => i.itemId === item.id);
          if (trItem) {
            const qty = Number(trItem.quantity) || 0;
            if (trDate >= from && trDate <= to) {
              if (tr.type === 'IN') periodIn += qty;
              if (tr.type === 'OUT') periodOut += qty;
            } else if (trDate > to) {
              if (tr.type === 'IN') afterPeriodIn += qty;
              if (tr.type === 'OUT') afterPeriodOut += qty;
            }
          }
        });

        const closingStock = currentStock - afterPeriodIn + afterPeriodOut;
        const openingStock = closingStock - periodIn + periodOut;
        const avgPrice = item.batches && item.batches.length > 0 ? item.batches[0].unitPrice || 0 : 0;

        return {
          item,
          openingStock: Math.max(0, openingStock),
          periodIn,
          periodOut,
          closingStock: Math.max(0, closingStock),
          avgPrice,
          closingValue: Math.max(0, closingStock) * avgPrice
        };
      });
    }

    getStockCard(itemId) {
      const item = this.getItemById(itemId);
      if (!item) return null;

      const data = this.getData();
      const history = [];

      data.transactions.forEach(tr => {
        const match = tr.items.find(i => i.itemId === itemId);
        if (match) {
          history.push({
            date: tr.date,
            code: tr.code || (tr.type === 'IN' ? 'PN (Ký tay)' : 'PX (Ký tay)'),
            type: tr.type,
            lotNumber: match.lotNumber || 'N/A',
            expiryDate: match.expiryDate || 'N/A',
            partner: tr.type === 'IN' ? tr.supplier : tr.departmentName,
            caseCode: tr.caseCode || '',
            reason: tr.reason,
            quantityIn: tr.type === 'IN' ? match.quantity : 0,
            quantityOut: tr.type === 'OUT' ? match.quantity : 0,
            unitPrice: match.unitPrice
          });
        }
      });

      history.sort((a, b) => new Date(a.date) - new Date(b.date));

      let runningBalance = 0;
      history.forEach(h => {
        if (h.type === 'IN') runningBalance += Number(h.quantityIn);
        if (h.type === 'OUT') runningBalance -= Number(h.quantityOut);
        h.runningBalance = Math.max(0, runningBalance);
      });

      return { item, history };
    }

    exportBackupJSON() {
      const data = this.getData();
      data.settings.lastBackup = new Date().toISOString();
      this.save();
      return JSON.stringify(data, null, 2);
    }

    importBackupJSON(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed.items && Array.isArray(parsed.items) && parsed.transactions && Array.isArray(parsed.transactions)) {
          this.data = parsed;
          this.save();
          return { success: true, message: 'Khôi phục cơ sở dữ liệu thành công!' };
        } else {
          return { success: false, message: 'Cấu trúc file sao lưu không hợp lệ!' };
        }
      } catch (e) {
        return { success: false, message: 'Lỗi đọc file JSON: ' + e.message };
      }
    }

    resetToDefault() {
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      this.save();
      return this.data;
    }

    // ==========================================
    // CLOUD SYNC METHODS (SUPABASE)
    // ==========================================
    
    normalizeSupabaseUrl(url) {
      if (!url) return '';
      let clean = url.trim().replace(/\/+$/, '');
      clean = clean.replace(/\/rest\/v\d+$/, '');
      return clean;
    }

    initCloud(url = null, key = null) {
      const cloudCfg = this.data.settings?.cloudSync || {};
      const supabaseUrl = this.normalizeSupabaseUrl(url || cloudCfg.supabaseUrl);
      const supabaseKey = key || cloudCfg.supabaseKey;

      if (!supabaseUrl || !supabaseKey) {
        this.cloudClient = null;
        return false;
      }

      const sbLib = (typeof window !== 'undefined' && window.supabase) || (typeof supabase !== 'undefined' ? supabase : null);
      if (!sbLib || !sbLib.createClient) {
        console.warn('Supabase JS SDK chưa được tải');
        return false;
      }

      try {
        this.cloudClient = sbLib.createClient(supabaseUrl, supabaseKey);
        return true;
      } catch (err) {
        console.warn('Lỗi khởi tạo Supabase Client:', err);
        this.cloudClient = null;
        return false;
      }
    }

    async testCloudConnection(url, key) {
      const sbLib = (typeof window !== 'undefined' && window.supabase) || (typeof supabase !== 'undefined' ? supabase : null);
      if (!sbLib || !sbLib.createClient) {
        return { success: false, message: 'Thư viện Supabase SDK chưa tải được. Vui lòng kiểm tra kết nối Internet.' };
      }
      try {
        const testClient = sbLib.createClient(this.normalizeSupabaseUrl ? this.normalizeSupabaseUrl(url) : url.replace(/\/rest\/v\d+$/, ''), key);
        const { data, error } = await testClient.from('forensic_inventory').select('id, updated_at').limit(1);
        if (error) {
          if (error.code === '42P01') {
            return { success: false, message: 'Chưa tạo bảng "forensic_inventory". Vui lòng xem hướng dẫn để chạy lệnh SQL tạo bảng trong Supabase.' };
          }
          return { success: false, message: 'Lỗi Supabase: ' + (error.message || error.details || 'Khóa API không hợp lệ') };
        }
        return { success: true, message: 'Kết nối thành công tới Database Supabase Cloud!', hasData: data && data.length > 0 };
      } catch (e) {
        return { success: false, message: 'Lỗi kết nối: ' + e.message };
      }
    }

    async pushToCloud(customData = null) {
      if (!this.cloudClient) {
        const ok = this.initCloud();
        if (!ok) return false;
      }
      const dataToPush = customData || this.data;
      try {
        const payload = {
          id: 'current_database',
          data: dataToPush,
          updated_at: new Date().toISOString()
        };
        const { error } = await this.cloudClient.from('forensic_inventory').upsert(payload);
        if (error) throw error;
        if (!this.data.settings.cloudSync) this.data.settings.cloudSync = {};
        this.data.settings.cloudSync.lastSyncTime = new Date().toISOString();
        this.save();
        return true;
      } catch (e) {
        console.warn('Lỗi đẩy dữ liệu lên đám mây:', e);
        return false;
      }
    }

    async pullFromCloud() {
      if (!this.cloudClient) {
        const ok = this.initCloud();
        if (!ok) return null;
      }
      try {
        const { data, error } = await this.cloudClient.from('forensic_inventory').select('*').eq('id', 'current_database').single();
        if (error) {
          if (error.code === 'PGRST116') {
            await this.pushToCloud();
            return this.data;
          }
          throw error;
        }
        if (data && data.data) {
          const currentCloud = this.data.settings?.cloudSync || {};
          this.data = data.data;
          if (!this.data.settings) this.data.settings = {};
          this.data.settings.cloudSync = {
            ...this.data.settings.cloudSync,
            ...currentCloud,
            lastSyncTime: data.updated_at || new Date().toISOString()
          };
          this.save();
          return this.data;
        }
        return null;
      } catch (e) {
        console.warn('Lỗi kéo dữ liệu từ đám mây:', e);
        return null;
      }
    }

    setupRealtimeSubscription(onRemoteChange) {
      if (!this.cloudClient) return;
      try {
        if (this.realtimeChannel) {
          this.cloudClient.removeChannel(this.realtimeChannel);
        }
        this.realtimeChannel = this.cloudClient
          .channel('forensic_realtime_sync')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'forensic_inventory' }, payload => {
            if (payload.new && payload.new.data) {
              const currentCloud = this.data.settings?.cloudSync || {};
              this.data = payload.new.data;
              if (!this.data.settings) this.data.settings = {};
              this.data.settings.cloudSync = {
                ...this.data.settings.cloudSync,
                ...currentCloud,
                lastSyncTime: payload.new.updated_at || new Date().toISOString()
              };
              this.save();
              if (typeof onRemoteChange === 'function') {
                onRemoteChange(this.data);
              }
            }
          })
          .subscribe();
      } catch (err) {
        console.warn('Lỗi đăng ký Realtime Supabase:', err);
      }
    }

    triggerCloudAutoSync() {
      const cfg = this.data.settings?.cloudSync;
      if (cfg && cfg.enabled && cfg.autoSync) {
        this.pushToCloud().catch(err => console.warn('Lỗi auto sync background:', err));
      }
    }

    saveSettings(settings) {
      const data = this.getData();
      data.settings = { ...data.settings, ...settings };
      this.save();
      this.triggerCloudAutoSync();
      return data.settings;
    }
  }

  const db = new ForensicStorage();

  // ==========================================
  // 2. EXPORT & PRINT HELPERS
  // ==========================================
  function formatCurrency(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return '0 đ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  function formatNumber(num) {
    if (num === undefined || num === null || isNaN(num)) return '0';
    return new Intl.NumberFormat('vi-VN').format(num);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function numberToVietnameseWords(n) {
    if (n === 0) return 'Không đồng';
    const defaultNumbers = [' không', ' một', ' hai', ' ba', ' bốn', ' năm', ' sáu', ' bảy', ' tám', ' chín'];
    const units = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ'];

    function readGroup(group) {
      let read = '';
      const hundred = Math.floor(group / 100);
      const ten = Math.floor((group % 100) / 10);
      const unit = group % 10;
      if (hundred > 0 || ten > 0 || unit > 0) {
        read += defaultNumbers[hundred] + ' trăm';
        if (ten === 0 && unit > 0) read += ' lẻ';
        if (ten === 1) read += ' mười';
        if (ten > 1) read += defaultNumbers[ten] + ' mươi';
        if (unit === 1) {
          if (ten <= 1) read += ' một';
          else read += ' mốt';
        } else if (unit === 5) {
          if (ten === 0) read += ' năm';
          else read += ' lăm';
        } else if (unit > 0) {
          read += defaultNumbers[unit];
        }
      }
      return read;
    }

    let str = '';
    let i = 0;
    let remaining = Math.floor(n);
    if (remaining < 0) {
      str = 'Âm ';
      remaining = Math.abs(remaining);
    }
    while (remaining > 0) {
      const group = remaining % 1000;
      if (group > 0) {
        const groupRead = readGroup(group);
        str = groupRead + units[i] + str;
      }
      remaining = Math.floor(remaining / 1000);
      i++;
    }
    str = str.trim();
    if (!str) return 'Không đồng';
    return str.charAt(0).toUpperCase() + str.slice(1) + ' đồng chẵn';
  }

  function exportToCSV(filename, rows) {
    let csvContent = '\uFEFF';
    rows.forEach(row => {
      const formattedRow = row.map(val => {
        if (val === null || val === undefined) return '""';
        let s = String(val).replace(/"/g, '""');
        return `"${s}"`;
      });
      csvContent += formattedRow.join(',') + '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function printStockInReceipt(tr, settings) {
    const dateObj = new Date(tr.date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    let rowsHtml = '';
    tr.items.forEach((item, index) => {
      rowsHtml += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td><strong>${item.itemName}</strong><br><small class="text-muted">Mã: ${item.itemCode || ''}</small></td>
          <td class="text-center font-mono">${item.lotNumber || '---'}</td>
          <td class="text-center">${formatDate(item.expiryDate)}</td>
          <td class="text-center">${item.unit}</td>
          <td class="text-right">${formatNumber(item.quantity)}</td>
          <td class="text-right">${formatCurrency(item.unitPrice)}</td>
          <td class="text-right font-bold">${formatCurrency(item.amount)}</td>
        </tr>
      `;
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <title>Phiếu Nhập Kho - ${tr.code}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; color: #000; margin: 0; padding: 0; }
          .header-table { width: 100%; border: none; margin-bottom: 15px; }
          .header-table td { border: none; vertical-align: top; padding: 0; }
          .title-section { text-align: center; margin: 20px 0 15px 0; }
          .main-title { font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 0; }
          .sub-title { font-size: 12pt; font-style: italic; margin-top: 4px; }
          .info-grid { width: 100%; margin-bottom: 15px; }
          .info-grid td { border: none; padding: 3px 0; font-size: 12pt; }
          .content-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          .content-table th, .content-table td { border: 1px solid #000; padding: 6px 8px; font-size: 11pt; }
          .content-table th { background: #f0f0f0; text-align: center; font-weight: bold; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .font-bold { font-weight: bold; }
          .font-mono { font-family: monospace; }
          .signatures { width: 100%; margin-top: 25px; border: none; page-break-inside: avoid; }
          .signatures td { border: none; text-align: center; vertical-align: top; width: 25%; font-size: 11.5pt; }
          .sig-space { height: 75px; }
          .text-muted { color: #555; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 45%; text-align: center;">
              <strong>${settings.parentOrg || 'SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH'}</strong><br>
              <strong style="text-decoration: underline;">${settings.orgName || 'TRUNG TÂM PHÁP Y THÀNH PHỐ'}</strong><br>
              <small style="font-size: 10pt;">Địa chỉ: ${settings.orgAddress || ''}</small>
            </td>
            <td style="width: 55%; text-align: center;">
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
              <strong>Độc lập - Tự do - Hạnh phúc</strong><br>
              <span style="font-size: 11pt;">***</span>
            </td>
          </tr>
        </table>

        <div class="title-section">
          <div class="main-title">PHIẾU NHẬP KHO</div>
          <div class="sub-title">Ngày ${day} tháng ${month} năm ${year}</div>
          <div>Số phiếu: <strong>${tr.code || '................................'}</strong></div>
        </div>

        <table class="info-grid">
          <tr>
            <td style="width: 60%;"><strong>Đơn vị cung cấp / Nhà thầu:</strong> ${tr.supplier || 'N/A'}</td>
            <td style="width: 40%;"><strong>Số Hóa đơn / Hợp đồng:</strong> ${tr.invoiceNumber || tr.contractNumber || '---'}</td>
          </tr>
          <tr>
            <td><strong>Họ tên người giao hàng:</strong> ${tr.deliverer || 'N/A'}</td>
            <td><strong>Thủ kho tiếp nhận:</strong> ${tr.receiver || settings.storekeeper || 'Lê Văn Quý'}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Kho tiếp nhận:</strong> ${tr.warehouseId === 'CHEMICAL' ? 'Kho Hóa chất, Sinh phẩm & Vật tư Giám định' : 'Kho Văn phòng phẩm & Vật tư Hành chính'}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Lý do nhập kho:</strong> ${tr.reason || 'Nhập mua sắm phục vụ công tác chuyên môn'}</td>
          </tr>
        </table>

        <table class="content-table">
          <thead>
            <tr>
              <th style="width: 5%;">STT</th>
              <th style="width: 32%;">Tên Hóa chất / Vật tư / Quy cách</th>
              <th style="width: 14%;">Số Lô (Lot)</th>
              <th style="width: 12%;">Hạn dùng</th>
              <th style="width: 7%;">ĐVT</th>
              <th style="width: 8%;">Số lượng</th>
              <th style="width: 11%;">Đơn giá</th>
              <th style="width: 11%;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
            <tr>
              <td colspan="7" style="text-align: right; font-weight: bold;">Tổng cộng thành tiền:</td>
              <td class="text-right font-bold">${formatCurrency(tr.totalAmount)}</td>
            </tr>
          </tbody>
        </table>

        <div style="font-size: 11pt; margin-bottom: 15px;">
          <em>Tổng số tiền (viết bằng chữ): <strong>${numberToVietnameseWords(tr.totalAmount)}</strong></em>
        </div>

        <table class="signatures">
          <tr>
            <td>
              <strong>NGƯỜI LẬP PHIẾU</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${settings.storekeeper || 'Lê Văn Quý'}</strong>
            </td>
            <td>
              <strong>NGƯỜI GIAO HÀNG</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${tr.deliverer || ''}</strong>
            </td>
            <td>
              <strong>THỦ KHO</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${tr.receiver || settings.storekeeper || 'Lê Văn Quý'}</strong>
            </td>
            <td>
              <strong>LÃNH ĐẠO TRUNG TÂM</strong><br>
              <em>(Ký, đóng dấu)</em>
              <div class="sig-space"></div>
              <strong>${settings.managerName || ''}</strong>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 350);
  }

  function printStockOutReceipt(tr, settings) {
    const dateObj = new Date(tr.date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    let rowsHtml = '';
    tr.items.forEach((item, index) => {
      rowsHtml += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td><strong>${item.itemName}</strong><br><small class="text-muted">Mã: ${item.itemCode || ''}</small></td>
          <td class="text-center font-mono">${item.lotNumber || '---'}</td>
          <td class="text-center">${formatDate(item.expiryDate)}</td>
          <td class="text-center">${item.unit}</td>
          <td class="text-right font-bold">${formatNumber(item.quantity)}</td>
          <td class="text-right">${formatCurrency(item.unitPrice)}</td>
          <td class="text-right font-bold">${formatCurrency(item.amount)}</td>
        </tr>
      `;
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <title>Phiếu Xuất Kho - ${tr.code}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; color: #000; margin: 0; padding: 0; }
          .header-table { width: 100%; border: none; margin-bottom: 15px; }
          .header-table td { border: none; vertical-align: top; padding: 0; }
          .title-section { text-align: center; margin: 20px 0 15px 0; }
          .main-title { font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 0; }
          .sub-title { font-size: 12pt; font-style: italic; margin-top: 4px; }
          .info-grid { width: 100%; margin-bottom: 15px; }
          .info-grid td { border: none; padding: 3px 0; font-size: 12pt; }
          .content-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          .content-table th, .content-table td { border: 1px solid #000; padding: 6px 8px; font-size: 11pt; }
          .content-table th { background: #f0f0f0; text-align: center; font-weight: bold; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .font-bold { font-weight: bold; }
          .font-mono { font-family: monospace; }
          .signatures { width: 100%; margin-top: 25px; border: none; page-break-inside: avoid; }
          .signatures td { border: none; text-align: center; vertical-align: top; width: 25%; font-size: 11.5pt; }
          .sig-space { height: 75px; }
          .text-muted { color: #555; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 45%; text-align: center;">
              <strong>${settings.parentOrg || 'SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH'}</strong><br>
              <strong style="text-decoration: underline;">${settings.orgName || 'TRUNG TÂM PHÁP Y THÀNH PHỐ'}</strong><br>
              <small style="font-size: 10pt;">Kho: ${tr.warehouseId === 'CHEMICAL' ? 'Hóa chất - Sinh phẩm' : 'Văn phòng phẩm'}</small>
            </td>
            <td style="width: 55%; text-align: center;">
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
              <strong>Độc lập - Tự do - Hạnh phúc</strong><br>
              <span style="font-size: 11pt;">***</span>
            </td>
          </tr>
        </table>

        <div class="title-section">
          <div class="main-title">PHIẾU XUẤT KHO</div>
          <div class="sub-title">Ngày ${day} tháng ${month} năm ${year}</div>
          <div>Số phiếu: <strong>${tr.code || '................................'}</strong></div>
        </div>

        <table class="info-grid">
          <tr>
            <td style="width: 60%;"><strong>Đơn vị / Khoa phòng nhận:</strong> <span style="text-transform: uppercase; font-weight: bold;">${tr.departmentName || '---'}</span></td>
            <td style="width: 40%;"><strong>Số Hồ sơ / Vụ án:</strong> ${tr.caseCode || 'Phục vụ thường quy'}</td>
          </tr>
          <tr>
            <td><strong>Họ tên người nhận:</strong> ${(tr.receiver && tr.receiver !== '.') ? tr.receiver : ''}</td>
            <td><strong>Thủ kho xuất:</strong> ${tr.deliverer || settings.storekeeper || 'Lê Văn Quý'}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Lý do xuất kho:</strong> ${tr.reason || 'Xuất phục vụ công tác giám định pháp y'}</td>
          </tr>
        </table>

        <table class="content-table">
          <thead>
            <tr>
              <th style="width: 5%;">STT</th>
              <th style="width: 32%;">Tên Hóa chất / Vật tư / Sinh phẩm</th>
              <th style="width: 14%;">Số Lô (Lot)</th>
              <th style="width: 12%;">Hạn sử dụng</th>
              <th style="width: 7%;">ĐVT</th>
              <th style="width: 8%;">Số lượng</th>
              <th style="width: 11%;">Đơn giá</th>
              <th style="width: 11%;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
            <tr>
              <td colspan="7" style="text-align: right; font-weight: bold;">Tổng giá trị xuất kho:</td>
              <td class="text-right font-bold">${formatCurrency(tr.totalAmount)}</td>
            </tr>
          </tbody>
        </table>

        <div style="font-size: 11pt; margin-bottom: 15px;">
          <em>Tổng số tiền (viết bằng chữ): <strong>${numberToVietnameseWords(tr.totalAmount)}</strong></em>
        </div>

        <table class="signatures">
          <tr>
            <td>
              <strong>NGƯỜI LẬP PHIẾU</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${settings.storekeeper || 'Lê Văn Quý'}</strong>
            </td>
            <td>
              <strong>NGƯỜI NHẬN HÀNG</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${(tr.receiver && tr.receiver !== '.') ? tr.receiver : ''}</strong>
            </td>
            <td>
              <strong>THỦ KHO</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${tr.deliverer || settings.storekeeper || 'Lê Văn Quý'}</strong>
            </td>
            <td>
              <strong>TRƯỞNG ĐƠN VỊ / LÃNH ĐẠO DUYỆT</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${tr.approver || settings.managerName || ''}</strong>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 350);
  }

  function printInventoryReport(reportData, warehouseName, fromDate, toDate, settings) {
    let rowsHtml = '';
    let totalInQty = 0;
    let totalOutQty = 0;
    let totalClosingQty = 0;
    let totalClosingVal = 0;

    reportData.forEach((row, index) => {
      totalInQty += row.periodIn;
      totalOutQty += row.periodOut;
      totalClosingQty += row.closingStock;
      totalClosingVal += row.closingValue;

      rowsHtml += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td>${row.item.code || '---'}</td>
          <td><strong>${row.item.name}</strong></td>
          <td class="text-center">${row.item.unit}</td>
          <td class="text-right">${formatNumber(row.openingStock)}</td>
          <td class="text-right">${formatNumber(row.periodIn)}</td>
          <td class="text-right">${formatNumber(row.periodOut)}</td>
          <td class="text-right font-bold">${formatNumber(row.closingStock)}</td>
          <td class="text-right">${formatCurrency(row.avgPrice)}</td>
          <td class="text-right font-bold">${formatCurrency(row.closingValue)}</td>
        </tr>
      `;
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <title>Báo cáo Xuất Nhập Tồn - ${warehouseName}</title>
        <style>
          @page { size: A4 landscape; margin: 12mm; }
          body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.25; color: #000; margin: 0; padding: 0; }
          .header-table { width: 100%; border: none; margin-bottom: 12px; }
          .header-table td { border: none; vertical-align: top; padding: 0; }
          .title-section { text-align: center; margin: 15px 0 15px 0; }
          .main-title { font-size: 15pt; font-weight: bold; text-transform: uppercase; margin: 0; }
          .sub-title { font-size: 11pt; font-style: italic; margin-top: 4px; }
          .content-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          .content-table th, .content-table td { border: 1px solid #000; padding: 5px 6px; font-size: 10pt; }
          .content-table th { background: #f0f0f0; text-align: center; font-weight: bold; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .font-bold { font-weight: bold; }
          .signatures { width: 100%; margin-top: 20px; border: none; page-break-inside: avoid; }
          .signatures td { border: none; text-align: center; vertical-align: top; width: 33.3%; font-size: 11pt; }
          .sig-space { height: 65px; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 50%;">
              <strong>${settings.parentOrg || 'SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH'}</strong><br>
              <strong style="text-decoration: underline;">${settings.orgName || 'TRUNG TÂM PHÁP Y THÀNH PHỐ'}</strong><br>
              <span>Phân hệ: ${warehouseName}</span>
            </td>
            <td style="width: 50%; text-align: right;">
              <em>Ngày lập báo cáo: ${formatDate(new Date().toISOString())}</em>
            </td>
          </tr>
        </table>

        <div class="title-section">
          <div class="main-title">BÁO CÁO TỔNG HỢP XUẤT - NHẬP - TỒN KHO</div>
          <div class="sub-title">Từ ngày: <strong>${formatDate(fromDate) || 'Đầu kỳ'}</strong> đến ngày: <strong>${formatDate(toDate) || 'Hiện tại'}</strong></div>
        </div>

        <table class="content-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 4%;">STT</th>
              <th rowspan="2" style="width: 10%;">Mã VT/HC</th>
              <th rowspan="2" style="width: 28%;">Tên Vật Tư / Hóa Chất / Sinh phẩm</th>
              <th rowspan="2" style="width: 6%;">ĐVT</th>
              <th rowspan="2" style="width: 7%;">Tồn đầu</th>
              <th rowspan="2" style="width: 7%;">Nhập kỳ</th>
              <th rowspan="2" style="width: 7%;">Xuất kỳ</th>
              <th colspan="3" style="width: 31%;">Tồn Cuối Kỳ</th>
            </tr>
            <tr>
              <th style="width: 8%;">Số lượng</th>
              <th style="width: 11%;">Đơn giá TB</th>
              <th style="width: 12%;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
            <tr style="font-weight: bold; background: #fafafa;">
              <td colspan="4" class="text-center">TỔNG CỘNG TOÀN BỘ:</td>
              <td class="text-right">---</td>
              <td class="text-right">${formatNumber(totalInQty)}</td>
              <td class="text-right">${formatNumber(totalOutQty)}</td>
              <td class="text-right">${formatNumber(totalClosingQty)}</td>
              <td class="text-center">---</td>
              <td class="text-right">${formatCurrency(totalClosingVal)}</td>
            </tr>
          </tbody>
        </table>

        <table class="signatures">
          <tr>
            <td>
              <strong>NGƯỜI LẬP BÁO CÁO</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${settings.storekeeper || 'Lê Văn Quý'}</strong>
            </td>
            <td>
              <strong>TRƯỞNG PHÒNG TỔ CHỨC - HÀNH CHÍNH - QUẢN TRỊ</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${settings.headOfAdmin || ''}</strong>
            </td>
            <td>
              <strong>GIÁM ĐỐC TRUNG TÂM PHÁP Y</strong><br>
              <em>(Ký, ghi rõ họ tên và đóng dấu)</em>
              <div class="sig-space"></div>
              <strong>${settings.managerName || ''}</strong>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 350);
  }

  function printStockCard(cardData, settings) {
    const item = cardData.item;
    let rowsHtml = '';

    cardData.history.forEach((row, index) => {
      rowsHtml += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td class="text-center">${formatDate(row.date)}</td>
          <td class="text-center font-mono"><strong>${row.code}</strong></td>
          <td>${row.reason || ''} ${row.caseCode ? `(${row.caseCode})` : ''}</td>
          <td>${row.partner || '---'}</td>
          <td class="text-center font-mono">${row.lotNumber || ''}</td>
          <td class="text-right">${row.quantityIn > 0 ? formatNumber(row.quantityIn) : '-'}</td>
          <td class="text-right">${row.quantityOut > 0 ? formatNumber(row.quantityOut) : '-'}</td>
          <td class="text-right font-bold">${formatNumber(row.runningBalance)}</td>
        </tr>
      `;
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <title>Thẻ Kho - ${item.name}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.3; color: #000; margin: 0; padding: 0; }
          .header-table { width: 100%; border: none; margin-bottom: 15px; }
          .header-table td { border: none; vertical-align: top; padding: 0; }
          .title-section { text-align: center; margin: 15px 0 15px 0; }
          .main-title { font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 0; }
          .content-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          .content-table th, .content-table td { border: 1px solid #000; padding: 5px 6px; font-size: 10.5pt; }
          .content-table th { background: #f0f0f0; text-align: center; font-weight: bold; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .font-bold { font-weight: bold; }
          .font-mono { font-family: monospace; }
          .info-box { margin-bottom: 15px; font-size: 11.5pt; line-height: 1.5; }
          .signatures { width: 100%; margin-top: 25px; border: none; page-break-inside: avoid; }
          .signatures td { border: none; text-align: center; vertical-align: top; width: 50%; font-size: 11.5pt; }
          .sig-space { height: 75px; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 50%;">
              <strong>${settings.parentOrg || 'SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH'}</strong><br>
              <strong style="text-decoration: underline;">${settings.orgName || 'TRUNG TÂM PHÁP Y THÀNH PHỐ'}</strong>
            </td>
            <td style="width: 50%; text-align: right;">
              <strong>Mẫu số: S12-DN</strong><br>
              <small>Ban hành theo TT 200/2014/TT-BTC</small>
            </td>
          </tr>
        </table>

        <div class="title-section">
          <div class="main-title">THẺ KHO VẬT TƯ / HÓA CHẤT</div>
        </div>

        <div class="info-box">
          - <strong>Tên vật tư, hóa chất:</strong> ${item.name}<br>
          - <strong>Mã số:</strong> ${item.code || '---'} | <strong>Đơn vị tính:</strong> ${item.unit} | <strong>Quy cách:</strong> ${item.packingSpec || 'N/A'}<br>
          - <strong>Vị trí lưu kho:</strong> ${item.location || '---'} | <strong>ĐK Bảo quản:</strong> ${item.storageCondition || '---'}
        </div>

        <table class="content-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 4%;">STT</th>
              <th rowspan="2" style="width: 11%;">Ngày tháng</th>
              <th rowspan="2" style="width: 14%;">Số chứng từ</th>
              <th rowspan="2" style="width: 25%;">Diễn giải nội dung / Vụ án</th>
              <th rowspan="2" style="width: 18%;">Đơn vị giao / nhận</th>
              <th rowspan="2" style="width: 10%;">Số Lô</th>
              <th colspan="3" style="width: 18%;">Số lượng</th>
            </tr>
            <tr>
              <th style="width: 6%;">Nhập</th>
              <th style="width: 6%;">Xuất</th>
              <th style="width: 6%;">Tồn</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <table class="signatures">
          <tr>
            <td>
              <strong>NGƯỜI LẬP THẺ KHO</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${settings.storekeeper || 'Lê Văn Quý'}</strong>
            </td>
            <td>
              <strong>KẾ TOÁN TRƯỞNG / LÃNH ĐẠO</strong><br>
              <em>(Ký, ghi rõ họ tên)</em>
              <div class="sig-space"></div>
              <strong>${settings.headOfAdmin || ''}</strong>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 350);
  }

  // ==========================================
  // 3. UI CONTROLLER & EVENT WIRING
  // ==========================================
  const state = {
    currentView: 'dashboard',
    currentWarehouse: 'ALL',
    currentStockCardItemId: null,
    activeAlertTab: 'expired'
  };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  function showToast(message, type = 'success') {
    const container = $('#toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = '✅';
    if (type === 'danger') icon = '❌';
    if (type === 'warning') icon = '⚠️';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function getHazardBadgeHtml(level) {
    if (!level || level === 'Thường') return `<span class="hazard-badge hazard-normal">Thường</span>`;
    if (level.includes('Độc Bảng A')) return `<span class="hazard-badge hazard-toxic-a">☠️ Độc Bảng A</span>`;
    if (level.includes('Độc bảng B')) return `<span class="hazard-badge hazard-toxic-b">⚠️ Độc Bảng B</span>`;
    if (level.includes('Dễ cháy')) return `<span class="hazard-badge hazard-flammable">🔥 Dễ Cháy Nổ</span>`;
    if (level.includes('Ăn mòn')) return `<span class="hazard-badge hazard-corrosive">🧪 Ăn Mòn</span>`;
    return `<span class="hazard-badge hazard-normal">${level}</span>`;
  }

  function getItemTotalQty(item) {
    return (item.batches || []).reduce((sum, b) => sum + (Number(b.quantity) || 0), 0);
  }

  function getItemStatusInfo(item) {
    const totalQty = getItemTotalQty(item);
    const now = new Date();
    let hasExpired = false;
    let hasExpiringSoon = false;
    let minDaysLeft = 9999;

    (item.batches || []).forEach(b => {
      if (b.quantity > 0 && b.expiryDate) {
        const exp = new Date(b.expiryDate);
        const days = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
        if (days < 0) hasExpired = true;
        else if (days <= 60) {
          hasExpiringSoon = true;
          if (days < minDaysLeft) minDaysLeft = days;
        }
      }
    });

    const isLowStock = totalQty < item.minStock;
    return { totalQty, hasExpired, hasExpiringSoon, minDaysLeft, isLowStock };
  }

  function updateGlobalAlertBadge() {
    const alerts = db.getAlerts(null);
    const totalUrgent = alerts.expired.length + alerts.expiringSoon.length + alerts.lowStock.length;
    const badge = $('#nav-alert-count');
    if (!badge) return;
    badge.textContent = totalUrgent;
    if (totalUrgent === 0) {
      badge.style.display = 'none';
    } else {
      badge.style.display = 'inline-block';
      badge.className = alerts.expired.length > 0 ? 'badge badge-danger' : 'badge badge-warning';
    }
  }

  function switchView(viewName) {
    state.currentView = viewName;

    $$('.sidebar-nav .nav-item').forEach(nav => {
      if (nav.getAttribute('data-view') === viewName) nav.classList.add('active');
      else nav.classList.remove('active');
    });

    $$('.view-panel').forEach(panel => {
      panel.style.display = 'none';
    });

    const targetView = $(`#view-${viewName}`);
    if (targetView) targetView.style.display = 'block';

    const titles = {
      dashboard: 'Dashboard',
      inventory: 'Danh Mục Kho',
      transactions: 'Lịch Sử Nhập / Xuất',
      alerts: 'Dashboard',
      reports: 'Báo Cáo & Thẻ Kho',
      settings: 'Cài Đặt Hệ Thống'
    };

    if (titles[viewName]) {
      $('#current-page-title').textContent = titles[viewName];
      const descEl = $('#current-page-desc');
      if (descEl) descEl.textContent = '';
    }

    renderCurrentView();
  }

  function renderCurrentView() {
    updateGlobalAlertBadge();
    switch (state.currentView) {
      case 'dashboard':
        renderDashboardView();
        break;
      case 'inventory':
        renderInventoryView();
        break;
      case 'transactions':
        renderTransactionsView();
        break;
      case 'alerts':
        renderAlertsView();
        break;
      case 'reports':
        renderReportsView();
        break;
      case 'settings':
        loadSettingsView();
        break;
    }
  }

  // 1. Render Dashboard
  function renderDashboardView() {
    const stats = db.getDashboardStats(state.currentWarehouse);
    const allItems = db.getItems(state.currentWarehouse);
    const chemItems = allItems.filter(i => i.warehouseId === 'CHEMICAL').length;
    const vppItems = allItems.filter(i => i.warehouseId === 'OFFICE').length;

    $('#stat-total-items').textContent = formatNumber(stats.totalItems);
    $('#stat-sub-chem').textContent = formatNumber(chemItems);
    $('#stat-sub-vpp').textContent = formatNumber(vppItems);
    $('#stat-total-value').textContent = formatCurrency(stats.totalValue);
    $('#stat-total-qty').textContent = formatNumber(stats.totalStockCount);
    $('#stat-expired-count').textContent = formatNumber(stats.expiredCount);
    $('#stat-expiring-count').textContent = formatNumber(stats.expiringSoonCount);

    const alerts = db.getAlerts(state.currentWarehouse);
    const urgentTbody = $('#dashboard-urgent-tbody');
    urgentTbody.innerHTML = '';

    const urgentList = [];
    alerts.expired.forEach(ex => urgentList.push({ type: 'EXPIRED', data: ex }));
    alerts.expiringSoon.forEach(es => urgentList.push({ type: 'EXPIRING', data: es }));
    alerts.lowStock.forEach(ls => urgentList.push({ type: 'LOW_STOCK', data: ls }));

    if (urgentList.length === 0) {
      urgentTbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center" style="padding: 30px; color: var(--success-dark);">
            ✅ Tất cả hóa chất và vật tư đều còn hạn an toàn và đảm bảo định mức tồn kho!
          </td>
        </tr>
      `;
    } else {
      urgentList.slice(0, 8).forEach(u => {
        let badgeHtml = '';
        let itemCode = '';
        let itemName = '';
        let whName = '';
        let lotStr = '---';
        let statusStr = '';
        let locationStr = '';
        let actionBtn = '';

        if (u.type === 'EXPIRED') {
          const { item, batch, daysOverdue } = u.data;
          badgeHtml = `<span class="tag tag-danger">🔴 ĐÃ HẾT HẠN (${daysOverdue} ngày)</span>`;
          itemCode = item.code;
          itemName = item.name;
          whName = item.warehouseId === 'CHEMICAL' ? 'Hóa chất' : 'VPP';
          lotStr = `<span class="font-mono">${batch.lotNumber}</span>`;
          statusStr = `<strong style="color: var(--danger);">${formatDate(batch.expiryDate)}</strong> (Tồn: ${batch.quantity} ${item.unit})`;
          locationStr = item.location || '---';
          actionBtn = `<button class="btn btn-danger btn-sm btn-dispose" data-id="${item.id}" data-lot="${batch.lotNumber}">Tiêu Hủy</button>`;
        } else if (u.type === 'EXPIRING') {
          const { item, batch, daysLeft } = u.data;
          badgeHtml = `<span class="tag tag-warning">🟡 SẮP HẾT HẠN (Còn ${daysLeft} ngày)</span>`;
          itemCode = item.code;
          itemName = item.name;
          whName = item.warehouseId === 'CHEMICAL' ? 'Hóa chất' : 'VPP';
          lotStr = `<span class="font-mono">${batch.lotNumber}</span>`;
          statusStr = `<strong style="color: var(--warning-dark);">${formatDate(batch.expiryDate)}</strong> (Tồn: ${batch.quantity} ${item.unit})`;
          locationStr = item.location || '---';
          actionBtn = `<button class="btn btn-primary btn-sm btn-quick-out-fefo" data-id="${item.id}" data-lot="${batch.lotNumber}">Xuất FEFO</button>`;
        } else if (u.type === 'LOW_STOCK') {
          const { item, totalQty, minStock } = u.data;
          badgeHtml = `<span class="tag tag-warning">⚠️ DƯỚI ĐỊNH MỨC</span>`;
          itemCode = item.code;
          itemName = item.name;
          whName = item.warehouseId === 'CHEMICAL' ? 'Hóa chất' : 'VPP';
          lotStr = 'Tổng tồn';
          statusStr = `<strong style="color: var(--danger);">${totalQty}</strong> / Min: ${minStock} ${item.unit}`;
          locationStr = item.location || '---';
          actionBtn = `<button class="btn btn-outline btn-sm btn-reorder" data-id="${item.id}">Dự Trù Mua</button>`;
        }

        urgentTbody.innerHTML += `
          <tr>
            <td>${badgeHtml}</td>
            <td><strong>${itemName}</strong><br><small class="font-mono text-muted">${itemCode}</small></td>
            <td><span class="tag ${whName === 'Hóa chất' ? 'tag-chemical' : 'tag-office'}">${whName}</span></td>
            <td>${lotStr}</td>
            <td>${statusStr}</td>
            <td>${locationStr}</td>
            <td>${actionBtn}</td>
          </tr>
        `;
      });
    }

    const recentTransactions = db.getTransactions(state.currentWarehouse).slice(0, 5);
    const recentTbody = $('#dashboard-recent-tbody');
    recentTbody.innerHTML = '';

    if (recentTransactions.length === 0) {
      recentTbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 24px; color: var(--text-muted);">Chưa có giao dịch nào được ghi nhận.</td></tr>`;
    } else {
      recentTransactions.forEach(tr => {
        const isOut = tr.type === 'OUT';
        recentTbody.innerHTML += `
          <tr>
            <td class="font-mono font-bold">${tr.code}</td>
            <td><span class="tag ${isOut ? 'tag-warning' : 'tag-success'}">${isOut ? 'Xuất Kho (-)' : 'Nhập Kho (+)'}</span></td>
            <td>${formatDate(tr.date)}</td>
            <td><span class="tag ${tr.warehouseId === 'CHEMICAL' ? 'tag-chemical' : 'tag-office'}">${tr.warehouseId === 'CHEMICAL' ? 'Hóa chất' : 'VPP'}</span></td>
            <td><strong>${isOut ? tr.departmentName : tr.supplier}</strong></td>
            <td>${tr.caseCode ? `<strong>${tr.caseCode}</strong>: ` : ''}${tr.reason || '---'}</td>
            <td class="text-right font-bold">${formatCurrency(tr.totalAmount)}</td>
            <td class="text-center">
              <button class="btn btn-outline btn-sm btn-print-tr" data-id="${tr.id}" title="In Phiếu Khổ A4">🖨️ In A4</button>
            </td>
          </tr>
        `;
      });
    }

    bindDynamicButtons();
  }

  // 2. Render Inventory
  function renderInventoryView() {
    const searchQuery = ($('#inventory-search').value || '').trim().toLowerCase();
    const categoryFilter = $('#inventory-cat-filter').value;
    const statusFilter = $('#inventory-status-filter').value;

    let items = db.getItems(state.currentWarehouse);

    if (searchQuery) {
      items = items.filter(item => {
        const name = (item.name || '').toLowerCase();
        const code = (item.code || '').toLowerCase();
        const formula = (item.chemicalFormula || '').toLowerCase();
        const cas = (item.casNumber || '').toLowerCase();
        const mfg = (item.manufacturer || '').toLowerCase();
        const lots = (item.batches || []).map(b => (b.lotNumber || '').toLowerCase()).join(' ');
        return name.includes(searchQuery) || code.includes(searchQuery) || formula.includes(searchQuery) || cas.includes(searchQuery) || mfg.includes(searchQuery) || lots.includes(searchQuery);
      });
    }

    if (categoryFilter && categoryFilter !== 'ALL') {
      items = items.filter(i => i.category === categoryFilter);
    }

    if (statusFilter && statusFilter !== 'ALL') {
      items = items.filter(item => {
        const status = getItemStatusInfo(item);
        if (statusFilter === 'EXPIRED') return status.hasExpired;
        if (statusFilter === 'EXPIRING') return status.hasExpiringSoon;
        if (statusFilter === 'LOW_STOCK') return status.isLowStock;
        if (statusFilter === 'NORMAL') return !status.hasExpired && !status.hasExpiringSoon && !status.isLowStock;
        return true;
      });
    }

    const tbody = $('#inventory-tbody');
    tbody.innerHTML = '';

    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 40px; color: var(--text-muted);">Không tìm thấy mặt hàng nào phù hợp với bộ lọc tìm kiếm.</td></tr>`;
      return;
    }

    items.forEach((item, index) => {
      const status = getItemStatusInfo(item);
      const isChem = item.warehouseId === 'CHEMICAL';

      let batchesHtml = '<div class="batches-container">';
      if (item.batches && item.batches.length > 0) {
        item.batches.forEach(b => {
          const expDate = new Date(b.expiryDate);
          const daysLeft = Math.ceil((expDate - new Date()) / (1000 * 60 * 60 * 24));
          let pillClass = '';
          let badgeText = `HSD: ${formatDate(b.expiryDate)}`;

          if (daysLeft < 0) {
            pillClass = 'exp-danger';
            badgeText = `HẾT HẠN (${formatDate(b.expiryDate)})`;
          } else if (daysLeft <= 60) {
            pillClass = 'exp-warning';
            badgeText = `Còn ${daysLeft} ngày (${formatDate(b.expiryDate)})`;
          }

          batchesHtml += `
            <div class="batch-pill ${pillClass}">
              <span>Lô: <strong class="font-mono">${b.lotNumber}</strong></span>
              <span>SL: <strong>${b.quantity}</strong></span>
              <small style="font-size: 11px;">${badgeText}</small>
            </div>
          `;
        });
      } else {
        batchesHtml += `<small class="text-muted">Chưa có lô nhập</small>`;
      }
      batchesHtml += '</div>';

      let stockDisplayClass = status.isLowStock ? 'color: var(--danger); font-weight: 700;' : '';

      tbody.innerHTML += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td>
            <span class="font-mono font-bold">${item.code || '<em class="text-muted" style="font-weight: normal; font-size: 11.5px;">(Chưa có mã)</em>'}</span><br>
            <span class="tag ${isChem ? 'tag-chemical' : 'tag-office'}" style="font-size: 10px; margin-top: 2px;">
              ${isChem ? 'Hóa chất' : 'VPP'}
            </span>
          </td>
          <td>
            <strong>${item.name}</strong><br>
            <small class="text-muted">
              Quy cách: ${item.packingSpec || '---'} | Hãng: ${item.manufacturer || '---'} (${item.origin || ''})
            </small>
            ${item.chemicalFormula && item.chemicalFormula !== 'N/A' ? `<br><small class="font-mono">CT: <strong>${item.chemicalFormula}</strong> | CAS: ${item.casNumber || 'N/A'}</small>` : ''}
          </td>
          <td>
            <span class="tag tag-neutral" style="margin-bottom: 4px;">${item.category}</span><br>
            ${isChem ? getHazardBadgeHtml(item.hazardLevel) : ''}
          </td>
          <td>
            <small><strong>ĐK:</strong> ${item.storageCondition || 'Thường'}</small><br>
            <small class="text-muted"><strong>Vị trí:</strong> ${item.location || '---'}</small>
          </td>
          <td>${batchesHtml}</td>
          <td class="text-right">
            <div style="${stockDisplayClass}">
              <span style="font-size: 15px;">${formatNumber(status.totalQty)}</span> ${item.unit}
            </div>
            <small class="text-muted">Min: ${item.minStock}</small>
            ${status.isLowStock ? `<br><span class="tag tag-danger" style="font-size: 10px;">Dưới định mức</span>` : ''}
          </td>
          <td class="text-center">
            <div style="display: flex; gap: 4px; justify-content: center;">
              <button class="btn btn-outline btn-sm btn-view-card" data-id="${item.id}" title="Xem Thẻ Kho Chi Tiết">📊</button>
              <button class="btn btn-outline btn-sm btn-edit-item" data-id="${item.id}" title="Chỉnh sửa thông tin">✏️</button>
              <button class="btn btn-outline btn-sm btn-delete-item" data-id="${item.id}" title="Xóa mặt hàng" style="color: var(--danger);">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    });

    bindDynamicButtons();
  }

  // 3. Render Transactions
  function renderTransactionsView() {
    const searchQuery = ($('#transactions-search').value || '').trim().toLowerCase();
    const typeFilter = $('#transactions-type-filter').value;

    let transactions = db.getTransactions(state.currentWarehouse, typeFilter);

    if (searchQuery) {
      transactions = transactions.filter(tr => {
        const code = (tr.code || '').toLowerCase();
        const partner = ((tr.type === 'IN' ? tr.supplier : tr.departmentName) || '').toLowerCase();
        const reason = (tr.reason || '').toLowerCase();
        const caseCode = (tr.caseCode || '').toLowerCase();
        const receiver = (tr.receiver || '').toLowerCase();
        return code.includes(searchQuery) || partner.includes(searchQuery) || reason.includes(searchQuery) || caseCode.includes(searchQuery) || receiver.includes(searchQuery);
      });
    }

    const tbody = $('#transactions-tbody');
    tbody.innerHTML = '';

    if (transactions.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center" style="padding: 40px; color: var(--text-muted);">Không tìm thấy phiếu giao dịch nào.</td></tr>`;
      return;
    }

    transactions.forEach(tr => {
      const isOut = tr.type === 'OUT';
      const isChem = tr.warehouseId === 'CHEMICAL';

      tbody.innerHTML += `
        <tr>
          <td>
            <span class="font-mono font-bold">${tr.code || '<em class="text-muted" style="font-weight: normal; font-size: 11.5px;">(Chưa ghi số - Ký tay)</em>'}</span><br>
            <small class="text-muted">${tr.items.length} mặt hàng</small>
          </td>
          <td>
            <span class="tag ${isOut ? 'tag-warning' : 'tag-success'} font-bold">
              ${isOut ? 'Xuất Kho (-)' : 'Nhập Kho (+)'}
            </span>
          </td>
          <td>${formatDate(tr.date)}</td>
          <td><span class="tag ${isChem ? 'tag-chemical' : 'tag-office'}">${isChem ? 'Hóa chất' : 'VPP'}</span></td>
          <td><strong>${isOut ? tr.departmentName : tr.supplier}</strong></td>
          <td>
            ${tr.caseCode ? `<span style="color: var(--secondary); font-weight: 600;">[${tr.caseCode}]</span> ` : ''}
            ${tr.reason || '---'}
          </td>
          <td>
            <small>Giao: ${tr.deliverer || '---'}</small><br>
            <small>Nhận: <strong>${tr.receiver || '---'}</strong></small>
          </td>
          <td class="text-right font-bold" style="font-size: 14px;">${formatCurrency(tr.totalAmount)}</td>
          <td class="text-center">
            <div style="display: flex; gap: 6px; justify-content: center;">
              <button class="btn btn-outline btn-sm btn-print-tr" data-id="${tr.id}" title="In Phiếu Khổ A4">🖨️ In A4</button>
              <button class="btn btn-outline btn-sm btn-delete-tr" data-id="${tr.id}" title="Xóa và Hoàn Lại Tồn Kho" style="color: var(--danger);">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    });

    bindDynamicButtons();
  }

  // 4. Render Alerts
  function renderAlertsView() {
    const alerts = db.getAlerts(state.currentWarehouse);

    $('#alert-tab-count-expired').textContent = alerts.expired.length;
    $('#alert-tab-count-expiring').textContent = alerts.expiringSoon.length;
    $('#alert-tab-count-lowstock').textContent = alerts.lowStock.length;

    const expTbody = $('#alerts-expired-tbody');
    expTbody.innerHTML = '';
    if (alerts.expired.length === 0) {
      expTbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 30px; color: var(--success-dark);">✅ Không có hóa chất nào bị quá hạn sử dụng.</td></tr>`;
    } else {
      alerts.expired.forEach(ex => {
        expTbody.innerHTML += `
          <tr>
            <td><strong>${ex.item.name}</strong>${ex.item.code ? `<br><small class="font-mono text-muted">${ex.item.code}</small>` : ''}</td>
            <td class="font-mono font-bold">${ex.batch.lotNumber}</td>
            <td><strong style="color: var(--danger);">${formatDate(ex.batch.expiryDate)}</strong></td>
            <td><span class="tag tag-danger">Quá ${ex.daysOverdue} ngày</span></td>
            <td class="text-right font-bold">${ex.batch.quantity} ${ex.item.unit}</td>
            <td>${ex.item.location || 'Kho'}</td>
            <td>
              <button class="btn btn-danger btn-sm btn-dispose" data-id="${ex.item.id}" data-lot="${ex.batch.lotNumber}">
                🗑️ Lập Biên Bản Tiêu Hủy
              </button>
            </td>
          </tr>
        `;
      });
    }

    const expSoonTbody = $('#alerts-expiring-tbody');
    expSoonTbody.innerHTML = '';
    if (alerts.expiringSoon.length === 0) {
      expSoonTbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 30px; color: var(--success-dark);">✅ Không có hóa chất nào sắp hết hạn trong 60 ngày tới.</td></tr>`;
    } else {
      alerts.expiringSoon.forEach(es => {
        expSoonTbody.innerHTML += `
          <tr>
            <td><strong>${es.item.name}</strong>${es.item.code ? `<br><small class="font-mono text-muted">${es.item.code}</small>` : ''}</td>
            <td class="font-mono font-bold">${es.batch.lotNumber}</td>
            <td><strong style="color: var(--warning-dark);">${formatDate(es.batch.expiryDate)}</strong></td>
            <td><span class="tag tag-warning">Còn ${es.daysLeft} ngày</span></td>
            <td class="text-right font-bold">${es.batch.quantity} ${es.item.unit}</td>
            <td>
              <button class="btn btn-primary btn-sm btn-quick-out-fefo" data-id="${es.item.id}" data-lot="${es.batch.lotNumber}">
                📤 Xuất Ưu Tiên FEFO
              </button>
            </td>
          </tr>
        `;
      });
    }

    const lowTbody = $('#alerts-lowstock-tbody');
    lowTbody.innerHTML = '';
    if (alerts.lowStock.length === 0) {
      lowTbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 30px; color: var(--success-dark);">✅ Mọi mặt hàng đều đạt trên định mức tồn an toàn.</td></tr>`;
    } else {
      alerts.lowStock.forEach(ls => {
        lowTbody.innerHTML += `
          <tr>
            <td><strong>${ls.item.name}</strong>${ls.item.code ? `<br><small class="font-mono text-muted">${ls.item.code}</small>` : ''}</td>
            <td><span class="tag ${ls.item.warehouseId === 'CHEMICAL' ? 'tag-chemical' : 'tag-office'}">${ls.item.warehouseId === 'CHEMICAL' ? 'Hóa chất' : 'VPP'}</span></td>
            <td class="text-right font-bold" style="color: var(--danger); font-size: 14px;">${ls.totalQty}</td>
            <td class="text-right font-bold">${ls.minStock}</td>
            <td class="text-right font-bold" style="color: var(--warning-dark);">-${ls.diff}</td>
            <td>${ls.item.unit}</td>
            <td>
              <button class="btn btn-primary btn-sm btn-reorder" data-id="${ls.item.id}">
                📥 Lập Phiếu Dự Trù Nhập
              </button>
            </td>
          </tr>
        `;
      });
    }

    bindDynamicButtons();
  }

  // 5. Render Reports
  function renderReportsView() {
    const fromDate = $('#report-from-date').value;
    const toDate = $('#report-to-date').value;

    const reportData = db.getInventoryReport(state.currentWarehouse, fromDate, toDate);
    const tbody = $('#report-xnt-tbody');
    tbody.innerHTML = '';

    let totalInQty = 0;
    let totalOutQty = 0;
    let totalClosingQty = 0;
    let totalClosingVal = 0;

    reportData.forEach((row, index) => {
      totalInQty += row.periodIn;
      totalOutQty += row.periodOut;
      totalClosingQty += row.closingStock;
      totalClosingVal += row.closingValue;

      tbody.innerHTML += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td class="font-mono font-bold">${row.item.code || '---'}</td>
          <td><strong>${row.item.name}</strong></td>
          <td class="text-center">${row.item.unit}</td>
          <td class="text-right">${formatNumber(row.openingStock)}</td>
          <td class="text-right" style="color: var(--success-dark); font-weight: 600;">${row.periodIn > 0 ? '+' + formatNumber(row.periodIn) : '0'}</td>
          <td class="text-right" style="color: var(--danger); font-weight: 600;">${row.periodOut > 0 ? '-' + formatNumber(row.periodOut) : '0'}</td>
          <td class="text-right font-bold" style="font-size: 14px;">${formatNumber(row.closingStock)}</td>
          <td class="text-right">${formatCurrency(row.avgPrice)}</td>
          <td class="text-right font-bold">${formatCurrency(row.closingValue)}</td>
        </tr>
      `;
    });

    tbody.innerHTML += `
      <tr style="background: var(--bg-alt); font-weight: bold; border-top: 2px solid var(--border);">
        <td colspan="4" class="text-center">TỔNG CỘNG TOÀN KHO:</td>
        <td class="text-right">---</td>
        <td class="text-right" style="color: var(--success-dark);">+${formatNumber(totalInQty)}</td>
        <td class="text-right" style="color: var(--danger);">-${formatNumber(totalOutQty)}</td>
        <td class="text-right font-bold">${formatNumber(totalClosingQty)}</td>
        <td class="text-center">---</td>
        <td class="text-right font-bold" style="color: var(--primary-dark); font-size: 15px;">${formatCurrency(totalClosingVal)}</td>
      </tr>
    `;

    const deptTbody = $('#report-dept-tbody');
    deptTbody.innerHTML = '';
    const allTransactions = db.getTransactions(state.currentWarehouse, 'OUT');
    DEPARTMENTS.forEach((dept, index) => {
      const deptTrs = allTransactions.filter(t => t.departmentId === dept.id);
      let totalDeptAmount = 0;
      const itemsSet = new Set();

      deptTrs.forEach(t => {
        totalDeptAmount += Number(t.totalAmount || 0);
        (t.items || []).forEach(i => itemsSet.add(i.itemName));
      });

      const itemsSummary = Array.from(itemsSet).slice(0, 2).join(', ') + (itemsSet.size > 2 ? ` và ${itemsSet.size - 2} mặt hàng khác` : '');

      deptTbody.innerHTML += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td><strong>${dept.name}</strong><br><small class="text-muted">${dept.desc}</small></td>
          <td class="font-mono font-bold">${dept.code}</td>
          <td class="text-center">${deptTrs.length} đợt</td>
          <td><small>${itemsSummary || 'Chưa nhận vật tư trong kỳ'}</small></td>
          <td class="text-right font-bold" style="font-size: 14px; color: var(--secondary);">${formatCurrency(totalDeptAmount)}</td>
        </tr>
      `;
    });
  }

  // Bind Dynamic Buttons Across Tables
  function bindDynamicButtons() {
    $$('.btn-print-tr').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const tr = db.getData().transactions.find(t => t.id === id);
        if (tr) {
          const settings = db.getData().settings;
          if (tr.type === 'IN') printStockInReceipt(tr, settings);
          else printStockOutReceipt(tr, settings);
        }
      };
    });

    $$('.btn-delete-tr').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Bạn có chắc muốn xóa phiếu này? Số lượng tồn kho tương ứng sẽ được tự động hoàn tác.')) {
          db.deleteTransaction(id);
          showToast('Đã xóa phiếu và hoàn tác số lượng kho thành công!');
          renderTransactionsView();
        }
      };
    });

    $$('.btn-view-card').forEach(btn => {
      btn.onclick = () => openStockCardModal(btn.getAttribute('data-id'));
    });

    $$('.btn-edit-item').forEach(btn => {
      btn.onclick = () => openItemModal(btn.getAttribute('data-id'));
    });

    $$('.btn-delete-item').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const item = db.getItemById(id);
        if (confirm(`Bạn có chắc chắn muốn xóa mặt hàng: "${item.name}" khỏi cơ sở dữ liệu?`)) {
          db.deleteItem(id);
          showToast('Đã xóa mặt hàng thành công!');
          renderInventoryView();
        }
      };
    });

    $$('.btn-quick-out-fefo').forEach(btn => {
      btn.onclick = () => {
        openStockOutModal(btn.getAttribute('data-id'), btn.getAttribute('data-lot'));
      };
    });

    $$('.btn-dispose').forEach(btn => {
      btn.onclick = () => {
        const itemId = btn.getAttribute('data-id');
        const item = db.getItemById(itemId);
        if (confirm(`Bạn có chắc chắn muốn làm thủ tục tiêu hủy lô hóa chất đã hết hạn của: ${item?.name}?`)) {
          openStockOutModal(itemId, btn.getAttribute('data-lot'), 'Tiêu hủy hóa chất hết hạn theo quy chế an toàn phòng xét nghiệm');
        }
      };
    });

    $$('.btn-reorder').forEach(btn => {
      btn.onclick = () => {
        openStockInModal(btn.getAttribute('data-id'));
      };
    });
  }

  // Modals Management
  function openItemModal(itemId = null) {
    const modal = $('#modal-item');
    const form = $('#form-item');
    form.reset();

    const isChem = state.currentWarehouse === 'CHEMICAL' || state.currentWarehouse === 'ALL';
    $('#item-warehouse').value = isChem ? 'CHEMICAL' : 'OFFICE';
    updateItemModalFields();

    if (itemId) {
      const item = db.getItemById(itemId);
      if (!item) return;
      $('#modal-item-title').textContent = 'Chỉnh Sửa Thông Tin Mặt Hàng';
      $('#item-id').value = item.id;
      $('#item-warehouse').value = item.warehouseId;
      updateItemModalFields();
      $('#item-code').value = item.code || '';
      $('#item-category').value = item.category || '';
      $('#item-name').value = item.name || '';
      $('#item-formula').value = item.chemicalFormula || '';
      $('#item-cas').value = item.casNumber || '';
      $('#item-hazard').value = item.hazardLevel || 'Thường';
      $('#item-manufacturer').value = item.manufacturer || '';
      $('#item-origin').value = item.origin || '';
      $('#item-unit').value = item.unit || '';
      $('#item-packing').value = item.packingSpec || '';
      $('#item-location').value = item.location || '';
      $('#item-storage').value = item.storageCondition || '';
      $('#item-min-stock').value = item.minStock || 5;
      $('#item-notes').value = item.notes || '';
    } else {
      $('#modal-item-title').textContent = 'Thêm Mặt Hàng / Hóa Chất Mới';
      $('#item-id').value = '';
      $('#item-code').value = '';
    }

    modal.classList.add('open');
  }

  function updateItemModalFields() {
    const wh = $('#item-warehouse').value;
    const isChem = wh === 'CHEMICAL';
    $$('#form-item .field-chem').forEach(el => {
      el.style.display = isChem ? 'flex' : 'none';
    });

    const catSelect = $('#item-category');
    catSelect.innerHTML = '';
    const categories = WAREHOUSES[wh]?.categories || [];
    categories.forEach(cat => {
      catSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
  }

  // Helper: Cập nhật tổng tiền tức thời trong Modal Nhập Kho
  function updateInModalTotal() {
    let total = 0;
    $$('#in-items-tbody tr').forEach(row => {
      const qty = Number(row.querySelector('.in-qty')?.value) || 0;
      const price = Number(row.querySelector('.in-price')?.value) || 0;
      total += qty * price;
    });
    const sumEl = $('#in-total-summary');
    if (sumEl) sumEl.textContent = formatCurrency(total);
  }

  // Helper: Cập nhật tổng tiền tức thời trong Modal Xuất Kho
  function updateOutModalTotal() {
    let total = 0;
    $$('#out-items-tbody tr').forEach(row => {
      const qty = Number(row.querySelector('.out-qty')?.value) || 0;
      const lotSelect = row.querySelector('.out-lot-select');
      const opt = lotSelect ? lotSelect.options[lotSelect.selectedIndex] : null;
      const price = Number(opt?.getAttribute('data-price')) || 0;
      total += qty * price;
    });
    const sumEl = $('#out-total-summary');
    if (sumEl) sumEl.textContent = formatCurrency(total);
  }

  function openStockInModal(suggestItemId = null) {
    const modal = $('#modal-stock-in');
    const form = $('#form-stock-in');
    form.reset();

    if ($('#in-code')) $('#in-code').value = '';
    const today = new Date().toISOString().split('T')[0];
    $('#in-date').value = today;
    $('#in-warehouse').value = state.currentWarehouse === 'OFFICE' ? 'OFFICE' : 'CHEMICAL';

    const tbody = $('#in-items-tbody');
    tbody.innerHTML = '';
    addStockInItemRow(suggestItemId);
    updateInModalTotal();

    modal.classList.add('open');
  }

  function addStockInItemRow(preselectedItemId = null) {
    const tbody = $('#in-items-tbody');
    const wh = $('#in-warehouse').value;
    const items = db.getItems(wh);

    let optionsHtml = '';
    items.forEach(item => {
      const selected = item.id === preselectedItemId ? 'selected' : '';
      optionsHtml += `<option value="${item.id}" ${selected}>${item.code} - ${item.name} (${item.unit})</option>`;
    });

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <select class="form-control in-item-select" required>
          <option value="">-- Chọn mặt hàng từ danh mục --</option>
          <option value="__CUSTOM__" style="color: var(--primary-dark); font-weight: bold; background: #f0fdfa;">➕ [Tự Nhập Mặt Hàng Mới / Khác...]</option>
          <optgroup label="--- Danh Mục Có Sẵn Trong Kho ---">
            ${optionsHtml}
          </optgroup>
        </select>
        <div class="in-custom-container" style="display: none; margin-top: 8px; background: #f0fdfa; padding: 10px; border-radius: 6px; border: 1px dashed var(--primary);">
          <div style="font-size: 11.5px; font-weight: 700; color: var(--primary-dark); margin-bottom: 6px;">⭐ Nhập Thông Tin Mặt Hàng Mới (Tự lưu vào Danh mục Kho):</div>
          <input type="text" class="form-control in-custom-name" placeholder="* Tên mặt hàng mới (VD: Que test ma túy loại mới...)" style="margin-bottom: 6px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            <input type="text" class="form-control font-mono in-custom-code" placeholder="Mã VT/VPP (tự điền hoặc để trống)">
            <input type="text" class="form-control in-custom-unit" placeholder="* ĐVT (Chai, Lọ, Bộ, Ram...)" value="Hộp">
          </div>
        </div>
      </td>
      <td><input type="text" class="form-control font-mono in-lot" placeholder="Số Lô" required></td>
      <td><input type="date" class="form-control in-exp" value="2027-12-31"></td>
      <td><input type="number" class="form-control in-qty" min="1" value="10" required></td>
      <td><input type="number" class="form-control in-price" min="0" value="100000" step="1000"></td>
      <td class="text-center"><button type="button" class="btn btn-outline btn-sm btn-remove-row" style="color: var(--danger); font-size: 16px; font-weight: bold;">&times;</button></td>
    `;

    tbody.appendChild(row);

    const qtyInput = row.querySelector('.in-qty');
    const priceInput = row.querySelector('.in-price');
    const select = row.querySelector('.in-item-select');
    const customContainer = row.querySelector('.in-custom-container');
    const customNameInput = row.querySelector('.in-custom-name');
    const customUnitInput = row.querySelector('.in-custom-unit');

    qtyInput.addEventListener('input', updateInModalTotal);
    priceInput.addEventListener('input', updateInModalTotal);

    row.querySelector('.btn-remove-row').addEventListener('click', () => {
      if (tbody.children.length > 1) {
        row.remove();
        updateInModalTotal();
      } else {
        showToast('Phiếu nhập phải có ít nhất 1 mặt hàng!', 'warning');
      }
    });

    select.addEventListener('change', () => {
      if (select.value === '__CUSTOM__') {
        customContainer.style.display = 'block';
        customNameInput.required = true;
        customUnitInput.required = true;
      } else {
        customContainer.style.display = 'none';
        customNameInput.required = false;
        customUnitInput.required = false;
        const it = db.getItemById(select.value);
        if (it && it.batches && it.batches.length > 0) {
          priceInput.value = it.batches[0].unitPrice || 0;
        }
      }
      updateInModalTotal();
    });

    updateInModalTotal();
    return row;
  }

  function openStockOutModal(suggestItemId = null, suggestLot = null, presetReason = null) {
    const modal = $('#modal-stock-out');
    const form = $('#form-stock-out');
    form.reset();

    if ($('#out-code')) $('#out-code').value = '';
    const today = new Date().toISOString().split('T')[0];
    $('#out-date').value = today;
    $('#out-warehouse').value = state.currentWarehouse === 'OFFICE' ? 'OFFICE' : 'CHEMICAL';
    if (presetReason) $('#out-reason').value = presetReason;

    const tbody = $('#out-items-tbody');
    tbody.innerHTML = '';
    addStockOutItemRow(suggestItemId, suggestLot);
    updateOutModalTotal();

    modal.classList.add('open');
  }

  function addStockOutItemRow(preselectedItemId = null, preselectedLot = null) {
    const tbody = $('#out-items-tbody');
    const wh = $('#out-warehouse').value;
    const items = db.getItems(wh).filter(i => getItemTotalQty(i) > 0);

    let optionsHtml = '';
    items.forEach(item => {
      const total = getItemTotalQty(item);
      const selected = item.id === preselectedItemId ? 'selected' : '';
      optionsHtml += `<option value="${item.id}" ${selected}>${item.code} - ${item.name} (Tồn: ${total} ${item.unit})</option>`;
    });

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <select class="form-control out-item-select" required>
          <option value="">-- Chọn mặt hàng từ danh mục --</option>
          <option value="__CUSTOM__" style="color: var(--secondary); font-weight: bold; background: #eff6ff;">➕ [Tự Nhập Mặt Hàng Xuất Khác...]</option>
          <optgroup label="--- Mặt Hàng Còn Tồn Trong Kho ---">
            ${optionsHtml}
          </optgroup>
        </select>
        <div class="out-custom-container" style="display: none; margin-top: 8px; background: #eff6ff; padding: 10px; border-radius: 6px; border: 1px dashed var(--secondary);">
          <div style="font-size: 11.5px; font-weight: 700; color: var(--secondary); margin-bottom: 6px;">⭐ Nhập Tên Mặt Hàng Xuất Đột Xuất / Khác:</div>
          <input type="text" class="form-control out-custom-name" placeholder="* Tên mặt hàng xuất..." style="margin-bottom: 6px;">
          <input type="text" class="form-control out-custom-unit" placeholder="* ĐVT (Cái, Lọ, Bộ, Ram...)" value="Cái">
        </div>
      </td>
      <td>
        <div class="out-lot-container">
          <select class="form-control out-lot-select" required>
            <option value="">-- Chọn Lô xuất --</option>
          </select>
          <input type="text" class="form-control font-mono out-custom-lot" placeholder="Số Lô (tùy chọn)" value="LÔ-XUẤT" style="display: none; margin-top: 6px;">
        </div>
      </td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <input type="number" class="form-control out-qty" min="1" value="1" required>
          <span class="out-unit-label" style="font-size: 12px; font-weight: 600; color: var(--text-muted);">---</span>
        </div>
      </td>
      <td class="text-center"><button type="button" class="btn btn-outline btn-sm btn-remove-row" style="color: var(--danger); font-size: 16px; font-weight: bold;">&times;</button></td>
    `;

    tbody.appendChild(row);

    const itemSelect = row.querySelector('.out-item-select');
    const lotSelect = row.querySelector('.out-lot-select');
    const customLotInput = row.querySelector('.out-custom-lot');
    const unitLabel = row.querySelector('.out-unit-label');
    const qtyInput = row.querySelector('.out-qty');
    const customContainer = row.querySelector('.out-custom-container');
    const customNameInput = row.querySelector('.out-custom-name');
    const customUnitInput = row.querySelector('.out-custom-unit');

    function updateLotDropdown() {
      const itemId = itemSelect.value;
      if (itemId === '__CUSTOM__') {
        customContainer.style.display = 'block';
        customNameInput.required = true;
        customUnitInput.required = true;
        lotSelect.style.display = 'none';
        lotSelect.required = false;
        customLotInput.style.display = 'block';
        unitLabel.textContent = customUnitInput.value || 'Cái';
        qtyInput.max = 999999;
        updateOutModalTotal();
        return;
      }

      customContainer.style.display = 'none';
      customNameInput.required = false;
      customUnitInput.required = false;
      lotSelect.style.display = 'block';
      lotSelect.required = true;
      customLotInput.style.display = 'none';

      lotSelect.innerHTML = '';
      if (!itemId) {
        lotSelect.innerHTML = '<option value="">-- Chọn Lô xuất --</option>';
        unitLabel.textContent = '---';
        updateOutModalTotal();
        return;
      }

      const item = db.getItemById(itemId);
      if (!item) return;
      unitLabel.textContent = item.unit;

      const sortedBatches = [...(item.batches || [])].filter(b => b.quantity > 0).sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

      if (sortedBatches.length === 0) {
        lotSelect.innerHTML = '<option value="">Hết hàng trong kho</option>';
        updateOutModalTotal();
        return;
      }

      sortedBatches.forEach((b, idx) => {
        const isNearest = idx === 0;
        const isPreselected = b.lotNumber === preselectedLot;
        const isSelected = isPreselected || (!preselectedLot && isNearest);
        const tag = isNearest ? ' [⭐ FEFO Gợi Ý - HSD Gần Nhất]' : '';
        lotSelect.innerHTML += `
          <option value="${b.lotNumber}" data-qty="${b.quantity}" data-exp="${b.expiryDate}" data-price="${b.unitPrice || 0}" ${isSelected ? 'selected' : ''}>
            Lô ${b.lotNumber} (Tồn: ${b.quantity}) - HSD: ${formatDate(b.expiryDate)}${tag}
          </option>
        `;
      });

      updateMaxQty();
      updateOutModalTotal();
    }

    function updateMaxQty() {
      if (itemSelect.value === '__CUSTOM__') {
        qtyInput.max = 999999;
        return;
      }
      const selectedOption = lotSelect.options[lotSelect.selectedIndex];
      if (selectedOption) {
        const maxQty = Number(selectedOption.getAttribute('data-qty')) || 999;
        qtyInput.max = maxQty;
      }
    }

    itemSelect.addEventListener('change', updateLotDropdown);
    lotSelect.addEventListener('change', () => {
      updateMaxQty();
      updateOutModalTotal();
    });
    qtyInput.addEventListener('input', updateOutModalTotal);
    customUnitInput.addEventListener('input', () => {
      unitLabel.textContent = customUnitInput.value || 'Cái';
    });

    if (preselectedItemId) {
      updateLotDropdown();
    }

    row.querySelector('.btn-remove-row').addEventListener('click', () => {
      if (tbody.children.length > 1) {
        row.remove();
        updateOutModalTotal();
      } else {
        showToast('Phiếu xuất phải có ít nhất 1 mặt hàng!', 'warning');
      }
    });

    updateOutModalTotal();
    return row;
  }

  function openStockCardModal(itemId) {
    state.currentStockCardItemId = itemId;
    const cardData = db.getStockCard(itemId);
    if (!cardData) return;

    const item = cardData.item;
    $('#modal-stock-card-title').textContent = `Thẻ Kho Chi Tiết - ${item.name}`;

    let rowsHtml = '';
    if (cardData.history.length === 0) {
      rowsHtml = `<tr><td colspan="8" class="text-center" style="padding: 24px; color: var(--text-muted);">Chưa có lịch sử giao dịch phát sinh.</td></tr>`;
    } else {
      cardData.history.forEach((h, idx) => {
        rowsHtml += `
          <tr>
            <td class="text-center">${idx + 1}</td>
            <td>${formatDate(h.date)}</td>
            <td class="font-mono font-bold">${h.code}</td>
            <td>${h.reason || ''} ${h.caseCode ? `<strong>(${h.caseCode})</strong>` : ''}</td>
            <td>${h.partner || '---'}</td>
            <td class="font-mono">${h.lotNumber}</td>
            <td class="text-right" style="color: var(--success-dark); font-weight: 600;">${h.quantityIn > 0 ? '+' + formatNumber(h.quantityIn) : '-'}</td>
            <td class="text-right" style="color: var(--danger); font-weight: 600;">${h.quantityOut > 0 ? '-' + formatNumber(h.quantityOut) : '-'}</td>
            <td class="text-right font-bold">${formatNumber(h.runningBalance)}</td>
          </tr>
        `;
      });
    }

    $('#modal-stock-card-body').innerHTML = `
      <div style="background: var(--bg-alt); padding: 14px; border-radius: var(--radius-md); margin-bottom: 16px; border: 1px solid var(--border);">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 13px;">
          <div><strong>Mã VT/VPP:</strong> <span class="font-mono">${item.code || '---'}</span></div>
          <div><strong>ĐVT:</strong> ${item.unit}</div>
          <div><strong>Quy cách:</strong> ${item.packingSpec || 'N/A'}</div>
          <div><strong>Vị trí kho:</strong> ${item.location || '---'}</div>
          <div><strong>Bảo quản:</strong> ${item.storageCondition || '---'}</div>
          <div><strong>Tồn hiện tại:</strong> <span style="font-weight: 700; color: var(--primary-dark); font-size: 14px;">${formatNumber(getItemTotalQty(item))} ${item.unit}</span></div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ngày Tháng</th>
              <th>Số Chứng Từ</th>
              <th>Diễn Giải / Vụ Án</th>
              <th>Đơn Vị Nhận / Giao</th>
              <th>Số Lô</th>
              <th class="text-right">Nhập</th>
              <th class="text-right">Xuất</th>
              <th class="text-right font-bold">Tồn Cuối</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;

    $('#modal-stock-card').classList.add('open');
  }

  function updateCategoryDropdowns() {
    const catFilter = $('#inventory-cat-filter');
    if (!catFilter) return;
    catFilter.innerHTML = '<option value="ALL">-- Tất cả Phân loại --</option>';

    let categories = [];
    if (state.currentWarehouse === 'CHEMICAL') {
      categories = WAREHOUSES.CHEMICAL.categories;
    } else if (state.currentWarehouse === 'OFFICE') {
      categories = WAREHOUSES.OFFICE.categories;
    } else {
      categories = [...WAREHOUSES.CHEMICAL.categories, ...WAREHOUSES.OFFICE.categories];
    }

    categories.forEach(cat => {
      catFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
  }

  function updateDepartmentDropdowns() {
    const deptSelect = $('#out-department');
    if (!deptSelect) return;
    deptSelect.innerHTML = '';
    DEPARTMENTS.forEach(dept => {
      deptSelect.innerHTML += `<option value="${dept.id}">[${dept.code}] ${dept.name}</option>`;
    });
  }

  
  // Update Cloud Status Badge & Buttons
  function updateCloudStatusUI(status = null, text = null) {
    const cloudCfg = db.getData().settings?.cloudSync || {};
    const isEnabled = cloudCfg.enabled;
    const headerBadge = $('#cloud-sync-status');
    const headerText = $('#cloud-sync-text');
    const settingsBadge = $('#settings-cloud-badge');

    const currentStatus = status || (isEnabled ? 'online' : 'offline');
    let displayText = text;
    if (!displayText) {
      if (currentStatus === 'online') {
        displayText = 'Đám Mây: Đã Kết Nối';
      } else if (currentStatus === 'syncing') {
        displayText = 'Đang Đồng Bộ...';
      } else if (currentStatus === 'error') {
        displayText = 'Đám Mây: Lỗi Kết Nối';
      } else {
        displayText = 'Cục Bộ (Offline)';
      }
    }

    if (headerBadge) {
      headerBadge.className = `cloud-status-badge status-${currentStatus}`;
      if (headerText) headerText.textContent = displayText;
    }

    if (settingsBadge) {
      settingsBadge.className = `cloud-status-badge status-${currentStatus}`;
      const sText = settingsBadge.querySelector('.status-text');
      if (sText) {
        sText.textContent = isEnabled ? '🟢 Đã Bật Supabase Cloud' : '🟡 Chế độ Cục bộ (Offline)';
      }
    }
  }

  function loadSettingsView() {
    const settings = db.getData().settings;
    if ($('#set-parent-org')) $('#set-parent-org').value = settings.parentOrg || 'SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH';
    if ($('#set-org-name')) $('#set-org-name').value = settings.orgName || 'TRUNG TÂM PHÁP Y THÀNH PHỐ';
    if ($('#set-org-address')) $('#set-org-address').value = settings.orgAddress || '';
    if ($('#set-org-phone')) $('#set-org-phone').value = settings.orgPhone || '';
    if ($('#set-storekeeper')) $('#set-storekeeper').value = settings.storekeeper || '';
    if ($('#set-head-admin')) $('#set-head-admin').value = settings.headOfAdmin || '';
    if ($('#set-manager-name')) $('#set-manager-name').value = settings.managerName || '';
    if ($('#sidebar-user-name')) $('#sidebar-user-name').textContent = settings.storekeeper || 'Lê Văn Quý';

    const cloud = settings.cloudSync || {};
    if ($('#set-supabase-url')) $('#set-supabase-url').value = cloud.supabaseUrl || '';
    if ($('#set-supabase-key')) $('#set-supabase-key').value = cloud.supabaseKey || '';
    if ($('#set-supabase-autosync')) $('#set-supabase-autosync').checked = cloud.autoSync !== false;
    updateCloudStatusUI();
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Mobile Sidebar Drawer Controls
    const sidebar = $('#app-sidebar');
    const backdrop = $('#sidebar-backdrop');
    const toggleBtn = $('#btn-toggle-sidebar');
    const closeBtn = $('#btn-close-sidebar');

    const openMobileSidebar = () => {
      if (sidebar) sidebar.classList.add('mobile-active');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeMobileSidebar = () => {
      if (sidebar) sidebar.classList.remove('mobile-active');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (toggleBtn) toggleBtn.onclick = openMobileSidebar;
    if (closeBtn) closeBtn.onclick = closeMobileSidebar;
    if (backdrop) backdrop.onclick = closeMobileSidebar;

    // Navigation (Auto closes mobile sidebar on selection)
    $$('.sidebar-nav .nav-item').forEach(item => {
      item.onclick = (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        switchView(view);
        closeMobileSidebar();
      };
    });

    // Warehouse selector
    const tabs = [
      { id: 'wh-btn-all', code: 'ALL', cls: 'active-all' },
      { id: 'wh-btn-chemical', code: 'CHEMICAL', cls: 'active-chemical' },
      { id: 'wh-btn-office', code: 'OFFICE', cls: 'active-office' }
    ];

    tabs.forEach(t => {
      const el = $(`#${t.id}`);
      if (el) {
        el.onclick = () => {
          state.currentWarehouse = t.code;
          tabs.forEach(item => {
            const btnEl = $(`#${item.id}`);
            if (btnEl) btnEl.className = `wh-tab-btn ${item.code === t.code ? item.cls : ''}`;
          });
          updateCategoryDropdowns();
          renderCurrentView();
        };
      }
    });

    // Header Quick Buttons
    $('#btn-quick-stock-in').onclick = () => openStockInModal();
    $('#btn-quick-stock-out').onclick = () => openStockOutModal();
    if ($('#btn-view-all-alerts')) $('#btn-view-all-alerts').onclick = () => switchView('alerts');
    if ($('#btn-view-all-transactions')) $('#btn-view-all-transactions').onclick = () => switchView('transactions');

    // Alert Sub-tabs
    $$('.tab-nav button[data-alert-tab]').forEach(tabBtn => {
      tabBtn.onclick = () => {
        const tab = tabBtn.getAttribute('data-alert-tab');
        state.activeAlertTab = tab;
        $$('.tab-nav button[data-alert-tab]').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');

        $$('.alert-subpanel').forEach(panel => panel.style.display = 'none');
        $(`#alert-tab-content-${tab}`).style.display = 'block';
      };
    });

    // Inventory Controls
    $('#inventory-search').oninput = () => renderInventoryView();
    $('#inventory-cat-filter').onchange = () => renderInventoryView();
    $('#inventory-status-filter').onchange = () => renderInventoryView();
    $('#btn-add-item').onclick = () => openItemModal();

    // Item Modal
    $('#btn-close-item-modal').onclick = () => $('#modal-item').classList.remove('open');
    $('#btn-cancel-item-modal').onclick = () => $('#modal-item').classList.remove('open');
    $('#item-warehouse').onchange = () => updateItemModalFields();

    $('#form-item').onsubmit = (e) => {
      e.preventDefault();
      const itemId = $('#item-id').value;
      const newItem = {
        id: itemId || null,
        warehouseId: $('#item-warehouse').value,
        code: $('#item-code').value.trim(),
        category: $('#item-category').value,
        name: $('#item-name').value.trim(),
        chemicalFormula: $('#item-formula').value.trim() || 'N/A',
        casNumber: $('#item-cas').value.trim() || 'N/A',
        hazardLevel: $('#item-hazard').value,
        manufacturer: $('#item-manufacturer').value.trim(),
        origin: $('#item-origin').value.trim(),
        unit: $('#item-unit').value.trim(),
        packingSpec: $('#item-packing').value.trim(),
        location: $('#item-location').value.trim(),
        storageCondition: $('#item-storage').value.trim(),
        minStock: Number($('#item-min-stock').value) || 0,
        notes: $('#item-notes').value.trim()
      };

      if (itemId) {
        const existing = db.getItemById(itemId);
        if (existing) newItem.batches = existing.batches || [];
      } else {
        newItem.batches = [];
      }

      db.saveItem(newItem);
      $('#modal-item').classList.remove('open');
      showToast(`Đã ${itemId ? 'cập nhật' : 'thêm'} mặt hàng "${newItem.name}" thành công!`);
      renderInventoryView();
      updateGlobalAlertBadge();
    };

    // Stock In Modal Submission (Có tự lưu mặt hàng mới __CUSTOM__)
    const handleAddInRowAction = () => {
      const newRow = addStockInItemRow();
      if (newRow) {
        setTimeout(() => {
          newRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          const sel = newRow.querySelector('.in-item-select');
          if (sel) sel.focus();
        }, 50);
      }
    };

    $('#btn-create-stock-in').onclick = () => openStockInModal();
    $('#btn-close-in-modal').onclick = () => $('#modal-stock-in').classList.remove('open');
    $('#btn-cancel-in-modal').onclick = () => $('#modal-stock-in').classList.remove('open');
    $('#btn-add-in-row').onclick = handleAddInRowAction;
    if ($('#btn-add-in-row-bottom')) $('#btn-add-in-row-bottom').onclick = handleAddInRowAction;
    $('#in-warehouse').onchange = () => {
      $('#in-items-tbody').innerHTML = '';
      addStockInItemRow();
    };

    $('#form-stock-in').onsubmit = (e) => {
      e.preventDefault();
      const rows = $$('#in-items-tbody tr');
      const items = [];
      let totalAmount = 0;
      const wh = $('#in-warehouse').value;

      rows.forEach(row => {
        const select = row.querySelector('.in-item-select');
        let itemId = select.value;
        if (!itemId) return;

        let itemCode = '';
        let itemName = '';
        let unit = '';

        if (itemId === '__CUSTOM__') {
          const customName = row.querySelector('.in-custom-name').value.trim();
          const customCode = row.querySelector('.in-custom-code').value.trim();
          const customUnit = row.querySelector('.in-custom-unit').value.trim() || 'Cái';

          if (!customName) return;

          // Tự động tạo và lưu mặt hàng mới vào danh mục
          const createdItem = db.saveItem({
            warehouseId: wh,
            code: customCode,
            name: customName,
            category: wh === 'CHEMICAL' ? 'Hóa chất phân tích độc chất & Sắc ký' : 'Vật phẩm phục vụ phòng ban',
            unit: customUnit,
            minStock: 5,
            hazardLevel: 'Thường',
            storageCondition: 'Nhiệt độ phòng'
          });

          itemId = createdItem.id;
          itemCode = createdItem.code;
          itemName = createdItem.name;
          unit = createdItem.unit;
        } else {
          const item = db.getItemById(itemId);
          if (item) {
            itemCode = item.code;
            itemName = item.name;
            unit = item.unit;
          }
        }

        const lotNumber = row.querySelector('.in-lot').value.trim() || 'LÔ-MỚI';
        const expiryDate = row.querySelector('.in-exp').value || '2030-12-31';
        const quantity = Number(row.querySelector('.in-qty').value) || 0;
        const unitPrice = Number(row.querySelector('.in-price').value) || 0;
        const amount = quantity * unitPrice;
        totalAmount += amount;

        items.push({
          itemId,
          itemCode,
          itemName,
          unit,
          lotNumber,
          expiryDate,
          quantity,
          unitPrice,
          amount
        });
      });

      if (items.length === 0) {
        showToast('Vui lòng chọn hoặc tự nhập ít nhất 1 mặt hàng cần nhập!', 'danger');
        return;
      }

      const enteredCode = $('#in-code') ? $('#in-code').value.trim() : '';
      const tr = {
        code: enteredCode,
        warehouseId: wh,
        date: $('#in-date').value,
        supplier: $('#in-supplier').value.trim(),
        invoiceNumber: $('#in-invoice').value.trim(),
        deliverer: $('#in-deliverer').value.trim(),
        receiver: $('#in-receiver').value.trim(),
        reason: $('#in-reason').value.trim(),
        totalAmount,
        items
      };

      db.createStockInTransaction(tr);
      $('#modal-stock-in').classList.remove('open');
      showToast(`Đã lập Phiếu Nhập Kho thành công!${tr.code ? ` (${tr.code})` : ''}`);
      renderCurrentView();

      if (confirm(`Phiếu nhập kho${tr.code ? ` (${tr.code})` : ''} đã lưu. Bạn có muốn in Phiếu Nhập Kho A4 ngay bây giờ?`)) {
        printStockInReceipt(tr, db.getData().settings);
      }
    };

    // Stock Out Modal Submission (Có tự nhập xuất đột xuất __CUSTOM__)
    const handleAddOutRowAction = () => {
      const newRow = addStockOutItemRow();
      if (newRow) {
        setTimeout(() => {
          newRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          const sel = newRow.querySelector('.out-item-select');
          if (sel) sel.focus();
        }, 50);
      }
    };

    $('#btn-create-stock-out').onclick = () => openStockOutModal();
    $('#btn-close-out-modal').onclick = () => $('#modal-stock-out').classList.remove('open');
    $('#btn-cancel-out-modal').onclick = () => $('#modal-stock-out').classList.remove('open');
    $('#btn-add-out-row').onclick = handleAddOutRowAction;
    if ($('#btn-add-out-row-bottom')) $('#btn-add-out-row-bottom').onclick = handleAddOutRowAction;
    $('#out-warehouse').onchange = () => {
      $('#out-items-tbody').innerHTML = '';
      addStockOutItemRow();
    };

    $('#form-stock-out').onsubmit = (e) => {
      e.preventDefault();
      const rows = $$('#out-items-tbody tr');
      const items = [];
      let totalAmount = 0;
      let hasError = false;
      const wh = $('#out-warehouse').value;

      rows.forEach(row => {
        const select = row.querySelector('.out-item-select');
        let itemId = select.value;
        if (!itemId) return;

        let itemCode = '';
        let itemName = '';
        let unit = '';
        let lotNumber = '';
        let expiryDate = '';
        let unitPrice = 0;
        const quantity = Number(row.querySelector('.out-qty').value) || 0;

        if (itemId === '__CUSTOM__') {
          itemName = row.querySelector('.out-custom-name').value.trim();
          unit = row.querySelector('.out-custom-unit').value.trim() || 'Cái';
          itemCode = wh === 'CHEMICAL' ? 'HC-DX' : 'VPP-DX';
          lotNumber = row.querySelector('.out-custom-lot').value.trim() || 'LÔ-XUẤT';
          expiryDate = '---';
          unitPrice = 0;
          if (!itemName) return;
        } else {
          const item = db.getItemById(itemId);
          if (item) {
            itemCode = item.code;
            itemName = item.name;
            unit = item.unit;
          }

          const lotSelect = row.querySelector('.out-lot-select');
          lotNumber = lotSelect.value;
          const opt = lotSelect.options[lotSelect.selectedIndex];
          const maxAvailable = Number(opt?.getAttribute('data-qty')) || 0;
          expiryDate = opt?.getAttribute('data-exp') || '';
          unitPrice = Number(opt?.getAttribute('data-price')) || 0;

          if (quantity > maxAvailable) {
            showToast(`Số lượng xuất "${itemName}" (Lô ${lotNumber}) vượt quá tồn thực tế (${maxAvailable})!`, 'danger');
            hasError = true;
            return;
          }
        }

        const amount = quantity * unitPrice;
        totalAmount += amount;

        items.push({
          itemId,
          itemCode,
          itemName,
          unit,
          lotNumber,
          expiryDate,
          quantity,
          unitPrice,
          amount
        });
      });

      if (hasError) return;
      if (items.length === 0) {
        showToast('Vui lòng chọn hoặc tự nhập ít nhất 1 mặt hàng cần xuất!', 'danger');
        return;
      }

      const deptSelect = $('#out-department');
      const selectedDeptId = deptSelect.value;
      const deptObj = DEPARTMENTS.find(d => d.id === selectedDeptId);

      const enteredCode = $('#out-code') ? $('#out-code').value.trim() : '';
      const tr = {
        code: enteredCode,
        warehouseId: wh,
        date: $('#out-date').value,
        departmentId: selectedDeptId,
        departmentName: deptObj?.name || 'Khoa Phòng Khác',
        caseCode: $('#out-case-code').value.trim(),
        deliverer: $('#sidebar-user-name').textContent,
        receiver: $('#out-receiver').value.trim(),
        approver: $('#out-approver').value.trim(),
        reason: $('#out-reason').value.trim(),
        totalAmount,
        items
      };

      db.createStockOutTransaction(tr);
      $('#modal-stock-out').classList.remove('open');
      showToast(`Đã lập Phiếu Xuất Kho thành công!${tr.code ? ` (${tr.code})` : ''}`);
      renderCurrentView();

      if (confirm(`Phiếu xuất kho${tr.code ? ` (${tr.code})` : ''} đã lưu. Bạn có muốn in Phiếu Xuất Kho A4 ngay bây giờ?`)) {
        printStockOutReceipt(tr, db.getData().settings);
      }
    };

    // Stock Card Modal
    $('#btn-close-card-modal').onclick = () => $('#modal-stock-card').classList.remove('open');
    $('#btn-cancel-card-modal').onclick = () => $('#modal-stock-card').classList.remove('open');
    $('#btn-print-stock-card').onclick = () => {
      if (state.currentStockCardItemId) {
        const cardData = db.getStockCard(state.currentStockCardItemId);
        if (cardData) printStockCard(cardData, db.getData().settings);
      }
    };

    // Transactions Search & Filters
    $('#transactions-search').oninput = () => renderTransactionsView();
    $('#transactions-type-filter').onchange = () => renderTransactionsView();

    // Reports Events
    $('#btn-filter-report').onclick = () => renderReportsView();
    $('#btn-print-inventory-report').onclick = () => {
      const fromDate = $('#report-from-date').value;
      const toDate = $('#report-to-date').value;
      const whName = state.currentWarehouse === 'CHEMICAL' ? 'Kho Hóa chất & Sinh phẩm' : (state.currentWarehouse === 'OFFICE' ? 'Kho Văn phòng phẩm' : 'Tất cả 2 Kho');
      const reportData = db.getInventoryReport(state.currentWarehouse, fromDate, toDate);
      printInventoryReport(reportData, whName, fromDate, toDate, db.getData().settings);
    };

    $('#btn-export-inventory-excel').onclick = () => {
      const fromDate = $('#report-from-date').value;
      const toDate = $('#report-to-date').value;
      const reportData = db.getInventoryReport(state.currentWarehouse, fromDate, toDate);

      const rows = [
        ['BÁO CÁO XUẤT NHẬP TỒN - TRUNG TÂM PHÁP Y THÀNH PHỐ'],
        [`Từ ngày: ${fromDate || 'Đầu kỳ'}`, `Đến ngày: ${toDate || 'Hiện tại'}`],
        ['STT', 'Mã VT/HC', 'Tên Vật Tư / Hóa Chất', 'ĐVT', 'Tồn Đầu Kỳ', 'Nhập Trong Kỳ', 'Xuất Trong Kỳ', 'Tồn Cuối Kỳ', 'Đơn Giá TB (VNĐ)', 'Thành Tiền Tồn (VNĐ)']
      ];

      reportData.forEach((r, idx) => {
        rows.push([
          idx + 1,
          r.item.code,
          r.item.name,
          r.item.unit,
          r.openingStock,
          r.periodIn,
          r.periodOut,
          r.closingStock,
          r.avgPrice,
          r.closingValue
        ]);
      });

      exportToCSV(`BaoCao_XNT_${state.currentWarehouse}_${new Date().toISOString().slice(0, 10)}.csv`, rows);
      showToast('Đã xuất file Excel/CSV Báo Cáo XNT thành công!');
    };

    $('#btn-export-dept-excel').onclick = () => {
      const allTransactions = db.getTransactions(state.currentWarehouse, 'OUT');
      const rows = [
        ['THỐNG KÊ CẤP PHÁT VẬT TƯ THEO KHOA PHÒNG - TRUNG TÂM PHÁP Y'],
        ['STT', 'Tên Khoa / Phòng Ban', 'Mã Khoa', 'Số Lượt Xuất', 'Tổng Giá Trị Cấp Phát (VNĐ)']
      ];

      DEPARTMENTS.forEach((dept, idx) => {
        const deptTrs = allTransactions.filter(t => t.departmentId === dept.id);
        const totalAmount = deptTrs.reduce((sum, t) => sum + Number(t.totalAmount || 0), 0);
        rows.push([idx + 1, dept.name, dept.code, deptTrs.length, totalAmount]);
      });

      exportToCSV(`ThongKe_CapPhat_KhoaPhong_${new Date().toISOString().slice(0, 10)}.csv`, rows);
      showToast('Đã xuất file Excel Thống Kê Khoa Phòng thành công!');
    };

    // Settings & DB Backup Events
    $('#form-settings').onsubmit = (e) => {
      e.preventDefault();
      const newSettings = {
        parentOrg: $('#set-parent-org') ? $('#set-parent-org').value.trim() : 'SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH',
        orgName: $('#set-org-name').value.trim(),
        orgAddress: $('#set-org-address').value.trim(),
        orgPhone: $('#set-org-phone').value.trim(),
        storekeeper: $('#set-storekeeper').value.trim(),
        headOfAdmin: $('#set-head-admin').value.trim(),
        managerName: $('#set-manager-name').value.trim()
      };
      db.saveSettings(newSettings);
      $('#sidebar-user-name').textContent = newSettings.storekeeper || 'Lê Văn Quý';
      showToast('Đã lưu thông tin cơ quan và cán bộ thành công!');
    };

    $('#btn-export-backup-json').onclick = () => {
      const jsonStr = db.exportBackupJSON();
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `ForensicStore_Backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Đã tải về file sao lưu cơ sở dữ liệu (.json)!');
    };

    $('#btn-trigger-restore').onclick = () => {
      $('#file-restore-db').click();
    };

    $('#file-restore-db').onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const res = db.importBackupJSON(event.target.result);
        if (res.success) {
          showToast(res.message);
          loadSettingsView();
          renderCurrentView();
        } else {
          showToast(res.message, 'danger');
        }
      };
      reader.readAsText(file);
    };

    
    // Cloud Sync Handlers
    const handleSyncNow = async () => {
      const syncBtn = $('#btn-sync-now');
      if (syncBtn) syncBtn.classList.add('spinning');
      updateCloudStatusUI('syncing', 'Đang đồng bộ...');

      const cloudCfg = db.getData().settings?.cloudSync || {};
      if (!cloudCfg.enabled) {
        showToast('Vui lòng vào Cài Đặt để nhập khóa kết nối Supabase Cloud trước!', 'warning');
        if (syncBtn) syncBtn.classList.remove('spinning');
        updateCloudStatusUI('offline');
        return;
      }

      const res = await db.pullFromCloud();
      if (syncBtn) syncBtn.classList.remove('spinning');

      if (res) {
        updateCloudStatusUI('online');
        renderCurrentView();
        updateGlobalAlertBadge();
        showToast('Đồng bộ dữ liệu Đám Mây thành công!');
      } else {
        updateCloudStatusUI('error', 'Đồng bộ thất bại');
        showToast('Không thể kết nối tới Supabase Cloud. Vui lòng kiểm tra Internet hoặc API Key.', 'danger');
      }
    };

    if ($('#btn-sync-now')) $('#btn-sync-now').onclick = handleSyncNow;
    if ($('#cloud-sync-status')) {
      $('#cloud-sync-status').onclick = (e) => {
        if (e.target.id !== 'btn-sync-now') {
          switchView('settings');
        }
      };
    }

    if ($('#btn-test-supabase')) {
      $('#btn-test-supabase').onclick = async () => {
        const url = $('#set-supabase-url').value.trim();
        const key = $('#set-supabase-key').value.trim();
        if (!url || !key) {
          showToast('Vui lòng nhập đầy đủ Supabase Project URL và API Key!', 'warning');
          return;
        }
        showToast('Đang kiểm tra kết nối Supabase...', 'info');
        const res = await db.testCloudConnection(url, key);
        if (res.success) {
          showToast(res.message + (res.hasData ? ' (Đã có dữ liệu)' : ' (Bảng mới)'));
        } else {
          showToast(res.message, 'danger');
        }
      };
    }

    if ($('#btn-save-supabase')) {
      $('#btn-save-supabase').onclick = async () => {
        const url = $('#set-supabase-url').value.trim();
        const key = $('#set-supabase-key').value.trim();
        const autoSync = $('#set-supabase-autosync') ? $('#set-supabase-autosync').checked : true;

        if (!url || !key) {
          // Disable cloud if fields emptied
          const settings = db.getData().settings;
          settings.cloudSync = { enabled: false, supabaseUrl: '', supabaseKey: '', autoSync: true, lastSyncTime: null };
          db.save();
          updateCloudStatusUI('offline');
          showToast('Đã tắt kết nối Đám Mây (Dùng chế độ Cục bộ)!');
          return;
        }

        showToast('Đang kết nối và khởi tạo Supabase Cloud...', 'info');
        const test = await db.testCloudConnection(url, key);
        if (!test.success) {
          showToast(test.message, 'danger');
          return;
        }

        const settings = db.getData().settings;
        settings.cloudSync = {
          enabled: true,
          supabaseUrl: url,
          supabaseKey: key,
          autoSync: autoSync,
          lastSyncTime: new Date().toISOString()
        };
        db.save();
        db.initCloud(url, key);

        // Setup realtime subscription
        db.setupRealtimeSubscription(() => {
          renderCurrentView();
          updateGlobalAlertBadge();
          showToast('☁️ Dữ liệu vừa được cập nhật từ thiết bị khác!', 'info');
        });

        // Initial push or pull
        if (test.hasData) {
          await db.pullFromCloud();
          renderCurrentView();
          updateGlobalAlertBadge();
          showToast('Đã kết nối và đồng bộ dữ liệu từ Đám Mây về máy!');
        } else {
          await db.pushToCloud();
          showToast('Đã kết nối và đẩy dữ liệu hiện tại lên Đám Mây thành công!');
        }

        updateCloudStatusUI('online');
      };
    }

    if ($('#btn-push-supabase')) {
      $('#btn-push-supabase').onclick = async () => {
        showToast('Đang đẩy dữ liệu lên Supabase Cloud...', 'info');
        const ok = await db.pushToCloud();
        if (ok) {
          showToast('Đã đẩy toàn bộ cơ sở dữ liệu lên Đám Mây thành công!');
          updateCloudStatusUI('online');
        } else {
          showToast('Đẩy dữ liệu thất bại. Vui lòng kiểm tra cấu hình Supabase!', 'danger');
        }
      };
    }

    if ($('#btn-pull-supabase')) {
      $('#btn-pull-supabase').onclick = async () => {
        showToast('Đang kéo dữ liệu từ Supabase Cloud...', 'info');
        const res = await db.pullFromCloud();
        if (res) {
          renderCurrentView();
          updateGlobalAlertBadge();
          showToast('Đã tải và nạp cơ sở dữ liệu từ Đám Mây thành công!');
          updateCloudStatusUI('online');
        } else {
          showToast('Kéo dữ liệu thất bại. Vui lòng kiểm tra cấu hình Supabase!', 'danger');
        }
      };
    }

    $('#btn-reset-sample-data').onclick = () => {
      if (confirm('Khôi phục toàn bộ cơ sở dữ liệu về bộ dữ liệu mẫu chuẩn của Trung tâm Pháp y? Mọi thay đổi hiện tại sẽ được ghi đè.')) {
        db.resetToDefault();
        showToast('Đã nạp lại cơ sở dữ liệu mẫu thành công!');
        loadSettingsView();
        renderCurrentView();
      }
    };
  }

  // Initialize App
  function startApp() {
    db.init();
    updateCategoryDropdowns();
    updateDepartmentDropdowns();
    loadSettingsView();
    setupEventListeners();
    renderCurrentView();
    updateGlobalAlertBadge();

    // Auto initialize cloud sync if configured
    const cloudCfg = db.getData().settings?.cloudSync;
    if (cloudCfg && cloudCfg.enabled && cloudCfg.supabaseUrl && cloudCfg.supabaseKey) {
      const ok = db.initCloud();
      if (ok) {
        updateCloudStatusUI('syncing', 'Đang đồng bộ...');
        db.setupRealtimeSubscription(() => {
          renderCurrentView();
          updateGlobalAlertBadge();
          showToast('☁️ Dữ liệu vừa được cập nhật từ thiết bị khác!', 'info');
        });
        db.pullFromCloud().then(res => {
          if (res) {
            updateCloudStatusUI('online');
            renderCurrentView();
            updateGlobalAlertBadge();
          } else {
            updateCloudStatusUI('online');
          }
        }).catch(() => {
          updateCloudStatusUI('error', 'Lỗi kết nối đám mây');
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }
})();
