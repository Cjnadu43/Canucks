document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  if (!navToggle) return;

  navToggle.addEventListener('click', () => {
    const nav = navToggle.closest('nav');
    if (!nav) return;
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('nav-open');
  });
});
