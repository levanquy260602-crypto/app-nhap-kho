/**
 * ForensicStore Pro - Export & Print Service
 * Xử lý xuất Excel/CSV và tạo biểu mẫu in ấn chuẩn thể thức cơ quan nhà nước / pháp y (Khổ A4)
 */

// Định dạng tiền tệ VNĐ
export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 đ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Định dạng số lượng
export function formatNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return new Intl.NumberFormat('vi-VN').format(num);
}

// Định dạng ngày tháng VN (dd/mm/yyyy)
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Chuyển số thành chữ tiếng Việt (cho biểu mẫu kế toán / nhập xuất)
export function numberToVietnameseWords(n) {
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

/**
 * Xuất dữ liệu ra file Excel/CSV hỗ trợ tiếng Việt không lỗi font
 */
export function exportToCSV(filename, rows) {
  // Thêm UTF-8 BOM (\uFEFF) để Excel tự động nhận diện đúng tiếng Việt UTF-8
  let csvContent = '\uFEFF';
  rows.forEach(row => {
    const formattedRow = row.map(val => {
      if (val === null || val === undefined) return '""';
      let str = String(val).replace(/"/g, '""');
      return `"${str}"`;
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

/**
 * In Phiếu Nhập Kho chuẩn A4
 */
export function printStockInReceipt(tr, settings) {
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

/**
 * In Phiếu Xuất Kho chuẩn A4
 */
export function printStockOutReceipt(tr, settings) {
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

/**
 * In Báo cáo Xuất - Nhập - Tồn khổ A4 (Ngang hoặc Dọc)
 */
export function printInventoryReport(reportData, warehouseName, fromDate, toDate, settings) {
  let rowsHtml = '';
  let totalOpeningVal = 0;
  let totalInQty = 0;
  let totalOutQty = 0;
  let totalClosingQty = 0;
  let totalClosingVal = 0;

  reportData.forEach((row, index) => {
    totalOpeningVal += row.openingStock * row.avgPrice;
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
            <th rowspan="2" style="width: 28%;">Tên Vật tư / Hóa chất / Sinh phẩm</th>
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

/**
 * In Thẻ Kho (Mẫu S12-DN) chuẩn A4
 */
export function printStockCard(cardData, settings) {
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
