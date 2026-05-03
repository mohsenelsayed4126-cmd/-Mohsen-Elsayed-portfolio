/* ── CURSOR + TRAIL ── */
const isFine = window.matchMedia('(pointer:fine)').matches;
const cd = document.getElementById('cd'), cr = document.getElementById('cr');
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
const TRAIL = 14, trails = [];

if (isFine) {
  for (let i = 0; i < TRAIL; i++) {
    const d = document.createElement('div');
    d.className = 'td';
    const s = Math.max(1.5, 4 - i * 0.18);
    d.style.cssText = `width:${s}px;height:${s}px;background:var(--g);opacity:${(1 - i / TRAIL) * 0.35};z-index:${9994 - i}`;
    document.body.appendChild(d);
    trails.push({ el: d, x: mx, y: my });
  }
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cd.style.left = mx + 'px'; cd.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * .11; ry += (my - ry) * .11;
    cr.style.left = rx + 'px'; cr.style.top = ry + 'px';
    for (let i = trails.length - 1; i > 0; i--) {
      trails[i].x += (trails[i - 1].x - trails[i].x) * .38;
      trails[i].y += (trails[i - 1].y - trails[i].y) * .38;
      trails[i].el.style.left = trails[i].x + 'px';
      trails[i].el.style.top = trails[i].y + 'px';
    }
    trails[0].x = mx; trails[0].y = my;
    trails[0].el.style.left = mx + 'px'; trails[0].el.style.top = my + 'px';
    requestAnimationFrame(loop);
  })();
}

/* ── SIDEBAR ── */
const ham = document.getElementById('ham');
const sb  = document.getElementById('sidebar');
const nov = document.getElementById('nov');

function openSB()  { sb.classList.add('open');    nov.classList.add('active');    ham.classList.add('open'); }
function closeSB() { sb.classList.remove('open'); nov.classList.remove('active'); ham.classList.remove('open'); }

/* unified handler works on both mouse and touch */
function handleHam(e) {
  e.preventDefault();
  e.stopPropagation();
  sb.classList.contains('open') ? closeSB() : openSB();
}

ham.addEventListener('click',      handleHam, { passive: false });
ham.addEventListener('touchstart', handleHam, { passive: false });

nov.addEventListener('click',      closeSB);
nov.addEventListener('touchstart', function(e){ e.preventDefault(); closeSB(); }, { passive: false });

document.querySelectorAll('.nl a').forEach(a => {
  function handleNavLink(e) {
    if (innerWidth <= 920) {
      e.preventDefault();
      const href = a.getAttribute('href');
      closeSB();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 320);
    }
  }
  a.addEventListener('click',      handleNavLink);
  a.addEventListener('touchstart', function(e){ e.stopPropagation(); }, { passive: true });
});

/* ── THEME ── */
const html = document.documentElement;
const ttog = document.getElementById('ttog');

function handleTheme(e) {
  e.preventDefault();
  const d = html.dataset.theme === 'dark';
  html.dataset.theme = d ? 'light' : 'dark';
  document.getElementById('ticon').textContent  = d ? '☀️' : '🌙';
  document.getElementById('tlabel').textContent = d ? 'Light' : 'Dark';
}
ttog.addEventListener('click',      handleTheme);
ttog.addEventListener('touchstart', handleTheme, { passive: false });

/* ── TYPING ── */
const phrases = ['Data Analyst', 'Power BI Developer', 'SQL Specialist', 'Python Automator', 'BI Storyteller'];
let pi = 0, ci = 0, del = false, t = '';
const tel = document.getElementById('typed');
function type() {
  const w = phrases[pi];
  del ? (t = w.slice(0, --ci)) : (t = w.slice(0, ++ci));
  tel.textContent = t;
  if (!del && ci === w.length) { del = true; setTimeout(type, 2000); return; }
  if (del && ci === 0)         { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, del ? 42 : 80);
}
type();

/* ── REVEAL ── */
const allRv = document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s,.stg');
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); rvObs.unobserve(e.target); } });
}, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
allRv.forEach(el => rvObs.observe(el));

/* ── SKILL BARS ── */
const fills = document.querySelectorAll('.sk-fill');
let ba = false;
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !ba) {
      ba = true;
      fills.forEach(b => {
        b.style.width = '0';
        requestAnimationFrame(() => requestAnimationFrame(() => { b.style.width = b.dataset.width; }));
      });
    }
  });
}, { threshold: .15 }).observe(document.getElementById('skills'));

/* ── COUNTER ── */
function countUp(el, target) {
  let c = 0;
  const step = Math.ceil(target / 40);
  const iv = setInterval(() => {
    c += step;
    if (c >= target) { c = target; clearInterval(iv); }
    el.textContent = c + '+';
  }, 40);
}
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => countUp(el, +el.dataset.count));
      rvObs.unobserve(e.target);
    }
  });
}, { threshold: .25 }).observe(document.querySelector('.hero'));

/* ── ACTIVE NAV ── */
const secs = document.querySelectorAll('section[id]');
const nls  = document.querySelectorAll('.nl a');

function setActive(id) {
  nls.forEach(a => a.classList.remove('active'));
  const a = document.querySelector(`.nl a[href="#${id}"]`);
  if (a) a.classList.add('active');
}

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { threshold: .3, rootMargin: '-60px 0px -38% 0px' });

secs.forEach(s => navObs.observe(s));

/* ── BUTTONS ── */
function handleHire(e) {
  e.preventDefault();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  if (innerWidth <= 920) closeSB();
}
function handleViewProj(e) {
  e.preventDefault();
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

const hireBtn = document.getElementById('hireBtn');
const vProj   = document.getElementById('vProj');

hireBtn.addEventListener('click',      handleHire);
hireBtn.addEventListener('touchstart', handleHire, { passive: false });

vProj.addEventListener('click',      handleViewProj);
vProj.addEventListener('touchstart', handleViewProj, { passive: false });

/* ── PARTICLES (desktop only) ── */
function spawnP() {
  const p = document.createElement('div');
  p.className = 'ptc';
  const s    = Math.random() * 2.5 + .8;
  const cols = ['rgba(59,130,246,.6)', 'rgba(96,165,250,.5)', 'rgba(147,197,253,.4)', 'rgba(29,78,216,.5)'];
  const c    = cols[Math.floor(Math.random() * cols.length)];
  const dur  = Math.random() * 14 + 8;
  p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}vw;bottom:-10px;background:${c};animation-duration:${dur}s;animation-delay:${Math.random()*4}s;box-shadow:0 0 ${s*3}px ${c}`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), (dur + 4) * 1000);
}
if (!('ontouchstart' in window)) {
  setInterval(spawnP, 1100);
  for (let i = 0; i < 8; i++) setTimeout(spawnP, i * 250);
}

/* ── FORM ── */
document.getElementById('cform').addEventListener('submit', function () {
  const b = this.querySelector('.sub-btn'), o = b.textContent;
  b.textContent = 'SENDING…';
  b.disabled = true;
  setTimeout(() => { b.textContent = o; b.disabled = false; }, 3000);
});
