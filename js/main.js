document.addEventListener('DOMContentLoaded', () => {
  const modules = ['loader', 'nav', 'hero', 'canvas', 'skills', 'projects', 'timeline', 'counters', 'cursor', 'scroll'];
  modules.forEach((name) => {
    const mod = window.ABSV && window.ABSV[name];
    if (mod && typeof mod.init === 'function') mod.init();
  });

  const copyEmail = document.getElementById('copy-email');
  const status = document.getElementById('copy-status');
  if (copyEmail && status) {
    copyEmail.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('bhargavsaiadhimulam12@gmail.com');
        status.textContent = 'Email copied.';
      } catch (error) {
        status.textContent = 'Copy failed. Please copy manually.';
      }
    });
  }
});
