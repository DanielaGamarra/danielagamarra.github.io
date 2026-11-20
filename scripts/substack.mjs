// Reads the Substack URL from assets/content.js, fetches its RSS feed and
// writes assets/writing.json for the "writing" page. No dependencies.
// Run: node scripts/substack.mjs
import { readFile, writeFile } from 'node:fs/promises';

const content = await readFile(new URL('../assets/content.js', import.meta.url), 'utf8');
const m = content.match(/substack:\s*'([^']*)'/);
const base = (process.env.SUBSTACK_URL || (m ? m[1] : '')).trim().replace(/\/$/, '');
const out = process.env.OUT ? new URL('file://' + process.env.OUT) : new URL('../assets/writing.json', import.meta.url);

if (!base) { console.log('No substack url in content.js, nothing to do.'); process.exit(0); }

const res = await fetch(base + '/feed', { headers: { 'user-agent': 'portfolio-feed-reader' } });
if (!res.ok) { console.error('Feed fetch failed:', res.status); process.exit(1); }
const xml = await res.text();

const tag = (s, name) => {
  const r = s.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  if (!r) return '';
  return r[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&nbsp;/g, ' ');
const plain = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 12).map(([, it]) => {
  const ex = plain(tag(it, 'description'));
  const img = (it.match(/<enclosure[^>]*url="([^"]+)"/) || [])[1] || '';
  return {
    title: plain(tag(it, 'title')),
    url: tag(it, 'link'),
    date: new Date(tag(it, 'pubDate')).toISOString(),
    excerpt: ex.length > 220 ? ex.slice(0, 217).replace(/\s+\S*$/, '') + '…' : ex,
    image: img,
  };
}).filter((p) => p.title && p.url);

const next = JSON.stringify({ source: base, posts }, null, 2) + '\n';
let prev = '';
try { prev = await readFile(out, 'utf8'); } catch {}
if (prev === next) console.log('No new posts.');
else { await writeFile(out, next); console.log(`Wrote ${posts.length} posts.`); }
