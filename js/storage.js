/**
 * ForensicStore Pro - Database & Storage Layer
 * Quản lý cơ sở dữ liệu IndexedDB & LocalStorage với dữ liệu mẫu Trung tâm Pháp y
 */

const STORAGE_KEY = 'forensic_inventory_db_v1';

// Danh sách các phòng ban trực thuộc Trung tâm Pháp y
export const DEPARTMENTS = [
  { id: 'PB_HANHCHINH', name: 'Phòng Tổ chức - Hành chính - Quản trị', code: 'HC-QT', desc: 'Văn thư, tiếp nhận hồ sơ, quản lý tài sản, lưu trữ án' },
  { id: 'PB_TAICHINH', name: 'Phòng Kế hoạch - Tài chính', code: 'KH-TC', desc: 'Kế hoạch mua sắm, dự trù ngân sách hóa chất, vật tư' },
  { id: 'K_GIAMDINH', name: 'Khoa Giám định', code: 'GĐ', desc: 'Khám nghiệm tử thi, giám định tổn thương cơ thể, thương tích' },
  { id: 'K_XN_ADN', name: 'Khoa Xét nghiệm ADN', code: 'XN-ADN', desc: 'Tách chiết gen, khuếch đại PCR, định danh cá thể, huyết thống' },
  { id: 'K_HOAPHAP', name: 'Khoa Hóa pháp', code: 'HP', desc: 'Phân tích ma túy, nồng độ cồn, độc chất, hóa chất giám định' },
  { id: 'K_GPB', name: 'Khoa Giải phẫu bệnh', code: 'GPB', desc: 'Mô bệnh học, sinh thiết vi thể, chẩn đoán mô học tử thi' },
  { id: 'PB_GIAMDOC', name: 'Ban Giám đốc Trung tâm', code: 'BGD', desc: 'Ký duyệt kết luận giám định, phê duyệt mua sắm' }
];

