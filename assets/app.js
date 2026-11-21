// DAGA's digibook · portfolio + CV
// Canvas desk with sketchbook pages, ASCII renderers, Pretext text flow.
import { prepareWithSegments, layoutNextLine } from '../vendor/pretext/layout.js';
import * as C from './content.js';

const NS = 'http://www.w3.org/2000/svg';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mqFlow = matchMedia('(max-width: 760px)');
let FLOW = mqFlow.matches;
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ------------------------------------------------------------ seeded rand
function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619); return h >>> 0; }
function rng(seed) { let s = typeof seed === 'string' ? hash(seed) : seed >>> 0; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }

// ------------------------------------------------------------ hand-drawn bits
function roughRect(w, h, seed) {
  const r = rng(seed); const j = (a) => (r() - 0.5) * a;
  let d = '';
  for (let pass = 0; pass < 2; pass++) {
    const pts = [[j(3), j(3)], [w + j(3), j(3)], [w + j(3), h + j(3)], [j(3), h + j(3)]];
    d += `M${(pts[0][0] - 3).toFixed(1)} ${(pts[0][1] + j(2)).toFixed(1)}`;
    for (let i = 1; i <= 4; i++) {
      const a = pts[i - 1], b = pts[i % 4];
      const mx = (a[0] + b[0]) / 2 + j(3), my = (a[1] + b[1]) / 2 + j(3);
      const ex = i === 4 ? b[0] + 4 : b[0] + j(2);
      d += ` Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${(b[1] + j(2)).toFixed(1)}`;
    }
  }
  return d;
}
function setRough(el) {
  const w = el.offsetWidth, h = el.offsetHeight;
  if (!w) return;
  let svg = el.querySelector(':scope > .rough');
  if (!svg) { svg = document.createElementNS(NS, 'svg'); svg.classList.add('rough'); svg.setAttribute('aria-hidden', 'true'); el.prepend(svg); }
  svg.setAttribute('viewBox', `-3 -3 ${w + 6} ${h + 6}`);
  svg.innerHTML = `<path d="${roughRect(w, h, el.dataset.id || 'x')}"/>`;
}

const spiralPath = (() => { let d = 'M50 50'; for (let a = 0; a < Math.PI * 7; a += 0.25) { const r = 2 + a * 2; d += ` L${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`; } return d; })();
const DOODLES = {
  star: 'M50 8 L61 38 L94 39 L67 58 L77 90 L50 71 L23 90 L33 58 L6 39 L39 38 Z',
  sparkle: 'M50 6 C52 36 64 48 94 50 C64 52 52 64 50 94 C48 64 36 52 6 50 C36 48 48 36 50 6 Z',
  arrow: 'M8 78 C 26 30, 62 18, 90 40 M90 40 L72 38 M90 40 L86 22',
  arrowL: 'M92 78 C 74 30, 38 18, 10 40 M10 40 L28 38 M10 40 L14 22',
  arrowDown: 'M40 6 C 70 30, 20 60, 52 92 M52 92 L38 82 M52 92 L60 76',
  spiral: spiralPath,
  underline: 'M4 60 C 20 48, 36 70, 52 56 S 80 50, 96 58',
  plane: 'M8 52 L92 14 L62 88 L48 60 Z M48 60 L92 14 M48 60 L44 80 L56 68 M4 70 C 10 74, 16 74, 22 70 M0 84 C 8 88, 14 88, 22 84',
  circle: 'M50 10 C 85 8, 96 40, 90 62 C 82 90, 30 96, 12 70 C -2 48, 14 14, 56 12',
  planet: 'M50 30 C 62 30, 70 40, 70 50 C 70 62, 62 70, 50 70 C 38 70, 30 62, 30 50 C 30 40, 38 30, 50 30 Z M30 56 C 6 66, 10 74, 40 66 C 62 60, 92 44, 90 36 C 89 32, 80 33, 70 38',
  rocket: 'M50 6 C 64 20, 67 44, 61 66 L39 66 C 33 44, 36 20, 50 6 Z M39 54 L26 74 L40 70 M61 54 L74 74 L60 70 M44 76 L50 94 L56 76 M50 26 C 54 26, 56 29, 56 32 C 56 35, 54 38, 50 38 C 46 38, 44 35, 44 32 C 44 29, 46 26, 50 26 Z',
  ufo: 'M14 58 C 14 46, 86 46, 86 58 C 86 68, 14 68, 14 58 Z M32 50 C 34 30, 66 30, 68 50 M30 72 L20 90 M50 70 L50 94 M70 72 L80 90',
  orbit: 'M8 50 C 8 32, 92 32, 92 50 C 92 68, 8 68, 8 50 Z M42 50 C 42 45, 46 42, 50 42 C 54 42, 58 45, 58 50 C 58 55, 54 58, 50 58 C 46 58, 42 55, 42 50 Z M84 40 L88 36',
  constellation: 'M8 72 L28 44 L50 54 L68 20 L92 30 M28 44 L24 20 M8 72 l1 0 M28 44 l1 0 M50 54 l1 0 M68 20 l1 0 M92 30 l1 0 M24 20 l1 0',
  satellite: 'M40 40 L60 60 M34 46 L46 34 L66 54 L54 66 Z M38 42 L14 18 L24 8 L48 32 M62 58 L86 82 L76 92 L52 68 M66 34 C 74 26, 82 30, 84 38',
  squiggle: 'M6 50 C 16 30, 26 70, 36 50 S 56 30, 66 50 S 86 70, 96 50',
  eye: 'M6 50 C 30 18, 70 18, 94 50 C 70 82, 30 82, 6 50 Z M50 36 C 58 36, 64 42, 64 50 C 64 58, 58 64, 50 64 C 42 64, 36 58, 36 50 C 36 42, 42 36, 50 36 Z M50 46 L50 54',
  hands: 'M20 90 L24 52 C 24 44, 32 44, 32 52 L32 30 C 32 22, 40 22, 40 30 L40 24 C 40 16, 48 16, 48 24 L48 30 C 48 22, 56 22, 56 30 L56 62 M64 18 L60 8 M72 22 L80 14 M76 32 L86 30',
};
function doodle(name, { x, y, w = 70, rot = 0, cls = '', loose = true } = {}) {
  const s = document.createElementNS(NS, 'svg');
  s.setAttribute('viewBox', '0 0 100 100');
  s.setAttribute('aria-hidden', 'true');
  s.setAttribute('class', `doodle draw ${cls} ${loose ? 'loose' : ''}`);
  s.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${w}px;transform:rotate(${rot}deg)`;
  s.innerHTML = `<path pathLength="1" d="${DOODLES[name]}"/>`;
  drawObserver.observe(s);
  return s;
}
function scribble(text, { x, y, rot = -4, color = '', size = 24 } = {}) {
  const el = document.createElement('div');
  el.className = 'scribble loose';
  el.textContent = text;
  el.style.cssText = `left:${x}px;top:${y}px;transform:rotate(${rot}deg);font-size:${size}px;${color ? `color:${color}` : ''}`;
  return el;
}
const drawObserver = new IntersectionObserver((ents) => {
  for (const e of ents) if (e.isIntersecting) { e.target.classList.add('drawn'); drawObserver.unobserve(e.target); }
}, { threshold: 0.2 });

// ------------------------------------------------------------ ASCII engine
const RAMP = ' .,:;-~=+*xo%#@';
const THEME = { ink: '#161410', hot: '#2a3cff' };
function readTheme() { const cs = getComputedStyle(document.documentElement); THEME.ink = cs.getPropertyValue('--ink').trim() || THEME.ink; THEME.hot = cs.getPropertyValue('--blue').trim() || THEME.hot; }
readTheme();
const SCATTER = '@#%&*+=/\\<>{}[]~';
const animators = new Set();
let frameT = 0;
function loop(t) { frameT = t; for (const a of animators) a.draw(t); requestAnimationFrame(loop); }
requestAnimationFrame(loop);

class Ascii {
  constructor(canvas, opts) {
    this.c = canvas;
    this.o = Object.assign({ font: 7, color: null, hot: null, noise: 0.05, radius: 46, push: 14, mode: 'emoji', wave: true }, opts);
    this.ctx = canvas.getContext('2d');
    this.mouse = null;
    canvas.addEventListener('pointermove', (e) => { this.mouse = this.local(e); if (REDUCE) this.draw(frameT); });
    canvas.addEventListener('pointerleave', () => { this.mouse = null; if (!this.always) this.draw(frameT); });
  }
  local(e) { const r = this.c.getBoundingClientRect(); const k = this.w / r.width; return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k }; }
  resize() {
    const w = this.c.clientWidth, h = this.c.clientHeight;
    if (!w || !h) return false;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.c.width = Math.round(w * dpr); this.c.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w; this.h = h;
    this.fontStr = `700 ${this.o.font}px "JetBrains Mono", monospace`;
    this.ctx.font = this.fontStr;
    this.cw = this.ctx.measureText('M').width; this.ch = this.o.font * 1.05;
    this.cols = Math.max(1, Math.floor(w / this.cw)); this.rows = Math.max(1, Math.floor(h / this.ch));
    this.sample();
    this.draw(frameT);
    return true;
  }
  sample() {
    const { cols, rows } = this;
    const off = document.createElement('canvas'); off.width = cols * 2; off.height = rows * 2;
    const g = off.getContext('2d', { willReadFrequently: true });
    g.save(); g.scale(off.width / this.w, off.height / this.h); this.o.src(g, this.w, this.h); g.restore();
    const px = g.getImageData(0, 0, off.width, off.height).data;
    const d = new Float32Array(cols * rows), rnd = new Float32Array(cols * rows);
    const r = rng(this.o.seed || 'a');
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      let a = 0, l = 0;
      for (let yy = 0; yy < 2; yy++) for (let xx = 0; xx < 2; xx++) {
        const k = ((j * 2 + yy) * off.width + (i * 2 + xx)) * 4;
        const al = px[k + 3] / 255; a += al; l += al * (0.299 * px[k] + 0.587 * px[k + 1] + 0.114 * px[k + 2]) / 255;
      }
      a /= 4; const lum = a ? l / 4 / a : 1;
      let v = this.o.mode === 'alpha' ? a : this.o.mode === 'lum' ? 1 - lum : (a > 0.08 ? Math.min(1, a * (0.5 + 0.7 * (1 - lum))) : 0);
      const n = r(); rnd[j * cols + i] = n;
      if (v < 0.04 && n < this.o.noise) v = 0.05 + n * 1.2;
      d[j * cols + i] = v;
    }
    this.d = d; this.rnd = rnd;
  }
  draw(t) {
    if (!this.d) return;
    const { ctx, cols, rows, cw, ch, d, rnd, o } = this;
    const m = this.mouse, R = o.radius, anim = (this.always || m) && !REDUCE;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.font = this.fontStr; ctx.textBaseline = 'top';
    const tick = (t / 90) | 0;
    const gl = o.glitch && anim && (t % 3800) < 180 ? ((t / 3800) | 0) : -1;
    const g0 = gl >= 0 ? (gl * 7) % Math.max(1, rows - 3) : -9, gOff = gl >= 0 ? ((gl % 2) ? 1 : -1) * (6 + (gl % 5) * 3) : 0;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = j * cols + i;
      let v = d[k];
      const inG = j >= g0 && j < g0 + 3;
      let x = i * cw + (inG ? gOff : 0), y = j * ch, hot = inG && v > 0.04 ? 0.32 : 0;
      if (m) {
        const dx = x - m.x, dy = y - m.y, dist = Math.hypot(dx, dy);
        if (dist < R) { hot = 1 - dist / R; const p = hot * hot * o.push; x += (dx / (dist || 1)) * p; y += (dy / (dist || 1)) * p; }
      }
      if (v < 0.04 && !(hot > 0.25 && rnd[k] < hot * 0.7)) continue;
      if (anim && o.wave) v *= 0.82 + 0.18 * Math.sin(t * 0.0022 + i * 0.16 + j * 0.34);
      if (hot > 0.3) {
        ctx.fillStyle = o.hot || THEME.hot; ctx.globalAlpha = 0.5 + hot * 0.5;
        ctx.fillText(SCATTER[(k * 7 + tick) % SCATTER.length], x, y);
      } else {
        let chr = RAMP[Math.min(RAMP.length - 1, Math.max(1, Math.floor(v * RAMP.length)))];
        if (anim && rnd[k] > 0.985) chr = SCATTER[(k + tick) % SCATTER.length];
        ctx.fillStyle = o.color || THEME.ink; ctx.globalAlpha = 0.28 + 0.72 * Math.min(1, v);
        ctx.fillText(chr, x, y);
      }
    }
    ctx.globalAlpha = 1;
  }
}
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
function emojiSrc(emoji, scale = 0.86) {
  return (g, w, h) => {
    const s = Math.min(w, h) * scale;
    g.font = `${s}px ${EMOJI_FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(emoji, w / 2, h / 2 + s * 0.05);
  };
}
function imageSrc(img) {
  return (g, w, h) => {
    const r = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const iw = img.naturalWidth * r, ih = img.naturalHeight * r;
    g.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
  };
}
function makeThumb(canvas, p, opts = {}) {
  const a = new Ascii(canvas, { seed: p.id, src: emojiSrc(p.motif || '✦'), ...opts });
  if (p.img) {
    const im = new Image();
    im.onload = () => { a.o.src = imageSrc(im); a.o.mode = 'lum'; a.o.noise = 0; a.resize(); };
    im.src = p.img;
  }
  return a;
}

