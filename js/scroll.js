window.ABSV = window.ABSV || {};
window.ABSV.scroll = {
  init() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');

    const update = () => {
      const scrollY = window.scrollY;
      const full = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar) progressBar.style.width = `${(scrollY / Math.max(1, full)) * 100}%`;

      let active = '';
      sections.forEach((section) => {
        if (scrollY >= section.offsetTop - 180) active = section.id;
      });
      links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${active}`);
      });
    };

    const revealEls = document.querySelectorAll('section, .glass-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }
};
