/**
 * Giao diện "Công văn" - phần hiển thị (không đụng tới dữ liệu / bảo mật).
 * - Tiêu đề màn hình đăng nhập theo thể thức văn bản hành chính
 * - Bỏ biểu tượng cảm xúc đứng cạnh chữ, chuyển nhãn "Viết Hoa Từng Chữ" về dạng câu
 * Xóa file này và css/theme.css để quay về giao diện cũ.
 */
(function () {
  'use strict';

  var EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}]\u{FE0F}?|\u{FE0F}|\u{200D}/gu;
  var KEEP_UPPER = { Excel: 1, Supabase: 1, ForensicStore: 1, Pro: 1, Zalo: 1, QR: 1, Google: 1, Word: 1 };
  var SENTENCE_TARGETS = [
    '.topbar-nav .nav-item > span:not(.badge)', '.nav-dropdown-toggle > span', '.nav-dropdown-item > span',
    '#current-page-title', '.card-title', '.stat-card-title', '.wh-tab-btn > span',
    '.data-table th', '.btn', '.status-text', '.modal-header h3', '.form-label', '.report-tab-btn', '.tab-btn'
  ].join(',');

  function sentenceCase(text) {
    var tokens = text.split(/(\s+)/);
    var seenWord = false;
    var prev = '';
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (!t.trim()) continue;
      var m = t.match(/^(\p{Lu}\p{Ll}+)(\P{L}*)$/u);
      var keepAfterSlash = (prev === '/' && m && m[1] === 'Phòng');
      if (m && seenWord && !keepAfterSlash && !KEEP_UPPER[m[1]]) {
        tokens[i] = m[1].toLocaleLowerCase('vi') + m[2];
      }
      if (/\p{L}/u.test(t)) seenWord = true;
      prev = t;
    }
    return tokens.join('');
  }

  function stripEmojiIn(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentElement;
        if (!p || /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT;
        EMOJI.lastIndex = 0;
        return EMOJI.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var stripped = n.nodeValue.replace(EMOJI, '');
      // Giữ lại nếu emoji là nội dung duy nhất của một nút bấm (nút biểu tượng như 👁️, 🔄)
      var holder = n.parentElement.closest('button, a') || n.parentElement.parentElement || n.parentElement;
      var holderText = (holder.textContent || '').replace(EMOJI, '').trim();
      if (!holderText) return;
      n.nodeValue = stripped.replace(/^\s+/, function (s) { return n.previousSibling ? ' ' : ''; });
    });
  }

  function sentenceCaseIn(root) {
    var els = [];
    if (root.matches && root.matches(SENTENCE_TARGETS)) els.push(root);
    if (root.querySelectorAll) els = els.concat(Array.prototype.slice.call(root.querySelectorAll(SENTENCE_TARGETS)));
    els.forEach(function (el) {
      if (el.dataset.themeCased === el.textContent) return;
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      var first = true;
      while (walker.nextNode()) {
        var n = walker.currentNode;
        if (!/\p{L}/u.test(n.nodeValue)) continue;
        if (n.parentElement && n.parentElement.closest('.badge, .tag, code, .font-mono, strong')) { first = false; continue; }
        var v = sentenceCase(n.nodeValue);
        if (!first) v = v.replace(/^(\s*)(\p{Lu})(\p{Ll}+)/u, function (m, s, a, b) { return KEEP_UPPER[a + b] ? m : s + a.toLocaleLowerCase('vi') + b; });
        if (v !== n.nodeValue) n.nodeValue = v;
        first = false;
      }
      el.dataset.themeCased = el.textContent;
    });
  }

  var PAGE_TITLES = { 'Dashboard': 'Bảng điều khiển' };
  function tidy(root) {
    try {
      var pt = document.getElementById('current-page-title');
      if (pt && PAGE_TITLES[pt.textContent.trim()]) pt.textContent = PAGE_TITLES[pt.textContent.trim()];
      var unlockBtn = document.getElementById('btn-unlock-submit');
      if (unlockBtn) {
        var ut = unlockBtn.textContent.replace(EMOJI, '').trim();
        if (ut && ut === ut.toLocaleUpperCase('vi') && /\p{L}{2}/u.test(ut)) {
          var low = ut.toLocaleLowerCase('vi');
          unlockBtn.textContent = low.charAt(0).toLocaleUpperCase('vi') + low.slice(1);
        }
      }
      stripEmojiIn(root);
      sentenceCaseIn(root);
    } catch (e) { /* chỉ là phần trang trí, không làm gián đoạn app */ }
  }

  function setupLockHeader() {
    var header = document.querySelector('.lock-card-header');
    if (!header || header.querySelector('.lock-org-name')) return;
    var title = header.querySelector('.lock-title');
    var subtitle = header.querySelector('.lock-subtitle');
    var block = document.createElement('div');
    block.innerHTML =
      '<p class="lock-org-parent">SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH</p>' +
      '<p class="lock-org-name">TRUNG TÂM PHÁP Y</p>' +
      '<hr class="lock-org-rule">';
    header.insertBefore(block, title || header.firstChild);
    if (title) title.textContent = 'Quản lý kho vật tư và văn phòng phẩm';
    var brandSub = document.querySelector('.topbar-brand-text p');
    if (brandSub) brandSub.textContent = 'Trung tâm Pháp y TP.HCM';
    if (subtitle) subtitle.textContent = 'Hệ thống nội bộ ForensicStore Pro';

    var reqBtn = document.getElementById('btn-lock-open-requisition');
    if (reqBtn) reqBtn.textContent = 'Khoa / Phòng gửi phiếu đề xuất lãnh hàng';
    var notice = document.querySelector('.lock-security-notice');
    if (notice) notice.textContent = 'Đăng nhập dành cho Thủ kho và Ban Giám đốc. Khoa / Phòng xem tồn kho và gửi phiếu đề xuất không cần đăng nhập.';
    var footer = document.querySelector('.lock-card-footer span');
    if (footer) footer.textContent = 'Dữ liệu được bảo vệ, chỉ tài khoản được cấp quyền mới truy cập được';
  }

  function start() {
    setupLockHeader();
    tidy(document.body);
    var pending = new Set();
    var scheduled = false;
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.type === 'characterData') pending.add(m.target.parentElement);
        m.addedNodes.forEach(function (n) { pending.add(n.nodeType === 1 ? n : n.parentElement); });
      });
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        observer.disconnect();
        pending.forEach(function (el) { if (el && el.isConnected) tidy(el); });
        pending.clear();
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
