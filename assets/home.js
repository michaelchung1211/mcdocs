/* Reads manifest.json and renders the topic list on the home page. */
(async () => {
  const list = document.getElementById('topics-list');
  if (!list) return;

  const setEmpty = (msg, color) => {
    list.innerHTML = `<li><span class="toc-empty"${color ? ` style="color:${color}"` : ''}>${msg}</span></li>`;
  };

  try {
    const res = await fetch('./manifest.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const topics = Array.isArray(data.topics) ? data.topics : [];

    if (topics.length === 0) {
      setEmpty('尚未新增任何說明文件。複製 _template.html 開始第一篇。');
      return;
    }

    list.innerHTML = topics.map(t => {
      const path = String(t.path || '').replace(/[<>"]/g, '');
      const title = escapeHtml(t.title || '(無標題)');
      const summary = t.summary ? `<span class="toc-summary">${escapeHtml(t.summary)}</span>` : '';
      return `<li><div><a href="${path}">${title}</a>${summary}</div></li>`;
    }).join('');
  } catch (err) {
    setEmpty(`無法載入清單：${escapeHtml(err.message)}`, 'var(--terra)');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
