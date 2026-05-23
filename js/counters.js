window.ABSV = window.ABSV || {};
window.ABSV.counters = {
  init() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const animate = (el) => {
      const target = Number(el.dataset.target || 0);
      const isFloat = String(el.dataset.target).includes('.');
      const duration = 900;
      const start = performance.now();

      const frame = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const value = target * progress;
        el.textContent = isFloat ? value.toFixed(2) : Math.floor(value).toString();
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => io.observe(counter));
  }
};
