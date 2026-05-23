window.ABSV = window.ABSV || {};
window.ABSV.nav = {
  init() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const themeBtn = document.getElementById('theme-toggle');

    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });

      links.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => links.classList.remove('open'));
      });
    }

    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      if (!themeBtn) return;
      const icon = themeBtn.querySelector('i');
      if (icon) icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    };

    const saved = localStorage.getItem('theme') || 'dark';
    applyTheme(saved);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
      });
    }
  }
};
