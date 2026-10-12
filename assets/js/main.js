(function () {
  'use strict';

  // (0) Hero intro: CSS holds start states until .is-ready. Reading offsetWidth first forces a style pass
  // so the start state is committed and the class change actually transitions.
  var root = document.documentElement;
  void root.offsetWidth;
  root.classList.add('is-ready');

  // (0b) Nav shrink
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      root.style.setProperty('--sy', window.scrollY); // hero glow drift (CSS multiplies)
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // (a) Nav toggle
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    var setOpen = function (open) { toggle.setAttribute('aria-expanded', String(open)); };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // (b) Contact assembly (addresses never appear in the HTML source)
  // Contact parts are stored reversed with letters rotated by 7 and digits by 4
  var rev = function (s) {
    return s.split('').reverse().map(function (ch) {
      var c = ch.charCodeAt(0);
      if (c >= 97 && c <= 122) return String.fromCharCode((c - 97 + 19) % 26 + 97);
      if (c >= 48 && c <= 57) return String.fromCharCode((c - 48 + 6) % 10 + 48);
      return ch;
    }).join('');
  };
  document.querySelectorAll('a.mail[data-user][data-domain]').forEach(function (a) {
    var user = rev(a.dataset.user), domain = rev(a.dataset.domain);
    a.href = 'mailto:' + user + '@' + domain;
    var span = document.createElement('span'); // one flex item, so no gap splits the address
    span.append(user, document.createElement('wbr'), '@' + domain);
    a.append(span);
  });
  document.querySelectorAll('a.tel[data-tel]').forEach(function (a) {
    var tel = rev(a.dataset.tel); // e.g. +4915226230471 -> +49 (0) 152 2623 0471
    a.href = 'tel:' + tel;
    a.append('+49 (0) ' + tel.slice(3).replace(/^(\d{3})(\d{4})(\d+)$/, '$1 $2 $3'));
  });

  // (c) Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  // (d) Radar: hovering an axis highlights it and names the skill in the centre
  var radar = document.querySelector('.radar svg');
  if (radar) {
    var focus = radar.querySelector('.radar__focus');
    var parts = function (i) { return radar.querySelectorAll('[data-i="' + i + '"]:not(.radar__hit)'); };
    var clear = function () {
      radar.querySelectorAll('.is-active').forEach(function (el) { el.classList.remove('is-active'); });
      radar.classList.remove('has-active');
      focus.textContent = '';
    };
    radar.addEventListener('pointerover', function (e) {
      var hit = e.target.closest('.radar__hit');
      if (!hit) return;
      clear();
      parts(hit.dataset.i).forEach(function (el) { el.classList.add('is-active'); });
      radar.classList.add('has-active');
      focus.textContent = hit.dataset.label;
    });
    radar.addEventListener('pointerleave', clear);
  }
})();
