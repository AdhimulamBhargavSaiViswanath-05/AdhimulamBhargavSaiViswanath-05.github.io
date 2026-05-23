window.ABSV = window.ABSV || {};
window.ABSV.hero = {
  init() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    const roles = [
      'Aspiring AI Engineer',
      'Machine Learning Developer',
      'NLP Enthusiast',
      'Cloud Learner',
      'Frontend Designer'
    ];

    let role = 0;
    let i = 0;
    let deleting = false;

    const tick = () => {
      const word = roles[role];
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);

      if (!deleting && i === word.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }

      if (deleting && i === 0) {
        deleting = false;
        role = (role + 1) % roles.length;
      }

      setTimeout(tick, deleting ? 45 : 85);
    };

    tick();
  }
};