// ------------------------------------------------------------ Pretext: text flowing around the cat
const TEXT_START = { segmentIndex: 0, graphemeIndex: 0 };
function markRanges(text, marks) {
  const out = [];
  for (const m of marks) { let i = text.indexOf(m); while (i >= 0) { out.push([i, i + m.length]); i = text.indexOf(m, i + m.length); } }
  return out;
}
function lineHtml(text, start, ranges) {
  let html = '', open = false;
  for (let i = 0; i < text.length; i++) {
    const g = start + i;
    const inMark = ranges.some(([a, b]) => g >= a && g < b);
    if (inMark && !open) { html += '<mark>'; open = true; }
    if (!inMark && open) { html += '</mark>'; open = false; }
    html += esc(text[i]);
  }
  return html + (open ? '</mark>' : '');
}
function lineWriter(box) {
  const pool = [];
  let n = 0, pos = 0;
  return {
    reset() { n = 0; pos = 0; },
    put(text, x, y, src, ranges, w) {
      let el = pool[n];
      if (!el) { el = document.createElement('div'); el.className = 'ln'; box.appendChild(el); pool.push(el); }
      el.style.display = '';
      el.style.transform = `translate(${x.toFixed(1)}px, ${y}px)`;
      if (src) {
        let s = src.indexOf(text, pos); if (s < 0) s = pos; pos = s + text.length;
        el.innerHTML = lineHtml(text, s, ranges);
      } else el.textContent = text;
      n++;
    },
    end() { for (let i = n; i < pool.length; i++) pool[i].style.display = 'none'; },
  };
}

class Flow {
  constructor(box, cat) {
    this.box = box; this.cat = cat;
    this.text = C.site.hero; this.ranges = markRanges(this.text, C.site.heroMarks);
    this.w = lineWriter(box);
    this.pos = null; this.cache = {};
    this.dragging = false;
    cat.addEventListener('pointerdown', (e) => this.grab(e));
  }
  metrics() { return FLOW ? { size: 22, lh: 30, rx: 56, ry: 50 } : { size: 30, lh: 40, rx: 88, ry: 78 }; }
  prepared(size) {
    const font = `400 ${size}px "Instrument Serif"`;
    return this.cache[size] || (this.cache[size] = prepareWithSegments(this.text, font));
  }
  render() {
    const W = this.box.clientWidth; if (!W) return;
    const { size, lh, rx, ry } = this.metrics();
    if (!this.pos) this.pos = { fx: 0.82, cy: FLOW ? 70 : 92 };
    const cx = Math.max(rx * 0.4, Math.min(W - rx * 0.4, this.pos.fx * W));
    const cy = this.pos.cy;
    this.cat.style.transform = `translate(${cx - this.cat.offsetWidth / 2}px, ${cy - this.cat.offsetHeight / 2}px)`;
    const prepared = this.prepared(size);
    const pad = FLOW ? 8 : 16, minSpan = FLOW ? 70 : 150;
    this.w.reset();
    let cursor = TEXT_START, y = 0, done = false, guard = 0;
    while (!done && guard++ < 200) {
      const top = y, bot = y + lh;
      const ny = Math.max(top, Math.min(cy, bot)), dy = ny - cy, RY = ry + pad, RX = rx + pad;
      let spans = [[0, W]];
      if (Math.abs(dy) < RY) {
        const hw = RX * Math.sqrt(1 - (dy / RY) ** 2), a = cx - hw, b = cx + hw;
        spans = [];
        if (a > minSpan) spans.push([0, Math.min(a, W)]);
        if (W - b > minSpan) spans.push([Math.max(0, b), W]);
      }
      for (const [x0, x1] of spans) {
        const line = layoutNextLine(prepared, x1 - x0, cursor);
        if (!line) { done = true; break; }
        this.w.put(line.text, x0, y, this.text, this.ranges);
        cursor = line.end;
      }
      y += lh;
    }
    this.w.end();
    this.box.style.height = Math.max(y - lh, cy + ry + 10) + 'px';
  }
  grab(e) {
    e.preventDefault(); e.stopPropagation();
    this.cat.setPointerCapture(e.pointerId);
    const W = this.box.clientWidth, z = FLOW ? 1 : cam.z;
    const start = { x: e.clientX, y: e.clientY, fx: this.pos.fx, cy: this.pos.cy };
    const move = (ev) => {
      this.pos.fx = Math.max(0, Math.min(1, start.fx + (ev.clientX - start.x) / z / W));
      this.pos.cy = Math.max(this.metrics().ry * 0.7, Math.min(FLOW ? 420 : 520, start.cy + (ev.clientY - start.y) / z));
      this.render();
      hideHint();
    };
    const up = () => { this.cat.removeEventListener('pointermove', move); this.cat.removeEventListener('pointerup', up); this.cat.removeEventListener('pointercancel', up); };
    this.cat.addEventListener('pointermove', move); this.cat.addEventListener('pointerup', up); this.cat.addEventListener('pointercancel', up);
  }
}

