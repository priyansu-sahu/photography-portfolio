/* ============================================================
   Photography Portfolio — App JS
   ============================================================ */

// --- Theme Toggle ---
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;

  // Priority: 1) saved preference, 2) system preference
  let saved; try { saved = localStorage.getItem('theme'); } catch(e) {}
  let theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  toggle && toggle.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch(e) {}
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    updateToggleIcon();
  });

  function updateToggleIcon() {
    if (!toggle) return;
    if (theme === 'dark') {
      toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    } else {
      toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }
})();

// --- Lightbox ---
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = item.querySelector('img');
      if (!img) return; // No image to show if placeholder
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Photograph';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
})();

// --- Smooth scroll for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
