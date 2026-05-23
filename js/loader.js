window.ABSV = window.ABSV || {};
window.ABSV.loader = {
  init() {
    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      if (!loader) return;
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => loader.remove(), 250);
      }, 500);
    });
  }
};