// Danh mục Kho
export const WAREHOUSES = {
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

// Dữ liệu mẫu khởi tạo ban đầu cho Trung tâm Pháp y
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
    // --- KHO HÓA CHẤT & SINH PHẨM ---
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
          expiryDate: '2026-09-15', // Sắp hết hạn trong ~32 ngày
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
          expiryDate: '2026-09-05', // Sắp hết hạn trong ~22 ngày
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
          expiryDate: '2026-08-01', // ĐÃ HẾT HẠN
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
          quantity: 3, // DƯỚI ĐỊNH MỨC (Min: 15)
          unitPrice: 110000,
          receivedDate: '2026-01-10',
          supplier: 'Công ty Dược phẩm & Trang thiết bị Y tế Sài Gòn'
        }
      ]
    },

    // --- KHO VĂN PHÒNG PHẨM ---
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
          quantity: 2, // DƯỚI ĐỊNH MỨC (Min: 5)
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
    // Phiếu nhập kho mẫu
    {
      id: 'TR-IN-001',
      code: 'PN-20260412-001',
      type: 'IN', // Nhập kho
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
    // Phiếu xuất kho mẫu 1 (Kho Hóa chất)
    {
      id: 'TR-OUT-001',
      code: 'PX-20260515-001',
      type: 'OUT', // Xuất kho
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
    // Phiếu xuất kho mẫu 2 (Kho Văn phòng phẩm)
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

  // Khởi tạo và nạp dữ liệu từ LocalStorage
  async init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.data = JSON.parse(stored);
        if (!this.data.settings) {
          this.data.settings = { ...INITIAL_DATA.settings };
          this.save();
        } else if (!this.data.settings.orgAddress || this.data.settings.orgAddress.includes('Nguyễn Tri Phương')) {
          this.data.settings.orgAddress = 'Cụm Y tế Tân Kiên, xã Tân Nhựt, TPHCM';
          this.save();
        }
      } else {
        this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
        this.save();
      }
    } catch (e) {
      console.warn('Lỗi đọc LocalStorage, khởi tạo dữ liệu mẫu mặc định', e);
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      this.save();
    }
    return this.data;
  }

  // Lưu toàn bộ dữ liệu vào LocalStorage
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Lỗi khi lưu dữ liệu:', e);
    }
  }

  // Lấy dữ liệu hiện tại
  getData() {
    if (!this.data) {
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    }
    return this.data;
  }

  // Lấy danh sách vật tư theo kho
  getItems(warehouseId = null) {
    const data = this.getData();
    if (!warehouseId || warehouseId === 'ALL') {
      return data.items;
    }
    return data.items.filter(item => item.warehouseId === warehouseId);
  }

  // Lấy chi tiết 1 vật tư
  getItemById(id) {
    const data = this.getData();
    return data.items.find(item => item.id === id);
  }

  // Thêm mới hoặc cập nhật vật tư
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

  // Xóa vật tư
  deleteItem(id) {
    const data = this.getData();
    data.items = data.items.filter(i => i.id !== id);
    this.save();
  }

  // Lấy danh sách giao dịch (Nhập/Xuất)
  getTransactions(warehouseId = null, type = null) {
    const data = this.getData();
    return data.transactions.filter(tr => {
      const matchWarehouse = !warehouseId || warehouseId === 'ALL' || tr.warehouseId === warehouseId;
      const matchType = !type || type === 'ALL' || tr.type === type;
      return matchWarehouse && matchType;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Tạo phiếu Nhập kho
  createStockInTransaction(transaction) {
    const data = this.getData();
    transaction.id = `TR-IN-${Date.now()}`;
    transaction.type = 'IN';
    transaction.createdAt = new Date().toISOString();

    // Cập nhật tồn kho từng item
    transaction.items.forEach(trItem => {
      const item = data.items.find(i => i.id === trItem.itemId);
      if (item) {
        if (!item.batches) item.batches = [];
        
        // Tìm lô trùng
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
    return transaction;
  }

  // Tạo phiếu Xuất kho (có trừ Lô theo FEFO / lựa chọn)
  createStockOutTransaction(transaction) {
    const data = this.getData();
    transaction.id = `TR-OUT-${Date.now()}`;
    transaction.type = 'OUT';
    transaction.createdAt = new Date().toISOString();

    // Trừ số lượng tồn kho từng item
    transaction.items.forEach(trItem => {
      const item = data.items.find(i => i.id === trItem.itemId);
      if (item && item.batches) {
        let remainingToDeduct = Number(trItem.quantity);

        // Nếu chỉ định số Lô cụ thể
        if (trItem.lotNumber) {
          const batch = item.batches.find(b => b.lotNumber === trItem.lotNumber);
          if (batch) {
            const deduct = Math.min(batch.quantity, remainingToDeduct);
            batch.quantity -= deduct;
            remainingToDeduct -= deduct;
          }
        }

        // Nếu chưa trừ hết hoặc xuất FEFO tự động
        if (remainingToDeduct > 0) {
          // Sắp xếp các lô theo hạn dùng tăng dần (FEFO)
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
    return transaction;
  }

  // Xóa phiếu giao dịch và hoàn lại số lượng tồn kho
  deleteTransaction(id) {
    const data = this.getData();
    const trIndex = data.transactions.findIndex(t => t.id === id);
    if (trIndex === -1) return false;

    const tr = data.transactions[trIndex];
    // Hoàn tác kho nếu cần
    if (tr.type === 'IN') {
      // Giảm lại lượng đã nhập
      tr.items.forEach(trItem => {
        const item = data.items.find(i => i.itemId === trItem.itemId);
        if (item && item.batches) {
          const batch = item.batches.find(b => b.lotNumber === trItem.lotNumber);
          if (batch) {
            batch.quantity = Math.max(0, batch.quantity - Number(trItem.quantity));
          }
        }
      });
    } else if (tr.type === 'OUT') {
      // Cộng lại lượng đã xuất vào lô tương ứng
      tr.items.forEach(trItem => {
        const item = data.items.find(i => i.itemId === trItem.itemId);
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

  // Lấy danh sách cảnh báo (HSD & Tồn kho tối thiểu)
  getAlerts(warehouseId = null) {
    const items = this.getItems(warehouseId);
    const now = new Date();
    const expiredList = [];
    const expiringSoonList = []; // < 60 ngày
    const lowStockList = [];

    items.forEach(item => {
      const totalQty = (item.batches || []).reduce((acc, b) => acc + (Number(b.quantity) || 0), 0);

      // Cảnh báo tồn dưới định mức
      if (totalQty < item.minStock) {
        lowStockList.push({
          item,
          totalQty,
          minStock: item.minStock,
          diff: item.minStock - totalQty
        });
      }

      // Cảnh báo HSD cho từng Lô
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

  // Thống kê tổng quan cho Dashboard
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

  // Báo cáo Xuất - Nhập - Tồn (XNT)
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

      // Quét các giao dịch liên quan đến item này
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

      // Tồn cuối kỳ = Tồn hiện tại - Nhập sau kỳ + Xuất sau kỳ
      const closingStock = currentStock - afterPeriodIn + afterPeriodOut;
      // Tồn đầu kỳ = Tồn cuối kỳ - Nhập trong kỳ + Xuất trong kỳ
      const openingStock = closingStock - periodIn + periodOut;

      const avgPrice = item.batches && item.batches.length > 0 
        ? item.batches[0].unitPrice || 0 
        : 0;

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

  // Thẻ kho chi tiết cho từng mặt hàng
  getStockCard(itemId) {
    const item = this.getItemById(itemId);
    if (!item) return null;

    const data = this.getData();
    const history = [];
    
    // Thu thập tất cả các giao dịch liên quan
    data.transactions.forEach(tr => {
      const match = tr.items.find(i => i.itemId === itemId);
      if (match) {
        history.push({
          date: tr.date,
          code: tr.code,
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

    // Tính toán số dư tồn lũy kế
    let runningBalance = 0;
    history.forEach(h => {
      if (h.type === 'IN') runningBalance += Number(h.quantityIn);
      if (h.type === 'OUT') runningBalance -= Number(h.quantityOut);
      h.runningBalance = Math.max(0, runningBalance);
    });

    return {
      item,
      history
    };
  }

  // Xuất file JSON Sao lưu toàn bộ Database
  exportBackupJSON() {
    const data = this.getData();
    data.settings.lastBackup = new Date().toISOString();
    this.save();
    return JSON.stringify(data, null, 2);
  }

  // Khôi phục Database từ file JSON
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

  // Khôi phục dữ liệu mẫu ban đầu
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

  // Cập nhật cài đặt đơn vị
  saveSettings(settings) {
    const data = this.getData();
    data.settings = { ...data.settings, ...settings };
    this.save();
    return data.settings;
  }
}

export const db = new ForensicStorage();