// ------------------------------------------------------------ Pretext: about text inside a speech bubble
function bubbleRuns(W, H, lh) {
  const rows = [], cy = H * 0.44, ry = H * 0.42, rx = W / 2, pad = 22;
  for (let y = 0; y + lh <= H; y += lh) {
    const yc = y + lh / 2, ey = (yc - cy) / (ry - pad * 0.6);
    if (Math.abs(ey) >= 1) { rows.push([]); continue; }
    const hw = (rx - pad) * Math.sqrt(1 - ey * ey);
    rows.push(hw > 24 ? [[rx - hw, rx + hw]] : []);
  }
  return rows;
}
function bubblePath(W, H, seed) {
  const r = rng(seed), cx = W / 2, cy = H * 0.44, rx = W / 2 - 3, ry = H * 0.42;
  let d = '';
  for (let pass = 0; pass < 2; pass++) {
    const a0 = 1.95 + pass * 0.1, steps = 26;
    for (let i = 0; i <= steps; i++) {
      const a = a0 + (i / steps) * (Math.PI * 2 - 0.5), j = 1 + (r() - 0.5) * 0.025;
      const x = cx + Math.cos(a) * rx * j, y = cy + Math.sin(a) * ry * j;
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    d += ` L${(W * 0.16).toFixed(1)} ${(H * 0.99).toFixed(1)} L${(W * 0.3 + pass * 3).toFixed(1)} ${(H * 0.83).toFixed(1)}`;
  }
  return d;
}
class Bubble {
  constructor(box) {
    this.box = box; this.w = lineWriter(box); this.cache = {};
    this.svg = document.createElementNS(NS, 'svg'); this.svg.classList.add('bubble-line'); this.svg.setAttribute('aria-hidden', 'true');
    box.appendChild(this.svg);
  }
  render() {
    const W = Math.min(this.box.clientWidth, 560); if (!W) return;
    const H = Math.round(W * 0.78), text = C.site.about;
    this.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    this.svg.style.width = W + 'px'; this.svg.style.height = H + 'px';
    this.svg.innerHTML = `<path d="${bubblePath(W, H, 'hola')}"/>`;
    for (let size = 24; size >= 11; size--) {
      const lh = Math.round(size * 1.22);
      const prepared = this.cache[size] || (this.cache[size] = prepareWithSegments(text, `400 ${size}px "Instrument Serif"`));
      const rows = bubbleRuns(W, H, lh);
      const out = []; let cursor = TEXT_START, done = false;
      for (let r = 0; r < rows.length && !done; r++) for (const [a, b] of rows[r]) {
        const line = layoutNextLine(prepared, b - a, cursor);
        if (!line) { done = true; break; }
        out.push([line.text, a + (b - a - line.width) / 2, r * lh]); cursor = line.end;
      }
      if (!done && size > 11 && layoutNextLine(prepared, 9999, cursor)) continue; // did not fit, go smaller
      this.box.style.fontSize = size + 'px'; this.box.style.lineHeight = lh + 'px';
      this.w.reset(); for (const [t, x, y] of out) this.w.put(t, x, y); this.w.end();
      this.box.style.height = H + 'px';
      return;
    }
  }
}

// ------------------------------------------------------------ build the sketchbook
const desk = $('#desk'), world = $('#world'), inkLayer = $('#ink-layer');
const spiralStr = '(@)    '.repeat(60);
const rule = (no, title) => { const s = `+--[ ${no} / ${title} ]`; return s + '-'.repeat(240) + '+'; };
const COL = 320, GAP = 36, PADX = 56;
const pageW = (cols) => cols * COL + (cols - 1) * GAP + PADX * 2;
const titleHtml = (t) => { const w = esc(t).split(' '); const last = w.pop(); return (w.length ? w.join(' ') + ' ' : '') + `<em>${last}</em>`; };
const pageEls = [];
let heroAscii, flow, bubble;
const thumbs = [];

// Projects made at Indaga Studios carry the studio logo.
const isIndaga = (p) => p.indaga || /Indaga Studios/.test(p.kind || '');
const studioBadge = (p) => isIndaga(p) ? '<span class="studio-badge" title="Made at Indaga Studios" role="img" aria-label="Made at Indaga Studios"><i></i></span>' : '';
function cardEl(p) {
  const el = document.createElement('article');
  el.className = 'card' + (p.featured ? ' featured' : '');
  el.dataset.id = p.id; el.tabIndex = 0;
  el.setAttribute('aria-label', `${p.title}, ${p.role}`);
  const r = rng(p.id);
  el.style.setProperty('--r', ((r() - 0.5) * 2.4).toFixed(2) + 'deg');
  el.style.transform = 'rotate(var(--r))';
  el.innerHTML = `
    <div class="thumb"><canvas aria-hidden="true"></canvas>${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy"${p.pos ? ` style="object-position:${esc(p.pos)}"` : ''}>` : ''}${studioBadge(p)}</div>
    <div class="kind">${esc(p.kind)}${p.video ? ' · <b class="play">▶ watch</b>' : ''}</div>
    <h3>${esc(p.title)}</h3>
    ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ''}
    <p>${esc(p.blurb)}</p>
    <span class="role">${esc(p.role)}</span>${p.year ? `<span class="year">${esc(p.year)}</span>` : ''}
    ${p.todo ? `<div class="todo">${esc(p.todo)}</div>` : ''}`;
  el.addEventListener('click', () => { if (!dragMoved) openSheet(p); });
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSheet(p); } });
  const thumbCanvas = $('canvas', el);
  const a = makeThumb(thumbCanvas, p, { font: p.featured ? 10 : 8 });
  thumbs.push(a);
  el.addEventListener('pointerenter', () => animators.add(a));
  el.addEventListener('pointerleave', () => { animators.delete(a); a.mouse = null; a.draw(frameT); });
  return el;
}

// Client work without approved images: a plain list, title · role.
function linesCard(list) {
  const el = document.createElement('article');
  el.className = 'card lines-card'; el.dataset.id = 'lines-' + list[0].page;
  el.style.setProperty('--r', '0.6deg'); el.style.transform = 'rotate(var(--r))';
  el.innerHTML = `<div class="kind">also worked on</div><ul class="plist">${list.map((p) => `
    <li><button type="button" data-pid="${esc(p.id)}"><b>${esc(p.title)}</b><span class="role">${esc(p.role)}</span><small>${esc(p.kind)}${p.year ? ` · ${esc(p.year)}` : ''}</small></button>${p.todo ? `<div class="todo">${esc(p.todo)}</div>` : ''}</li>`).join('')}</ul>`;
  el.addEventListener('click', (e) => { const b = e.target.closest('[data-pid]'); if (b && !dragMoved) openSheet(C.projects.find((p) => p.id === b.dataset.pid)); });
  return el;
}

function pageShell(id, { no, title, note, tint, cols }) {
  const el = document.createElement('section');
  el.className = 'page'; el.id = id;
  el.setAttribute('aria-label', title);
  el.innerHTML = `
    <div class="spiral" aria-hidden="true">${spiralStr}</div>
    <div class="tape" data-tint="${tint}" aria-hidden="true"></div>
    <header class="page-head"><span class="page-no">${no}</span><h2 class="page-title">${titleHtml(title)}</h2><span class="page-note">${esc(note)}</span></header>
    <div class="page-ascii" aria-hidden="true">${esc(rule(no, title))}</div>
    <div class="page-body"></div>`;
  el._cols = cols;
  return el;
}

const LOGO = new Image();
LOGO.src = 'assets/img/daga-logo.svg';
function buildCover() {
  const el = pageShell('cover', { no: '00', title: 'cover', note: '', tint: 'lime', cols: 3 });
  el.classList.add('cover');
  el._at = [0, 0]; el._rot = -0.4; el._w = 1180;
  const body = $('.page-body', el);
  const [first, ...rest] = C.site.role.split(', ');
  body.innerHTML = `
    <h1 class="sr-only" style="position:absolute;left:-9999px">${esc(C.site.fullName)} (${esc(C.site.name)}) · ${esc(C.site.role)}</h1>
    <canvas class="ascii-name" aria-hidden="true"></canvas>
    <div class="cover-role"><span class="r">${esc(C.site.fullName)} · <em>${esc(C.site.role)}</em></span><span class="loc">📍 ${esc(C.site.location)}</span></div>
    <div class="flow" aria-label="${esc(C.site.hero)}">
      <div class="cat" role="img" aria-label="Berlin the cat, draggable">
        <svg viewBox="0 0 200 180" aria-hidden="true">
          <path class="fill" d="M40 150 C 28 112, 52 84, 100 84 C 150 84, 172 112, 160 150 C 140 166, 60 166, 40 150 Z"/>
          <path d="M160 140 C 192 132, 196 100, 176 90"/>
          <path class="fill" d="M60 96 C 52 64, 60 42, 70 20 L 88 44 C 96 41, 108 41, 116 44 L 134 20 C 144 42, 150 64, 142 96 C 130 116, 72 116, 60 96 Z"/>
          <path class="eyes" d="M80 72 q7 -7 14 0 M108 72 q7 -7 14 0"/>
          <path d="M101 84 l-5 -4 h10 z M101 84 q-4 7 -10 5 M101 84 q4 7 10 5"/>
          <path d="M70 86 l-30 -5 M70 93 l-30 4 M132 86 l30 -5 M132 93 l30 4"/>
          <path d="M66 150 q4 -12 14 -10 M120 140 q10 -2 14 10"/>
          <path class="helmet" d="M101 4 C 150 4, 168 44, 162 78 C 156 114, 128 126, 101 126 C 74 126, 46 114, 40 78 C 34 44, 52 4, 101 4 Z"/>
          <path class="helmet glint" d="M58 46 C 64 30, 76 20, 90 16"/>
          <path d="M101 4 L101 -12 M98 -16 L104 -16"/>
        </svg>
        <span class="tag">berlin, space cadet · drag me</span>
      </div>
    </div>
    <div class="cover-cta">
      <a class="cta dark" href="#films" data-go="films">▶ watch</a>
      <a class="cta" href="#about" data-go="about">contact ✉</a>
      <a class="cta" href="#cv" data-cv>read it as a CV</a>
    </div>
    <div class="stats">${C.site.stats.map((s) => `<div class="stat"><b>${esc(s.n)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>`;
  el.append(
    doodle('sparkle', { x: 1080, y: 50, w: 54, rot: 10 }),
    doodle('star', { x: 40, y: 300, w: 34, rot: -12, cls: 'blue' }),
    doodle('rocket', { x: 1000, y: 610, w: 90, rot: 28, cls: 'blue' }),
    doodle('planet', { x: 980, y: 140, w: 90, rot: -12 }),
    scribble('← flip the pages', { x: 1012, y: 250, rot: 5, color: 'var(--red)' }),
  );
  heroAscii = new Ascii($('.ascii-name', body), {
    font: 8, mode: 'alpha', noise: 0.03, radius: 90, push: 26, seed: 'daga', always: true, glitch: true,
    // Daga's logo mark in ASCII (drawn a few times, offset, to thicken the strokes)
    src: (g, w, h) => {
      if (!(LOGO.complete && LOGO.naturalWidth)) return;
      const lh = h * 0.97, lw = lh * (798 / 944), y = (h - lh) / 2, d = Math.max(1.5, h / 160);
      for (const [dx, dy] of [[0, 0], [d, 0], [-d, 0], [0, d], [0, -d]]) g.drawImage(LOGO, dx + d, y + dy, lw, lh);
    },
  });
  heroAscii.always = true;
  flow = new Flow($('.flow', body), $('.cat', body));
  return el;
}

function buildPage(p) {
  const el = pageShell(p.id, p);
  el._at = p.at; el._w = pageW(p.cols);
  const r = rng(p.id); el._rot = (r() - 0.5) * 1.6;
  const body = $('.page-body', el);
  const W = el._w;
  if (p.id === 'awards') {
    body.innerHTML = `
      <pre class="trophy" aria-hidden="true">   .-=========-.
   \\'-=======-'/
   _|   .=.   |_
  ((|  { * }  |))
   \\|   /|\\   |/
    \\__ '\`' __/
      _\`) (\`_
    _/_______\\_
   /___________\\</pre>
      <div class="sub">awards ${'✦'}</div>
      <ul class="list">${C.awards.map((a) => `<li><span class="y">${esc(a.year || '★')}</span><span><span class="t">${esc(a.title)}</span><span class="b">${esc(a.by)}</span></span></li>`).join('')}</ul>
      <div class="sub">talks I gave 🎤</div>
      <ul class="list">${C.talks.map((t) => t.title
        ? `<li><span class="y">${esc(t.year)}</span><span><span class="t">${t.url ? `<a href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.title)}</a>` : esc(t.title)}</span><span class="b">${esc(t.where)}</span></span></li>`
        : `<li><span class="y">····</span><span class="todo">${esc(t.todo)}</span></li>`).join('')}</ul>`;
    el.append(doodle('hands', { x: W - 150, y: 40, w: 90, rot: 8 }), doodle('star', { x: 40, y: 34, w: 30, rot: 12, cls: 'red' }));
  } else if (p.id === 'about') {
    body.innerHTML = `
      <div class="about-wrap">
        <div class="bubble" aria-label="${esc(C.site.about)}"></div>
        <div class="contact">
          <p style="font:400 26px/1.25 var(--serif);margin:0 0 8px">${esc(C.site.tagline)}</p>
          <a href="mailto:${esc(C.site.email)}"><small>email</small><span>${esc(C.site.email)}</span></a>
          ${C.site.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener"><small>${esc(l.label)}</small><span>${esc(l.handle)}</span></a>`).join('')}
          <a href="#cv" data-cv><small>CV</small><span>read · print · save PDF</span></a>
          <p class="scribble" style="position:static;transform:rotate(-3deg);margin-top:14px;color:var(--blue)">open to directing, visual development + IP partnerships ✦</p>
        </div>
      </div>
      <p style="margin:34px 0 0;font-size:12px;color:var(--pencil)">© ${new Date().getFullYear()} ${esc(C.site.fullName)} · made by hand (and code) in Toronto · <a href="postest/">Postest</a></p>`;
    el.append(doodle('sparkle', { x: W - 120, y: 26, w: 46, rot: 10, cls: 'blue' }));
    bubble = new Bubble($('.bubble', body));
  } else if (p.id === 'writing') {
    body.innerHTML = `<div class="posts"><div class="todo">loading posts…</div></div>
      <div class="cover-cta" style="margin-top:22px">${C.site.substack ? `<a class="cta dark" href="${esc(C.site.substack.replace(/\/$/, ''))}/subscribe" target="_blank" rel="noopener">subscribe on Substack ↗</a><a class="cta" href="${esc(C.site.substack)}" target="_blank" rel="noopener">all posts</a>` : ''}</div>`;
    el.append(doodle('satellite', { x: W - 120, y: 30, w: 60, rot: -10, cls: 'blue' }));
    loadWriting($('.posts', body));
  } else {
    const list = C.projects.filter((x) => x.page === p.id);
    for (const pr of list.filter((x) => !x.line)) body.appendChild(cardEl(pr));
    const lines = list.filter((x) => x.line);
    if (lines.length) body.appendChild(linesCard(lines));
    const picks = ['planet', 'rocket', 'ufo', 'orbit', 'constellation', 'satellite', 'sparkle', 'eye'];
    const a = picks[Math.floor(r() * picks.length)], b = picks[Math.floor(r() * picks.length)];
    el.append(
      doodle(a, { x: W - 130, y: 30, w: 60, rot: (r() - 0.5) * 30, cls: r() > 0.5 ? 'blue' : '' }),
      doodle(b, { x: 22, y: 26 + r() * 20, w: 34, rot: (r() - 0.5) * 30, cls: 'red' }),
    );
  }
  return el;
}

// Substack posts: assets/writing.json is refreshed every hour by
// .github/workflows/substack.yml (reads the Substack RSS feed).
async function loadWriting(box) {
  let posts = [];
  try { const r = await fetch('assets/writing.json', { cache: 'no-cache' }); if (r.ok) posts = (await r.json()).posts || []; } catch {}
  if (!posts.length) {
    box.innerHTML = C.site.substack
      ? `<div class="todo">first post coming soon. Subscribe to get it.</div>`
      : `<div class="todo">set your Substack url in content.js (site.substack) and new posts land here by themselves</div>`;
  } else {
    const fmt = (d) => { const t = new Date(d); return isNaN(t) ? '' : t.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' }); };
    box.innerHTML = posts.slice(0, 6).map((p) => `
      <a class="post" href="${esc(p.url)}" target="_blank" rel="noopener">
        <span class="post-date">${esc(fmt(p.date))}</span>
        <span class="post-title">${esc(p.title)}</span>
        ${p.excerpt ? `<span class="post-ex">${esc(p.excerpt)}</span>` : ''}
        <span class="more">read on Substack ↗</span>
      </a>`).join('');
  }
  if (!FLOW && pageEls.length === C.pages.length) refreshAll();
}

function masonry(page) {
  const body = $('.page-body', page);
  const cols = page._cols, colH = new Array(cols).fill(0);
  for (const card of $$(':scope > .card', body)) {
    const span = Math.min(cols, card.classList.contains('featured') ? 2 : 1);
    card.style.width = span * COL + (span - 1) * GAP + 'px';
    let best = 0, bestY = Infinity;
    for (let s = 0; s + span <= cols; s++) { const y = Math.max(...colH.slice(s, s + span)); if (y < bestY - 1) { bestY = y; best = s; } }
    card.style.left = best * (COL + GAP) + 'px'; card.style.top = bestY + 'px';
    const hgt = card.offsetHeight;
    for (let s = best; s < best + span; s++) colH[s] = bestY + hgt + 44;
  }
  if (body.querySelector('.card')) body.style.height = Math.max(...colH) - 44 + 'px';
}

let bounds = { x: 0, y: 0, w: 1, h: 1 };
function layoutDesk() {
  const all = [$('#cover'), ...pageEls];
  for (const el of all) { el.style.width = el._w + 'px'; if (el._cols && el.id !== 'cover') masonry(el); }
  const colW = {}, rowH = {};
  for (const el of all) { const [c, r] = el._at; colW[c] = Math.max(colW[c] || 0, el.offsetWidth); rowH[r] = Math.max(rowH[r] || 0, el.offsetHeight); }
  const G = 170, xs = {}, ys = {};
  const colKeys = Object.keys(colW).map(Number).sort((a, b) => a - b), rowKeys = Object.keys(rowH).map(Number).sort((a, b) => a - b);
  let x = 0; for (const c of colKeys) { xs[c] = x; x += colW[c] + G; }
  let y = 0; for (const r of rowKeys) { ys[r] = y; y += rowH[r] + G; }
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const el of all) {
    const [c, r] = el._at, w = el.offsetWidth, h = el.offsetHeight;
    const left = xs[c] + (colW[c] - w) / 2;
    const top = r < 0 ? ys[r] + rowH[r] - h : r === 0 ? ys[r] + (rowH[r] - h) / 2 : ys[r];
    el.style.left = left + 'px'; el.style.top = top + 'px';
    el.style.transform = `rotate(${el._rot}deg)`;
    el._rect = { x: left, y: top, w, h };
    minX = Math.min(minX, left); minY = Math.min(minY, top); maxX = Math.max(maxX, left + w); maxY = Math.max(maxY, top + h);
  }
  bounds = { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

function refreshAll() {
  if (!FLOW) layoutDesk();
  $$('.card').forEach(setRough);
  heroAscii.resize(); flow.render(); bubble && bubble.render();
  thumbs.forEach((a) => a.resize());
  seedSketch();
  clearTrail();
  sharedRender();
  inkRender();
}

// ------------------------------------------------------------ camera
const cam = { x: 0, y: 0, z: 1 };
function applyCam() {
  world.style.transform = `translate(${cam.x}px, ${cam.y}px) scale(${cam.z})`;
  const g = 26 * cam.z;
  desk.style.backgroundSize = `${g}px ${g}px, 173px 173px, 241px 241px, 389px 389px, 100% 100%`;
  desk.style.backgroundPosition = `${cam.x}px ${cam.y}px, ${cam.x * 0.15}px ${cam.y * 0.15}px, ${cam.x * 0.3 + 61}px ${cam.y * 0.3 + 97}px, ${cam.x * 0.5 + 140}px ${cam.y * 0.5 + 33}px, 0 0`;
  scheduleActive();
  scheduleHud();
}
function viewFor(r, { maxZ = 1, top = 64, pad = 60, alignTop = true } = {}) {
  const vw = innerWidth - 60, vh = innerHeight - top;
  let z = Math.min((vw - pad * 2) / r.w, maxZ);
  const fitsH = r.h * z <= vh - pad;
  if (!alignTop) z = Math.min(z, (vh - pad) / r.h);
  const x = vw / 2 - (r.x + r.w / 2) * z;
  const y = (!alignTop || fitsH) ? top + vh / 2 - (r.y + r.h / 2) * z : top + 36 - r.y * z;
  return { x, y, z };
}
let flight = 0;
function flyTo(t, ms = 950) {
  if (REDUCE) { Object.assign(cam, t); applyCam(); return; }
  const s = { ...cam }, id = ++flight, t0 = performance.now();
  const dist = Math.hypot((t.x - s.x) / s.z, (t.y - s.y) / s.z);
  const dip = Math.min(0.5, dist / 6000);
  const step = (now) => {
    if (id !== flight) return;
    const k = Math.min(1, (now - t0) / ms), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const zLin = s.z + (t.z - s.z) * e, z = zLin * (1 - dip * Math.sin(Math.PI * e));
    // keep the target point anchored while zoom dips
    const wx = (innerWidth / 2 - (s.x + (t.x - s.x) * e)) / zLin, wy = (innerHeight / 2 - (s.y + (t.y - s.y) * e)) / zLin;
    cam.z = z; cam.x = innerWidth / 2 - wx * z; cam.y = innerHeight / 2 - wy * z;
    applyCam();
    if (k < 1) requestAnimationFrame(step); else { Object.assign(cam, t); applyCam(); }
  };
  requestAnimationFrame(step);
}
function zoomAt(f, px, py) {
  const z = Math.max(0.1, Math.min(2.5, cam.z * f));
  const wx = (px - cam.x) / cam.z, wy = (py - cam.y) / cam.z;
  cam.z = z; cam.x = px - wx * z; cam.y = py - wy * z; applyCam();
}
function goTo(id, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return;
  if (FLOW) { el.scrollIntoView({ behavior: smooth && !REDUCE ? 'smooth' : 'auto', block: 'start' }); return; }
  const t = viewFor(el._rect, { maxZ: id === 'cover' ? 1 : 0.95, alignTop: true });
  smooth ? flyTo(t) : (Object.assign(cam, t), applyCam());
  if (smooth) drawTrail(id);
}
function fitAll() { flyTo(viewFor(bounds, { maxZ: 1, alignTop: false, pad: 40 }), 1100); }

// ------------------------------------------------------------ tabs + active page
const tabs = $('#tabs');
function buildTabs() {
  const items = [{ id: 'cover', no: '00', title: 'cover', tint: 'lime' }, ...C.pages];
  tabs.innerHTML = items.map((p) => `<a class="tab" href="#${p.id}" data-go="${p.id}" data-tint="${p.tint}"><b>${p.no}</b><span>${esc(p.title)}</span></a>`).join('');
}
let activeRaf = 0;
function scheduleActive() { if (!activeRaf) activeRaf = requestAnimationFrame(() => { activeRaf = 0; updateActive(); }); }
let activeId = 'cover';
function setActive(id) { activeId = id; $$('.tab', tabs).forEach((t) => t.classList.toggle('on', t.dataset.go === id)); scheduleHud(); }
let hudRaf = 0;
function scheduleHud() { if (!hudRaf) hudRaf = requestAnimationFrame(() => { hudRaf = 0; renderHud(); }); }
function renderHud() {
  const hud = document.getElementById('hud');
  if (!hud || FLOW) return;
  const cx = Math.round((innerWidth / 2 - cam.x) / cam.z), cy = Math.round((innerHeight / 2 - cam.y) / cam.z);
  const pg = C.pages.find((p) => p.id === activeId);
  hud.innerHTML = `<b>◉ SECTOR ${pg ? pg.no : '00'}</b>  ${esc(pg ? pg.title : 'cover').toUpperCase()}\nX ${String(cx).padStart(6, ' ')}  Y ${String(cy).padStart(6, ' ')}  ZOOM ${cam.z.toFixed(2)}`;
}
function updateActive() {
  if (FLOW) return;
  const cx = (innerWidth / 2 - cam.x) / cam.z, cy = (innerHeight / 2 - cam.y) / cam.z;
  let best = null, bd = Infinity;
  for (const el of [$('#cover'), ...pageEls]) {
    const r = el._rect; if (!r) continue;
    const dx = Math.max(r.x - cx, 0, cx - r.x - r.w), dy = Math.max(r.y - cy, 0, cy - r.y - r.h), d = dx + dy;
    if (d < bd) { bd = d; best = el.id; }
  }
  if (best) setActive(best);
}
const flowObserver = new IntersectionObserver((ents) => {
  if (!FLOW) return;
  for (const e of ents) if (e.isIntersecting) setActive(e.target.id);
}, { rootMargin: '-40% 0px -55% 0px' });

// ------------------------------------------------------------ input: pan, zoom, doodle
let dragMoved = false;
const pointers = new Map();
let pan = null, pinch = null, stroke = null, doodling = false;
const INK = { ink: ['var(--ink)', 2.6, 1], blue: ['var(--blue)', 2.6, 1], red: ['var(--red)', 2.6, 1], lime: ['var(--lime)', 18, 0.6] };
let inkColor = 'ink';
let strokes = store.get('daga-doodles', []);

desk.addEventListener('pointerdown', (e) => {
  if (FLOW && !doodling) return;
  if (e.target.closest('a, button, .cat, input')) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (doodling && pointers.size === 1) {
    const p = FLOW ? null : [(e.clientX - cam.x) / cam.z, (e.clientY - cam.y) / cam.z];
    if (!p) return;
    stroke = { c: inkColor, pts: [p] }; strokes.push(stroke); inkRender();
    desk.setPointerCapture(e.pointerId);
    return;
  }
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: cam.z }; pan = null; return;
  }
  pan = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, id: e.pointerId };
  dragMoved = false;
  flight++;
});
desk.addEventListener('pointermove', (e) => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (stroke) {
    const p = [(e.clientX - cam.x) / cam.z, (e.clientY - cam.y) / cam.z], last = stroke.pts[stroke.pts.length - 1];
    if (Math.hypot(p[0] - last[0], p[1] - last[1]) > 1.5 / cam.z) { stroke.pts.push(p); inkRender(true); }
    return;
  }
  if (pinch && pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    zoomAt((pinch.z * d) / pinch.d / cam.z, (a.x + b.x) / 2, (a.y + b.y) / 2);
    return;
  }
  if (pan && e.pointerId === pan.id) {
    const dx = e.clientX - pan.x, dy = e.clientY - pan.y;
    if (!dragMoved && Math.hypot(dx, dy) > 5) { dragMoved = true; desk.classList.add('grabbing'); desk.setPointerCapture(e.pointerId); hideHint(); }
    if (dragMoved) { cam.x = pan.cx + dx; cam.y = pan.cy + dy; applyCam(); }
  }
});
function endPointer(e) {
  pointers.delete(e.pointerId);
  if (stroke) { stroke = null; store.set('daga-doodles', strokes); }
  if (pointers.size < 2) pinch = null;
  if (pan && pan.id === e.pointerId) { pan = null; desk.classList.remove('grabbing'); setTimeout(() => (dragMoved = false), 0); }
}
desk.addEventListener('pointerup', endPointer);
desk.addEventListener('pointercancel', endPointer);
desk.addEventListener('wheel', (e) => {
  if (FLOW) return;
  e.preventDefault(); flight++;
  if (e.ctrlKey || e.metaKey) zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX, e.clientY);
  else { cam.x -= e.deltaX; cam.y -= e.deltaY; applyCam(); }
  hideHint();
}, { passive: false });
addEventListener('keydown', (e) => {
  if (FLOW || !$('#sheet-wrap').hidden || document.body.classList.contains('cv-on')) return;
  if (e.target.closest('input, textarea')) return;
  const k = e.key, s = 80;
  if (k === 'ArrowLeft') { cam.x += s; applyCam(); }
  else if (k === 'ArrowRight') { cam.x -= s; applyCam(); }
  else if (k === 'ArrowUp') { cam.y += s; applyCam(); }
  else if (k === 'ArrowDown') { cam.y -= s; applyCam(); }
  else if (k === '+' || k === '=') zoomAt(1.2, innerWidth / 2, innerHeight / 2);
  else if (k === '-') zoomAt(1 / 1.2, innerWidth / 2, innerHeight / 2);
  else if (k === '0') fitAll();
});

function smoothPath(pts) {
  if (pts.length === 1) return `M${pts[0][0]} ${pts[0][1]} l0.1 0`;
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const l = pts[pts.length - 1];
  return d + ` L${l[0].toFixed(1)} ${l[1].toFixed(1)}`;
}
function inkRender(onlyLast) {
  inkLayer.setAttribute('viewBox', '-20000 -20000 40000 40000');
  if (onlyLast && inkLayer.lastElementChild && stroke) { inkLayer.lastElementChild.setAttribute('d', smoothPath(stroke.pts)); return; }
  inkLayer.innerHTML = strokes.map(strokeSvg).join('');
}
function strokeSvg(s) { const [c, w, o] = INK[s.c] || INK.ink; return `<path d="${smoothPath(s.pts)}" stroke="${c}" stroke-width="${w}" opacity="${o}"${s.c === 'lime' ? ' style="mix-blend-mode:var(--tape-blend)"' : ''}/>`; }
function setDoodle(on) {
  doodling = on && !FLOW;
  document.body.classList.toggle('doodling', doodling);
  $('#btn-doodle').setAttribute('aria-pressed', String(doodling));
  $('#palette').hidden = !doodling;
}
$('#btn-doodle').addEventListener('click', () => setDoodle(!doodling));
$('#palette').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.ink) { inkColor = b.dataset.ink; $$('#palette [data-ink]').forEach((x) => x.classList.toggle('on', x === b)); }
  if (b.dataset.act === 'undo') { strokes.pop(); store.set('daga-doodles', strokes); inkRender(); }
  if (b.dataset.act === 'clear') { strokes = []; store.set('daga-doodles', strokes); inkRender(); }
  if (b.dataset.act === 'save') saveForEveryone();
});
$('#btn-fit').addEventListener('click', fitAll);
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  store.set('daga-theme', t);
  readTheme();
  const b = $('#btn-theme'); b.textContent = t === 'dark' ? '☀' : '☾'; b.title = t === 'dark' ? 'Paper (light) version' : 'Dark version';
  const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = t === 'dark' ? '#12110f' : '#14120f';
  [heroAscii, sheetAscii, ...thumbs].forEach((a) => a && a.draw(frameT));
}
$('#btn-theme').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

const hint = $('#hint');
function hideHint() { hint.classList.add('gone'); }
setTimeout(hideHint, 7000);

// ------------------------------------------------------------ detail sheet
const sheetWrap = $('#sheet-wrap'), sheet = $('#sheet');
let sheetAscii = null, lastFocus = null;
function openSheet(p) {
  lastFocus = document.activeElement;
  sheet.innerHTML = `
    <div class="spiral" aria-hidden="true">${spiralStr}</div>
    <button class="close" aria-label="Close">✕</button>
    ${p.video && embedUrl(p.video) ? '' : `<div class="thumb"><canvas aria-hidden="true"></canvas>${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}"${p.pos ? ` style="object-position:${esc(p.pos)}"` : ''}>` : ''}${studioBadge(p)}</div>`}
    ${p.video && embedUrl(p.video) && isIndaga(p) ? `<div class="sheet-studio">${studioBadge(p)}<span>made at Indaga Studios</span></div>` : ''}
    <div class="kind">${esc(p.kind)}${p.year ? ` · ${esc(p.year)}` : ''}</div>
    <h2 id="sheet-title">${esc(p.title)}</h2>
    ${p.video && embedUrl(p.video) ? `<div class="video${p.vertical ? ' vertical' : ''}"><iframe src="${esc(embedUrl(p.video))}" title="${esc(p.title)} video" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>` : ''}
    ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ''}
    <span class="role">${esc(p.role)}</span>
    <p>${esc(p.blurb)}</p>
    ${p.facts ? `<ul>${p.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
    ${p.gallery ? `<div class="gallery">${p.gallery.map((g) => `<a href="${esc(g)}" target="_blank" rel="noopener"><img src="${esc(g)}" alt="${esc(p.title)} screen" loading="lazy"></a>`).join('')}</div>` : ''}
    ${p.links ? `<div class="links">${p.links.map((l) => `<a class="cta dark" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}</div>` : ''}
    ${p.todo ? `<div class="todo">${esc(p.todo)}</div>` : ''}`;
  sheetWrap.hidden = false;
  if (!p.img && $('canvas', sheet)) {
    sheetAscii = makeThumb($('canvas', sheet), p, { font: 9, radius: 70, push: 20 });
    sheetAscii.always = true; requestAnimationFrame(() => { sheetAscii.resize(); animators.add(sheetAscii); });
  }
  $('.close', sheet).addEventListener('click', closeSheet);
  $('.close', sheet).focus();
  history.replaceState(null, '', '#' + p.id);
}
function embedUrl(u) {
  const y = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
  if (y) return `https://www.youtube-nocookie.com/embed/${y[1]}`;
  const v = u.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
  if (v) return `https://player.vimeo.com/video/${v[1]}${v[2] ? `?h=${v[2]}` : ''}`;
  return '';
}
function closeSheet() {
  sheetWrap.hidden = true;
  if (sheetAscii) { animators.delete(sheetAscii); sheetAscii = null; }
  history.replaceState(null, '', location.pathname);
  lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
}
sheetWrap.addEventListener('click', (e) => { if (e.target === sheetWrap) closeSheet(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (!sheetWrap.hidden) closeSheet(); else if (doodling) setDoodle(false); } });

// ------------------------------------------------------------ CV mode
function buildCV() {
  const s = C.site;
  const sel = ['aota', 'behind', 'hd-web', 'appetite', 'cusco', 'mod'].map((id) => C.projects.find((p) => p.id === id)).filter(Boolean);
  $('#cv').innerHTML = `
    <div class="cv-actions"><button class="tool" data-close>← back to the digibook</button><button class="tool tool-cv" data-print>print / save PDF</button></div>
    <header style="margin-top:28px">
      <h1>${esc(s.fullName)} <em>· ${esc(s.name)}</em></h1>
      <div class="cv-role">${esc(s.role)}</div>
      <div class="cv-meta"><span>${esc(s.location)}</span><a href="mailto:${esc(s.email)}">${esc(s.email)}</a>${s.links.map((l) => `<a href="${esc(l.url)}">${esc(l.label)} ${esc(l.handle)}</a>`).join('')}<a href="https://danielagamarra.github.io/">danielagamarra.github.io</a></div>
    </header>
    <h2>Profile</h2><p>${esc(s.about)}</p><p class="hand">${esc(s.tagline)}</p>
    <h2>Selected work</h2>
    ${sel.map((p) => `<div class="row"><div class="when">${esc(p.year || ' ')}</div><div class="what"><b>${esc(p.title)}</b><i>${esc(p.kind)} · ${esc(p.role)}</i><div>${esc(p.blurb)}</div></div></div>`).join('')}
    <h2>Experience</h2>
    ${C.experience.map((x) => `<div class="row"><div class="when">${esc(x.when)}</div><div class="what"><b>${esc(x.role)}</b><i>${esc(x.org)}${x.where ? ` · ${esc(x.where)}` : ''}</i><ul>${x.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul></div></div>`).join('')}
    <h2>Awards</h2>
    ${C.awards.map((a) => `<div class="row"><div class="when">${esc(a.year)}</div><div class="what"><b>${esc(a.title)}</b><i>${esc(a.by)}</i></div></div>`).join('')}
    ${C.talks.some((t) => t.title) ? `<h2>Talks</h2>${C.talks.filter((t) => t.title).map((t) => `<div class="row"><div class="when">${esc(t.year)}</div><div class="what"><b>${esc(t.title)}</b><i>${esc(t.where)}</i></div></div>`).join('')}` : ''}
    <h2>Education</h2>
    ${C.education.map((x) => `<div class="row"><div class="when"></div><div class="what"><b>${esc(x.title)}</b><i>${esc(x.where)}</i></div></div>`).join('')}
    <h2>Skills</h2><div class="chips">${C.skills.map((x) => `<span>${esc(x)}</span>`).join('')}</div>
    <h2>Tools</h2><div class="chips">${C.tools.map((x) => `<span>${esc(x)}</span>`).join('')}</div>
    <h2>Languages</h2><div class="chips">${C.languages.map((x) => `<span>${esc(x)}</span>`).join('')}</div>`;
  $('#cv [data-close]').addEventListener('click', () => setCV(false));
  $('#cv [data-print]').addEventListener('click', () => print());
}
function setCV(on) {
  document.body.classList.toggle('cv-on', on);
  $('#cv').hidden = !on;
  $('#btn-cv').setAttribute('aria-pressed', String(on));
  if (on) { scrollTo(0, 0); history.replaceState(null, '', '#cv'); }
  else { history.replaceState(null, '', location.pathname); requestAnimationFrame(refreshAll); }
}
$('#btn-cv').addEventListener('click', () => setCV(!document.body.classList.contains('cv-on')));
addEventListener('beforeprint', () => { $('#cv').hidden = false; });
addEventListener('afterprint', () => { if (!document.body.classList.contains('cv-on')) $('#cv').hidden = true; });

// ------------------------------------------------------------ links inside the page
document.addEventListener('click', (e) => {
  const go = e.target.closest('[data-go]');
  if (go) { e.preventDefault(); if (document.body.classList.contains('cv-on')) setCV(false); goTo(go.dataset.go); history.replaceState(null, '', go.dataset.go === 'cover' ? location.pathname : '#' + go.dataset.go); return; }
  const cv = e.target.closest('[data-cv]');
  if (cv) { e.preventDefault(); setCV(true); }
});


// ------------------------------------------------------------ pencil sketches over pages + space
// Seeded (same every visit) grey pencil doodles: in the space between
// pages, hanging off page corners, circling page numbers and ringing the
// featured project of each page with a red marker note.
const sketchBg = $('#sketch-bg'), sharedInk = $('#shared-ink'), trailLayer = $('#trail');
const WVB = '-20000 -20000 40000 40000';
[sketchBg, sharedInk, trailLayer].forEach((s) => s.setAttribute('viewBox', WVB));
Object.assign(DOODLES, {
  comet: 'M78 22 C 86 22, 90 28, 90 32 C 90 38, 84 42, 78 42 C 72 42, 68 36, 68 32 C 68 26, 72 22, 78 22 Z M70 40 C 50 56, 30 70, 8 84 M72 30 C 52 40, 34 50, 14 60 M80 44 C 70 62, 56 78, 38 94',
  crosshair: 'M50 8 L50 92 M8 50 L92 50 M36 50 C 36 42, 42 36, 50 36 C 58 36, 64 42, 64 50 C 64 58, 58 64, 50 64 C 42 64, 36 58, 36 50 Z',
  asteroid: 'M30 20 C 50 8, 74 16, 84 34 C 94 54, 86 78, 64 86 C 42 94, 18 82, 14 60 C 10 42, 16 30, 30 20 Z M36 40 C 40 36, 46 38, 46 44 M60 60 C 64 56, 70 60, 68 66 M58 30 l2 2',
});
const allPages = () => [$('#cover'), ...pageEls];
function relBox(node, page) {
  let x = 0, y = 0, n = node;
  while (n && n !== page) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return { x, y, w: node.offsetWidth, h: node.offsetHeight };
}
function sk(name, x, y, w, rot = 0, cls = '') {
  const d = DOODLES[name], s = (w / 100).toFixed(3);
  return `<g class="sk ${cls}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${s}) translate(-50 -50)"><path d="${d}" vector-effect="non-scaling-stroke"/><path class="b" d="${d}" transform="translate(1.4 -1) rotate(1.2 50 50)" vector-effect="non-scaling-stroke"/></g>`;
}
const skText = (t, x, y, rot = -3, cls = '') => `<text class="skt ${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})">${esc(t)}</text>`;
function looseOval(cx, cy, rx, ry, seed) {
  const r = rng(seed), a0 = r() * 6.28, n = 28, pts = [];
  for (let i = 0; i <= n + 5; i++) {
    const a = a0 + (i / n) * Math.PI * 2, k = 1 + (r() - 0.5) * 0.05 + i * 0.0015;
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  return smoothPath(pts);
}
const BG_PICKS = ['planet', 'rocket', 'ufo', 'orbit', 'constellation', 'satellite', 'sparkle', 'star', 'comet', 'crosshair', 'asteroid', 'spiral', 'squiggle', 'eye'];
const BG_NOTES = ['unexplored ✦', 'here be dragons', 'note to self: sleep', 'more pages soon', 'berlin was here', 'sector unmapped', 'x marks nothing', 'ideas go here'];
const FEATURE_NOTES = { aota: 'start here!', 'hd-web': 'I built this', calling: 'watch the trailer!', mod: '100% by hand', indaga: 'my studio' };
function seedSketch() {
  if (FLOW) { sketchBg.innerHTML = ''; $$('.sketch-over').forEach((s) => s.remove()); return; }
  const rects = allPages().map((el) => el._rect);
  const r = rng('sketch'), out = [], spots = [];
  const B = { x: bounds.x - 520, y: bounds.y - 420, w: bounds.w + 1040, h: bounds.h + 840 };
  const clear = (x, y, mx, my) => rects.every((q) => x < q.x - mx || x > q.x + q.w + mx || y < q.y - my || y > q.y + q.h + my);
  let notes = 0;
  for (let i = 0; i < 2000 && spots.length < 52; i++) {
    const x = B.x + r() * B.w, y = B.y + r() * B.h;
    const note = notes < BG_NOTES.length && r() < 0.2;
    const w = 46 + r() * 74;
    if (note ? !clear(x, y, 150, 40) : !clear(x, y, w * 0.6 + 16, w * 0.6 + 16)) continue;
    if (spots.some(([sx, sy]) => Math.hypot(sx - x, sy - y) < 190)) continue;
    spots.push([x, y]);
    if (note) out.push(skText(BG_NOTES[notes++], x, y, (r() - 0.5) * 12));
    else out.push(sk(BG_PICKS[(r() * BG_PICKS.length) | 0], x, y, w, (r() - 0.5) * 50));
  }
  sketchBg.innerHTML = out.join('');

  for (const el of allPages()) {
    let o = el.querySelector(':scope > .sketch-over');
    if (!o) { o = document.createElementNS(NS, 'svg'); o.setAttribute('class', 'sketch-over'); o.setAttribute('aria-hidden', 'true'); el.append(o); }
    const W = el.offsetWidth, H = el.offsetHeight, pr = rng('over-' + el.id);
    o.setAttribute('viewBox', `0 0 ${W} ${H}`);
    let s = '';
    const no = $('.page-no', el);
    if (no && el.id !== 'cover') {
      const b = relBox(no, el);
      s += `<g class="sk"><path d="${looseOval(b.x + b.w / 2, b.y + b.h / 2, b.w / 2 + 14, b.h / 2 + 10, el.id)}" vector-effect="non-scaling-stroke"/></g>`;
    }
    // one doodle hanging off the page edge, half on the paper, half in space
    const right = pr() > 0.5;
    s += sk(BG_PICKS[(pr() * BG_PICKS.length) | 0], right ? W + 6 : -6, right ? H * (0.45 + pr() * 0.4) : H * (0.25 + pr() * 0.5), 80 + pr() * 30, (pr() - 0.5) * 40);
    const f = $('.card.featured', el);
    if (f && FEATURE_NOTES[f.dataset.id]) {
      const b = relBox(f, el), cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      s += `<g class="sk red"><path d="${looseOval(cx, cy, b.w / 2 + 16, b.h / 2 + 12, f.dataset.id)}" vector-effect="non-scaling-stroke"/></g>`;
      s += skText(FEATURE_NOTES[f.dataset.id], b.x + b.w - 30, b.y - 30, -5, 'red big');
      s += sk('arrowDown', b.x + b.w - 70, b.y - 4, 56, -30, 'red');
    }
    o.innerHTML = s;
  }
}

// ------------------------------------------------------------ the drawing hand
// Every time you travel to a page, a hand with a marker draws one line
// from the last title you visited to the new one and underlines it.
const HAND = `<g id="hand" aria-hidden="true"><g transform="translate(-20 -220)">
  <path class="nib" d="M20 220 L30 196 L44 210 Z"/>
  <path class="h" d="M30 196 L130 96 L144 110 L44 210 Z"/><path class="ln" d="M52 174 L66 188"/>
  <path class="h" d="M200 -10 C 170 20, 140 50, 118 76 C 100 96, 80 118, 62 140 C 54 150, 58 162, 70 160 C 84 150, 96 140, 108 132 C 116 140, 118 152, 110 160 C 102 168, 90 172, 80 176 C 70 180, 70 192, 82 192 C 110 186, 150 176, 190 160 C 210 152, 230 150, 260 152 L260 -10 Z"/>
  <path class="ln" d="M64 150 C 68 145, 74 147, 74 152 M120 100 C 127 105, 129 111, 126 118 M112 160 C 120 164, 128 166, 136 166 M128 180 C 134 177, 140 177, 146 179 M214 -10 C 224 40, 238 92, 260 126"/>
</g></g>`;
let trailLast = null, trailRun = 0, hand = null;
function anchorOf(id) {
  const el = document.getElementById(id);
  if (!el || !el._rect) return null;
  const t = id === 'cover' ? $('.ascii-name', el) : $('.page-title', el);
  if (!t) return null;
  const b = relBox(t, el), q = el._rect, w = id === 'cover' ? b.h * 0.86 : b.w;
  return { id, x0: q.x + b.x - 12, x1: q.x + b.x + w + 18, y: q.y + b.y + b.h + (id === 'cover' ? 2 : 12) };
}
function clearTrail() { $$('.trail-seg', trailLayer).forEach((p) => p.remove()); trailLast = null; trailRun++; if (hand) hand.style.opacity = 0; }
function drawTrail(id) {
  if (FLOW || document.body.classList.contains('cv-on')) return;
  const a = anchorOf(id);
  if (!a || (trailLast && trailLast.id === id)) return;
  if (id === 'cover') { trailLast = a; return; } // no line on the cover, the trail just starts there
  if (!hand) { trailLayer.insertAdjacentHTML('beforeend', HAND); hand = $('#hand', trailLayer); }
  const r = rng(id + trailRun), n = Math.max(4, Math.round((a.x1 - a.x0) / 70)), u = [];
  for (let i = 0; i <= n; i++) u.push([a.x0 + ((a.x1 - a.x0) * i) / n, a.y + (r() - 0.5) * 8 - (i === n ? 12 : 0)]);
  let d = smoothPath(u);
  if (trailLast) {
    const s = [trailLast.x1, trailLast.y], e = u[0];
    const dx = e[0] - s[0], dy = e[1] - s[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const k = Math.min(380, L * 0.28) * (trailRun % 2 ? 1 : -1);
    const m = [s[0] + dx / 2 + nx * k * 0.5, s[1] + dy / 2 + ny * k * 0.5];
    d = `M${s[0].toFixed(1)} ${s[1].toFixed(1)} C${(s[0] + dx * 0.1 + nx * k).toFixed(1)} ${(s[1] + dy * 0.1 + ny * k).toFixed(1)} ${(m[0] - dx * 0.2).toFixed(1)} ${(m[1] - dy * 0.2).toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)} S${(e[0] - dx * 0.12 - nx * k * 0.4).toFixed(1)} ${(e[1] - dy * 0.12 - ny * k * 0.4).toFixed(1)} ${e[0].toFixed(1)} ${e[1].toFixed(1)} ` + d.replace(/^M[^QL]*/, '');
  }
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('class', 'trail-seg'); path.setAttribute('d', d);
  const segs = $$('.trail-seg', trailLayer);
  segs.forEach((p) => p.classList.add('old'));
  if (segs.length > 4) segs[0].remove();
  trailLayer.insertBefore(path, hand);
  trailLast = a;
  const run = ++trailRun;
  if (REDUCE) return;
  const L = path.getTotalLength(), t0 = performance.now(), D = Math.min(2300, 700 + L * 0.4);
  path.style.strokeDasharray = L; path.style.strokeDashoffset = L;
  hand.style.opacity = 1;
  const step = (now) => {
    if (run !== trailRun) { path.style.strokeDasharray = 'none'; return; }
    const k = Math.min(1, (now - t0) / D), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    path.style.strokeDashoffset = L * (1 - e);
    const p = path.getPointAtLength(L * e);
    hand.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${(0.72 / cam.z).toFixed(3)})`);
    if (k < 1) requestAnimationFrame(step);
    else { path.style.strokeDasharray = 'none'; setTimeout(() => { if (run === trailRun) hand.style.opacity = 0; }, 500); }
  };
  requestAnimationFrame(step);
}

// ------------------------------------------------------------ shared doodles (author mode)
// assets/doodles.json holds doodles Daga drew herself; every visitor sees
// them. Open the site with ?author to edit them (?author=off to leave).
// Points are stored relative to a page so they stay put when layout moves.
const qs = new URLSearchParams(location.search);
if (qs.has('author')) store.set('daga-author', qs.get('author') !== 'off');
const AUTHOR = store.get('daga-author', false);
let shared = [];
async function loadShared() {
  try { const r = await fetch('assets/doodles.json', { cache: 'no-cache' }); if (r.ok) shared = (await r.json()).strokes || []; } catch {}
}
function toWorld(s) { const el = document.getElementById(s.p), q = el && el._rect; return q ? { c: s.c, pts: s.pts.map(([x, y]) => [x + q.x, y + q.y]) } : null; }
function toRel(s) {
  const [px, py] = s.pts[0];
  let best = null, bd = Infinity;
  for (const el of allPages()) {
    const q = el._rect, d = Math.hypot(Math.max(q.x - px, 0, px - q.x - q.w), Math.max(q.y - py, 0, py - q.y - q.h));
    if (d < bd) { bd = d; best = el; }
  }
  const q = best._rect;
  return { c: s.c, p: best.id, pts: s.pts.map(([x, y]) => [Math.round((x - q.x) * 10) / 10, Math.round((y - q.y) * 10) / 10]) };
}
function sharedRender() { sharedInk.innerHTML = AUTHOR ? '' : shared.map(toWorld).filter(Boolean).map(strokeSvg).join(''); }
async function saveForEveryone() {
  const data = JSON.stringify({ v: 1, note: 'Doodles Daga drew in author mode (open the site with ?author). Points are relative to page "p".', strokes: strokes.filter((s) => s.pts.length).map(toRel) }) + '\n';
  const hint = $('#palette .palette-hint');
  try {
    if (window.showSaveFilePicker) {
      const h = await showSaveFilePicker({ suggestedName: 'doodles.json', types: [{ description: 'Doodles', accept: { 'application/json': ['.json'] } }] });
      const w = await h.createWritable(); await w.write(data); await w.close();
      hint.textContent = 'saved ✓ put it in assets/ and push (or ask Claude)';
      return;
    }
  } catch (e) { if (e.name === 'AbortError') return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' })); a.download = 'doodles.json'; a.click();
  hint.textContent = 'downloaded ✓ put doodles.json in assets/ and push';
}

// ------------------------------------------------------------ boot
async function boot() {
  try {
    await Promise.all([
      document.fonts.load('400 30px "Instrument Serif"'),
      document.fonts.load('800 40px "JetBrains Mono"'),
      document.fonts.load('700 11px "JetBrains Mono"'),
      document.fonts.load('700 20px "Caveat"'),
    ]);
  } catch {}
  try { await LOGO.decode(); } catch {}
  document.body.classList.toggle('flow', FLOW);
  readTheme();
  buildTabs();
  world.appendChild(buildCover());
  for (const p of C.pages) { const el = buildPage(p); pageEls.push(el); world.appendChild(el); }
  [$('#cover'), ...pageEls].forEach((el) => flowObserver.observe(el));
  buildCV();
  await loadShared();
  refreshAll();
  if (AUTHOR) {
    document.body.classList.add('author');
    $('#palette [data-act="save"]').hidden = false;
    $('#palette .palette-hint').textContent = 'author mode · save + push = live for everyone';
    if (!strokes.length && shared.length) { strokes = shared.map(toWorld).filter(Boolean); inkRender(); }
  }
  setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  animators.add(heroAscii);
  const h = location.hash.slice(1);
  const proj = C.projects.find((p) => p.id === h);
  if (h === 'cv') { goTo('cover', false); setCV(true); }
  else if (proj) { goTo(proj.page, false); openSheet(proj); }
  else if (h && document.getElementById(h)) goTo(h, false);
  else goTo('cover', false);
  if (!FLOW && !h) { // start a bit zoomed out, then settle on the cover
    const t = { ...cam }; const z0 = t.z * 0.82;
    cam.z = z0; cam.x = innerWidth / 2 - ((innerWidth / 2 - t.x) / t.z) * z0; cam.y = innerHeight / 2 - ((innerHeight / 2 - t.y) / t.z) * z0; applyCam();
    setTimeout(() => flyTo(t, 1200), 150);
  }
  if (!FLOW) setTimeout(() => drawTrail(proj ? proj.page : (h && document.getElementById(h) ? h : 'cover')), h ? 300 : 1300);
  if (FLOW) hideHint();
  addEventListener('hashchange', () => {
    const k = location.hash.slice(1), pr = C.projects.find((p) => p.id === k);
    if (k === 'cv') setCV(true);
    else if (pr) { goTo(pr.page); openSheet(pr); }
    else if (k && document.getElementById(k)) goTo(k);
  });
  let rt = 0;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { refreshAll(); drawTrail(activeId); }, 160); });
  mqFlow.addEventListener('change', () => {
    FLOW = mqFlow.matches; document.body.classList.toggle('flow', FLOW);
    if (FLOW) setDoodle(false);
    flow.cache = {}; flow.pos = null;
    refreshAll(); if (!FLOW) goTo('cover', false);
  });
}
boot();
