/* Comportements de la page — repris de la logique <script type="text/x-dc"> de la maquette :
   bascule FR/EN et apparition des sections au scroll. */
(function () {
  'use strict';

  var page = document.querySelector('[data-lg]');
  var langButtons = document.querySelectorAll('[data-set-lang]');

  function setLang(lang) {
    page.setAttribute('data-lg', lang);
    document.documentElement.setAttribute('lang', lang);
    langButtons.forEach(function (btn) {
      var active = btn.getAttribute('data-set-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-set-lang'));
    });
  });

  var nodes = document.querySelectorAll('[data-reveal]');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    nodes.forEach(function (n) { n.setAttribute('data-reveal', 'in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.setAttribute('data-reveal', 'in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

  nodes.forEach(function (n) { io.observe(n); });
})();
