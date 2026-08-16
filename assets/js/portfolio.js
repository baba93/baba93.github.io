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

  // — visionneuse de certificats —
  // Chaque lien vers certificats/*.jpg s'ouvre dans la visionneuse plutôt que
  // dans un onglet : pas de téléchargement direct, pas de barre d'outils PDF.
  var viewer = document.getElementById('viewer');
  var viewerImg = document.getElementById('viewer-img');
  var viewerTitle = document.getElementById('viewer-title');
  var lastFocused = null;

  function openViewer(src, title) {
    viewerImg.src = src;
    viewerImg.alt = title;
    viewerTitle.textContent = title;
    viewer.hidden = false;
    document.body.classList.add('viewer-open');
    viewer.querySelector('[data-viewer-close]').focus();
  }

  function closeViewer() {
    viewer.hidden = true;
    viewerImg.removeAttribute('src');
    document.body.classList.remove('viewer-open');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('a[href^="certificats/"]').forEach(function (link) {
    link.addEventListener('click', function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
      ev.preventDefault();
      lastFocused = link;
      // textContent concatènerait les deux langues : on lit le titre explicite.
      openViewer(link.getAttribute('href'), link.getAttribute('data-cert-title') || '');
    });
  });

  viewer.addEventListener('click', function (ev) {
    if (ev.target === viewer || ev.target.hasAttribute('data-viewer-close')) closeViewer();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && !viewer.hidden) closeViewer();
  });
  viewer.addEventListener('contextmenu', function (ev) { ev.preventDefault(); });
  viewer.addEventListener('dragstart', function (ev) { ev.preventDefault(); });

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
