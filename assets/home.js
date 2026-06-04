/*
  Home page topic list — auto-discovered.

  In production: lists every .html file in /pages/ of the public mcdocs repo
  via the GitHub Contents API.
  In local dev: falls back to parsing the directory listing served by
  `python -m http.server` (or any server that lists dir contents).

  For each file we fetch and read <title> + <meta name="description">.
  Per-page override: <meta name="docs-title" content="..."> wins over <title>.
  Files starting with "_" are ignored.
*/
(async () => {
  const OWNER  = 'michaelchung1211';
  const REPO   = 'mcdocs';
  const FOLDER = 'pages';

  const list = document.getElementById('topics-list');
  if (!list) return;

  const setMsg = (html, color) => {
    list.innerHTML = `<li><span class="toc-empty"${color ? ` style="color:${color}"` : ''}>${html}</span></li>`;
  };

  const escapeHtml = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const stripSuffix = (title) => title.replace(/\s*[·\-—|]\s*(MC\s*Docs|伺服器手冊).*$/i, '').trim();

  const isLocal = ['localhost', '127.0.0.1', '0.0.0.0', ''].includes(location.hostname);

  async function listFromGitHub() {
    const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data.filter(f => f.type === 'file' && /\.html?$/i.test(f.name) && !f.name.startsWith('_'))
               .map(f => f.name);
  }

  async function listFromDirListing() {
    const r = await fetch(`./${FOLDER}/`);
    if (!r.ok) return null;
    const html = await r.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'));
    return links
      .map(a => (a.getAttribute('href') || '').replace(/^\.?\/?/, '').replace(/\/$/, ''))
      .filter(n => /\.html?$/i.test(n) && !n.startsWith('_'));
  }

  let names = null;
  try {
    names = await listFromGitHub();
  } catch (_) { /* fall through to local */ }

  if ((!names || names.length === 0) && isLocal) {
    const local = await listFromDirListing().catch(() => null);
    if (local && local.length) names = local;
  }

  if (!names) { setMsg(`載入失敗：無法讀取 <code>${FOLDER}/</code>。`, 'var(--terra)'); return; }
  if (names.length === 0) { setMsg(`尚未有任何頁面。把 .html 放到 <code>${FOLDER}/</code> 即可。`); return; }

  const parser = new DOMParser();
  const items = await Promise.all(names.map(async (name) => {
    const href = `./${FOLDER}/${name}`;
    try {
      const res = await fetch(href, { cache: 'no-cache' });
      const html = await res.text();
      const doc = parser.parseFromString(html, 'text/html');
      const override = doc.querySelector('meta[name="docs-title"]')?.getAttribute('content');
      const rawTitle = override || doc.querySelector('title')?.textContent || name;
      const title = stripSuffix(rawTitle) || name;
      const summary = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      return { title, summary, href };
    } catch {
      return { title: name, summary: '', href };
    }
  }));

  items.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));

  list.innerHTML = items.map(it => `
    <li><a href="${escapeHtml(it.href)}">${escapeHtml(it.title)}</a>${
      it.summary ? `<span class="toc-summary">${escapeHtml(it.summary)}</span>` : ''
    }</li>
  `).join('');
})();
