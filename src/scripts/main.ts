// Spam-Schutz: Kontaktdaten stehen umgekehrt mit verschobenen Zeichen in data-Attributen.
function decode(s: string): string {
  return [...s].reverse().map((c) => {
    if (c >= 'a' && c <= 'z') return String.fromCharCode(((c.charCodeAt(0) - 97 - 7 + 26) % 26) + 97);
    if (c >= '0' && c <= '9') return String.fromCharCode(((c.charCodeAt(0) - 48 - 4 + 10) % 10) + 48);
    return c;
  }).join('');
}
document.querySelectorAll<HTMLElement>('[data-user][data-domain]').forEach((el) => {
  const addr = `${decode(el.dataset.user!)}@${decode(el.dataset.domain!)}`;
  if (el.querySelector('svg')) el.title = addr; else el.textContent = addr;
  if (el instanceof HTMLAnchorElement) el.href = `mailto:${addr}`;
});
document.querySelectorAll<HTMLElement>('[data-tel]').forEach((el) => {
  const tel = decode(el.dataset.tel!);
  if (el.querySelector('svg')) el.title = tel; else el.textContent = tel;
  if (el instanceof HTMLAnchorElement) el.href = `tel:${tel.replace(/[^+\d]/g, '')}`;
});

// Einblenden beim Scrollen, einmalig.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const els = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) els.forEach((e) => e.classList.add('in'));
else {
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }, { rootMargin: '0px 0px -10% 0px' });
  els.forEach((e) => io.observe(e));
}

// Navigation auf dem Handy
const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
const menu = document.getElementById('nav-menu');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu?.classList.toggle('open', !open);
});

// Regler-Panel, nur lokal mit ?tweak in der Adresse (tweak/server.py liefert die Datei).
if (/[?&]tweak\b/.test(location.search)) { const t = document.createElement('script'); t.src = '/tweak/tweak.js'; document.head.appendChild(t); }
