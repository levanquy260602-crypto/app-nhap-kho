/**
 * DANH MỤC 175 MÃ VẬT TƯ & HÀNG HÓA CHUẨN
 * Trích xuất từ Danh_Muc_Ma_Vat_Tu_Va_Hang_Hoa.xlsx
 * Trung Tâm Pháp Y Thành Phố Hồ Chí Minh
 */

const DEFAULT_ITEM_CATALOG = [
  {
    "stt": 1,
    "code": "2-PROPANOL1",
    "name": "2-Propanol for analysis 2,5L/chai - 10963425000",
    "warehouse": "CHEMICAL",
    "unit": "Chai"
  },
  {
    "stt": 2,
    "code": "CLOMI-D3",
    "name": "Hóa chất Clomipramine-D3 Hydrochloride-LGCAMP0545.81-02, 1ml/chai",
    "warehouse": "CHEMICAL",
    "unit": "Chai"
  },
  {
    "stt": 3,
    "code": "EOSINY1",
    "name": "Hóa chất Eosine Y-solution 0,5% (500ml/chai)",
    "warehouse": "CHEMICAL",
    "unit": "Chai"
  },
  {
    "stt": 4,
    "code": "ETHAN20",
    "name": "Chất chuẩn Ethanol-20 mg/dl (10 lọ/hộp), 1,2ml/lọ",
    "warehouse": "CHEMICAL",
    "unit": "Hộp"
  },
  {
    "stt": 5,
    "code": "ETHAN100",
    "name": "Chất chuẩn Ethanol 100mg/dL (10 lọ/hộp)",
    "warehouse": "CHEMICAL",
    "unit": "Hộp"
  },
  {
    "stt": 6,
    "code": "HEMATOXY01",
    "name": "Hematoxylin 500ml/chai (Leica)",
    "warehouse": "CHEMICAL",
    "unit": "Chai"
  },
  {
    "stt": 7,
    "code": "SAPHAT",
    "name": "Paraffin (Sáp hạt)",
    "warehouse": "CHEMICAL",
    "unit": "Kg"
  },
  {
    "stt": 8,
    "code": "AOPT1",
    "name": "Áo choàng phẫu thuật",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 9,
    "code": "BANGKU",
    "name": "Băng keo lụa 2,5cmx5m",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 10,
    "code": "BANGURGO",
    "name": "Băng keo cá nhân Urgo",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 11,
    "code": "BOBH7",
    "name": "Bộ bảo hộ 7 món",
    "warehouse": "OFFICE",
    "unit": "Bộ"
  },
  {
    "stt": 12,
    "code": "BOMTCK",
    "name": "Bơm tiêm 5cc có kim",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 13,
    "code": "BOMTKK",
    "name": "Bơm tiêm 5cc không kim",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 14,
    "code": "CANDAO",
    "name": "Cán dao mổ số 4 3028",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 15,
    "code": "DAOMO21",
    "name": "Lưỡi dao mổ số 21 (100c/hộp)",
    "warehouse": "OFFICE",
    "unit": "Hộp"
  },
  {
    "stt": 16,
    "code": "FACE",
    "name": "Face shield (Kính chắn giọt bắn)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 17,
    "code": "GAC5",
    "name": "Gạc tiệt trùng (Gạc 5x6.5)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 18,
    "code": "GANGCTT01",
    "name": "Găng tay y tế Vglove cao su nitrile không bột (50 đôi/hộp)",
    "warehouse": "OFFICE",
    "unit": "Hộp"
  },
  {
    "stt": 19,
    "code": "GANGCTT03",
    "name": "Găng tay 7,5 hoặc size M có bột, 50đôi/hộp (PK)",
    "warehouse": "OFFICE",
    "unit": "Hộp"
  },
  {
    "stt": 20,
    "code": "GANGCTT05",
    "name": "Găng tay y tế A1 MERUFA size 7.5, 100 đôi/hộp",
    "warehouse": "OFFICE",
    "unit": "Hộp"
  },
  {
    "stt": 21,
    "code": "GANGPT02",
    "name": "Găng phẫu thuật tiệt trùng 7.5 (Găng tay giấy)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 22,
    "code": "GIAYLOC",
    "name": "Giấy lọc Whatman 2, 110ø",
    "warehouse": "OFFICE",
    "unit": "Lọ"
  },
  {
    "stt": 23,
    "code": "GIAYLOC180",
    "name": "Giấy lọc định tính 180mm",
    "warehouse": "OFFICE",
    "unit": "Lọ"
  },
  {
    "stt": 24,
    "code": "GIAYYT",
    "name": "Giấy y tế 40x50 (1xấp-kg)",
    "warehouse": "OFFICE",
    "unit": "Xấp"
  },
  {
    "stt": 25,
    "code": "KEOMAYO",
    "name": "Kéo Mayo cong 17cm 3056",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 26,
    "code": "KEOTHANG",
    "name": "Kéo thẳng tù 20cm",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 27,
    "code": "KHANVT",
    "name": "Khăn vuông (Trắng)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 28,
    "code": "KHAUTGLITE",
    "name": "Khẩu trang giấy lite",
    "warehouse": "OFFICE",
    "unit": "Lít"
  },
  {
    "stt": 29,
    "code": "KHUONDMTQ",
    "name": "Khuôn đúc mẫu (250 cái/hộp)",
    "warehouse": "CHEMICAL",
    "unit": "Hộp"
  },
  {
    "stt": 30,
    "code": "KIM18",
    "name": "Kim nhựa 18G",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 31,
    "code": "KIMCT",
    "name": "Kim chọc tủy, gây tê",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 32,
    "code": "LAMENHAM",
    "name": "Lame nhám mới (Hộp/72 cái) Citotest",
    "warehouse": "CHEMICAL",
    "unit": "Hộp"
  },
  {
    "stt": 33,
    "code": "LOBP55",
    "name": "Lọ nhựa PS 55ml có nhãn (Lọ lấy bệnh phẩm)",
    "warehouse": "CHEMICAL",
    "unit": "Lọ"
  },
  {
    "stt": 34,
    "code": "LUOIDCTB",
    "name": "Lưỡi dao cắt tiêu bản dùng cho máy cắt vi phẫu (Patho Cutter 35)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 35,
    "code": "NAPPTFE20",
    "name": "Nắp đóng chai đựng mẫu thủy tinh 20mm lỗ đệm PTFE-SC203201 (100cái/gói)-ND20",
    "warehouse": "CHEMICAL",
    "unit": "Chai"
  },
  {
    "stt": 36,
    "code": "NAPNHOM1,5",
    "name": "Nắp nhôm cho vial 1,5ml",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 37,
    "code": "NAPVIAL18",
    "name": "Nắp Vial 18mm (100 cái/gói)",
    "warehouse": "CHEMICAL",
    "unit": "Gói"
  },
  {
    "stt": 38,
    "code": "NHIP20",
    "name": "Nhíp có mấu 20cm",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 39,
    "code": "ONGLT15",
    "name": "Ống ly tâm 15ml",
    "warehouse": "CHEMICAL",
    "unit": "Ống"
  },
  {
    "stt": 40,
    "code": "ONGLT50",
    "name": "Ống ly tâm nhựa 50ml, nắp PE, thùng 500 cái, không có pyrogenic, Biologix (Mỹ)",
    "warehouse": "CHEMICAL",
    "unit": "Ống"
  },
  {
    "stt": 41,
    "code": "ONGMAUND",
    "name": "Ống máu nắp đỏ (HIV) (Setrum)",
    "warehouse": "CHEMICAL",
    "unit": "Ống"
  },
  {
    "stt": 42,
    "code": "ONGMAUNX2",
    "name": "Ống máu nắp xám (Ống nghiệm Chimily)",
    "warehouse": "CHEMICAL",
    "unit": "Ống"
  },
  {
    "stt": 43,
    "code": "PANH16",
    "name": "Panh Paraburef 16cm",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 44,
    "code": "TAMBONG",
    "name": "Tăm bông Rayor (que đỏ)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 45,
    "code": "TAPDE",
    "name": "Tạp dề y tế chưa tiệt trùng 0,8m x 1,2m - VN",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 46,
    "code": "TESTCOVID",
    "name": "Test thử kháng nguyên Sars-CoV-2",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 47,
    "code": "VIAL250",
    "name": "Ống thủy tinh insert vial 250ul, 29*5.7mm (100 cái/gói)",
    "warehouse": "CHEMICAL",
    "unit": "Ống"
  },
  {
    "stt": 48,
    "code": "ACCO",
    "name": "Acco sắt",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 49,
    "code": "BAMK10",
    "name": "Bấm kim số 10",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 50,
    "code": "BAMK03",
    "name": "Bấm kim số 3 (GENMES)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 51,
    "code": "CHAICHAN",
    "name": "Bàn chải chà chân",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 52,
    "code": "CHAISAN",
    "name": "Bàn chải quét sàn",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 53,
    "code": "BANGKS3,5",
    "name": "Băng keo simili 3,5p (xanh)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 54,
    "code": "BANGKT5",
    "name": "Băng keo trong/đục 5cm (5 phân)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 55,
    "code": "BANGTENTT",
    "name": "Bảng tên TT",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 56,
    "code": "BAOKBOPD",
    "name": "Bao kiếng bóp đầu 8x12",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 57,
    "code": "BAOND",
    "name": "Bao nilong đen",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 58,
    "code": "BAOD",
    "name": "Bao đĩa",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 59,
    "code": "NILON7",
    "name": "Bao nilon trắng 7 rem",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 60,
    "code": "BAORACV90",
    "name": "Bao rác 90x120cm vàng",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 61,
    "code": "BAORACX90",
    "name": "Bao rác 90x120cm xanh",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 62,
    "code": "BAORAC90",
    "name": "Bao rác 90x120 (xanh, vàng)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 63,
    "code": "BAORACDV",
    "name": "Bao rác đại - 3 cuộn vàng",
    "warehouse": "CHEMICAL",
    "unit": "Cuộn"
  },
  {
    "stt": 64,
    "code": "BAORACDX",
    "name": "Bao rác đại - 3 cuộn xanh",
    "warehouse": "CHEMICAL",
    "unit": "Cuộn"
  },
  {
    "stt": 65,
    "code": "BAORACTV",
    "name": "Bao rác trung - 3 cuộn vàng",
    "warehouse": "CHEMICAL",
    "unit": "Cuộn"
  },
  {
    "stt": 66,
    "code": "BAORACTX",
    "name": "Bao rác trung - 3 cuộn xanh",
    "warehouse": "CHEMICAL",
    "unit": "Cuộn"
  },
  {
    "stt": 67,
    "code": "BAOTHUA4",
    "name": "Bao thư A4",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 68,
    "code": "BAOTHUA5",
    "name": "Bao thư A5",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 69,
    "code": "BAOTHU12",
    "name": "Bao thơ nhỏ 12x22",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 70,
    "code": "BIALALO",
    "name": "Bìa lá lỗ",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 71,
    "code": "BIAA3",
    "name": "Bìa A3",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 72,
    "code": "BIATA4",
    "name": "Bìa A4 trắng",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 73,
    "code": "BIAXA4",
    "name": "Bìa A4 xanh",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 74,
    "code": "BIAA4",
    "name": "Bìa A4 (xanh, hồng, vàng, trắng)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 75,
    "code": "BIABAOTAP",
    "name": "Bìa bao tập",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 76,
    "code": "BIACONG7",
    "name": "Bìa còng 7 phân",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 77,
    "code": "BIAC3D",
    "name": "Bìa cột 3 dây",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 78,
    "code": "BIAKIENG1",
    "name": "Bìa kiếng A4",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 79,
    "code": "BIALAF4",
    "name": "Bìa lá nhựa F4",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 80,
    "code": "BIACDN",
    "name": "Bìa cột dây nhựa",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 81,
    "code": "BIANUTD4",
    "name": "Bìa nút F4 đại",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 82,
    "code": "BIAHXN",
    "name": "Bìa hộp xéo giấy 25*35",
    "warehouse": "OFFICE",
    "unit": "Hộp"
  },
  {
    "stt": 83,
    "code": "BIAHXL",
    "name": "Bìa hộp xéo giấy 40*50",
    "warehouse": "OFFICE",
    "unit": "Hộp"
  },
  {
    "stt": 84,
    "code": "BIAHS2F",
    "name": "Bìa hộp hồ sơ 20F đinh",
    "warehouse": "OFFICE",
    "unit": "Hộp"
  },
  {
    "stt": 85,
    "code": "VIETBIDEN",
    "name": "Viết bi TL027 - Đen",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 86,
    "code": "VIETBIXANH",
    "name": "Viết bi TL027 - Xanh",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 87,
    "code": "VIETBIX",
    "name": "Viết bi TL027 - XANH",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 88,
    "code": "VIETBIDO",
    "name": "Viết bi TL027 - Đỏ",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 89,
    "code": "VIETBID",
    "name": "Viết bi TL027 - ĐỎ",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 90,
    "code": "VIETCHI",
    "name": "Viết chì",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 91,
    "code": "VIETDQ",
    "name": "Viết dạ quang",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 92,
    "code": "VIETKY",
    "name": "Viết ký",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 93,
    "code": "VIETLD",
    "name": "Bút lông dầu lớn (PM09)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 94,
    "code": "VIETLDN",
    "name": "Bút lông dầu nhỏ (viết đĩa - PM04)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 95,
    "code": "VIETLB",
    "name": "Viết lông bảng (đỏ + xanh)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 96,
    "code": "VIETXOAK",
    "name": "Viết xóa kéo",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 97,
    "code": "LAUNHA",
    "name": "Cây lau nhà Mỹ Phong",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 98,
    "code": "LAUSANHO",
    "name": "Cây lau nhà San hô (nguyên cán liền)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 99,
    "code": "CHACAU",
    "name": "Chà cầu cán dài",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 100,
    "code": "CHOICAU",
    "name": "Chổi cau",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 101,
    "code": "CHOICO",
    "name": "Chổi cỏ",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 102,
    "code": "CUOCSAT",
    "name": "Cước sắt",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 103,
    "code": "CUOCX",
    "name": "Cước xanh",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 104,
    "code": "CHUOTCHI",
    "name": "Chuốt chì",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 105,
    "code": "DAORGL",
    "name": "Dao rọc giấy lớn",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 106,
    "code": "DAORGN",
    "name": "Dao rọc giấy nhỏ",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 107,
    "code": "DIACD",
    "name": "Đĩa CD",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 108,
    "code": "DIADVD",
    "name": "Đĩa DVD",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 109,
    "code": "GOKIM",
    "name": "Gỡ kim / Dụng cụ gỡ kim",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 110,
    "code": "GIAYA470",
    "name": "Giấy A4 70 / Giấy A4 (80) Excel",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 111,
    "code": "GIAYA380",
    "name": "Giấy photo A3",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 112,
    "code": "GIAYA5",
    "name": "Giấy A5 / Giấy in A5",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 113,
    "code": "GIAYDC",
    "name": "Giấy decal A4 (6,3m2/xấp)",
    "warehouse": "OFFICE",
    "unit": "Xấp"
  },
  {
    "stt": 114,
    "code": "GIAYGC",
    "name": "Giấy ghi chú",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 115,
    "code": "GIAYIA",
    "name": "Giấy in ảnh / Kjet Kodak",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 116,
    "code": "GIAYNP",
    "name": "Giấy niêm phong",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 117,
    "code": "GIAYNOTE",
    "name": "Giấy note nhựa màu mũi tên pronotti (1x5cm)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 118,
    "code": "GOM",
    "name": "Gôm",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 119,
    "code": "GIAYVS",
    "name": "Giấy vệ sinh",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 120,
    "code": "HOKHO",
    "name": "Hồ khô",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 121,
    "code": "MUCBROTHER",
    "name": "Hộp mực máy in Brother HL-L2361DN",
    "warehouse": "CHEMICAL",
    "unit": "Hộp"
  },
  {
    "stt": 122,
    "code": "MUCCN2900",
    "name": "Hộp mực máy in Canon 2900",
    "warehouse": "CHEMICAL",
    "unit": "Hộp"
  },
  {
    "stt": 123,
    "code": "MUCHP1102",
    "name": "Hộp mực máy in HP LaserJet P1102",
    "warehouse": "CHEMICAL",
    "unit": "Hộp"
  },
  {
    "stt": 124,
    "code": "MUCE731",
    "name": "Mực máy in màu Epson L805 Black (T6731)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 125,
    "code": "MUCE732",
    "name": "Mực máy in màu Epson L805 Cyan (T6732)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 126,
    "code": "MUCE735",
    "name": "Mực máy in màu Epson L805 Light Cyan (T6735)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 127,
    "code": "MUCE736",
    "name": "Mực máy in màu Epson L805 Light Magenta (T6736)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 128,
    "code": "MUCE733",
    "name": "Mực máy in màu Epson L805 Magenta (T6733)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 129,
    "code": "MUCE734",
    "name": "Mực máy in màu Epson L805 Yellow (T6734)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 130,
    "code": "KEOCS",
    "name": "Kéo S100",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 131,
    "code": "KEP15",
    "name": "Kẹp bướm 15mm",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 132,
    "code": "KEP19",
    "name": "Kẹp 19mm",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 133,
    "code": "KEP25",
    "name": "Kẹp bướm 25mm",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 134,
    "code": "KEP32",
    "name": "Kẹp bướm 32mm",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 135,
    "code": "KEP51",
    "name": "Kẹp bướm 51mm",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 136,
    "code": "KEPSAT8",
    "name": "Kẹp sắt 8cm",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 137,
    "code": "KHANG",
    "name": "Khăn giấy hộp",
    "warehouse": "OFFICE",
    "unit": "Hộp"
  },
  {
    "stt": 138,
    "code": "KHANLT",
    "name": "Khăn màu lau tay",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 139,
    "code": "KIMB10",
    "name": "Kim bấm số 10",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 140,
    "code": "KIMB3",
    "name": "Kim bấm số 3",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 141,
    "code": "KEPC62",
    "name": "Kim kẹp C62",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 142,
    "code": "KEPC82",
    "name": "Kim kẹp C82",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 143,
    "code": "KYHR",
    "name": "Kỵ hốt rác",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 144,
    "code": "LUOIDL",
    "name": "Lưỡi dao rọc giấy lớn",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 145,
    "code": "LUOIDN",
    "name": "Lưỡi dao rọc giấy nhỏ",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 146,
    "code": "MUCDD",
    "name": "Mực dấu - đỏ",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 147,
    "code": "MUCDX",
    "name": "Mực dấu - xanh",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 148,
    "code": "MUCDAUD",
    "name": "Mực dấu đỏ",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 149,
    "code": "MUCDAUX",
    "name": "Mực dấu xanh",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 150,
    "code": "MUCES641",
    "name": "Mực in phun Epson màu đen (T6641)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 151,
    "code": "MUCES643",
    "name": "Mực in phun Epson màu đỏ sen (T6643)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 152,
    "code": "MUCES644",
    "name": "Mực in phun Epson màu vàng (T6644)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 153,
    "code": "MUCES642",
    "name": "Mực in phun Epson màu xanh (T6642)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 154,
    "code": "NUOCLS",
    "name": "Nước lau sàn",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 155,
    "code": "NUOCRC",
    "name": "Nước rửa chén",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 156,
    "code": "NUOCRT",
    "name": "Nước rửa tay",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 157,
    "code": "PIN2A",
    "name": "Pin 2A (AA)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 158,
    "code": "PIN3A",
    "name": "Pin 3A (AAA)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 159,
    "code": "TAMLSH",
    "name": "Tấm lau san hô 45cm",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 160,
    "code": "TAMPP3",
    "name": "Tampon Shiny lớn SP3",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 161,
    "code": "TAMP842D",
    "name": "Tampont nhỏ S842 Đỏ",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 162,
    "code": "TAMP843D",
    "name": "Tampont nhỏ S843 Đỏ",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 163,
    "code": "TAP100",
    "name": "Tập học sinh (100 trang)",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 164,
    "code": "TAYVIT",
    "name": "Tẩy vịt tím",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 165,
    "code": "THAMCHUI",
    "name": "Thảm chùi chân",
    "warehouse": "CHEMICAL",
    "unit": "Cái"
  },
  {
    "stt": 166,
    "code": "THUNGR15",
    "name": "Thùng rác 15L",
    "warehouse": "CHEMICAL",
    "unit": "Thùng"
  },
  {
    "stt": 167,
    "code": "THUNGR25",
    "name": "Thùng rác 25L",
    "warehouse": "CHEMICAL",
    "unit": "Thùng"
  },
  {
    "stt": 168,
    "code": "THUNGR45",
    "name": "Thùng rác 45L",
    "warehouse": "CHEMICAL",
    "unit": "Thùng"
  },
  {
    "stt": 169,
    "code": "THUOCDT",
    "name": "Thước dây tròn",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 170,
    "code": "THUOC30",
    "name": "Thước 30cm (Thước kẻ 30cm)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 171,
    "code": "XABONGB",
    "name": "Xà bông bột",
    "warehouse": "OFFICE",
    "unit": "Bộ"
  },
  {
    "stt": 172,
    "code": "XITMUOI",
    "name": "Xịt muỗi",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 173,
    "code": "XITPHONG",
    "name": "Xịt phòng Sumo",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 174,
    "code": "SOCARO30",
    "name": "Sổ bìa cứng 30x40 (400 trang)",
    "warehouse": "OFFICE",
    "unit": "Cái"
  },
  {
    "stt": 175,
    "code": "SOCARON",
    "name": "Sổ bìa cứng ngang 32x23",
    "warehouse": "OFFICE",
    "unit": "Cái"
  }
];

if (typeof window !== "undefined") {
  window.DEFAULT_ITEM_CATALOG = DEFAULT_ITEM_CATALOG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEFAULT_ITEM_CATALOG };
}
