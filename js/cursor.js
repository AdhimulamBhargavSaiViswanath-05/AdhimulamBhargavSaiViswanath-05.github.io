window.ABSV = window.ABSV || {};
window.ABSV.cursor = {
  init() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = document.getElementById('cursor-dot');
    if (!dot) return;
    document.addEventListener('mousemove', (e) => {
      dot.style.transform = `translate(${e.clientX - 7}px, ${e.clientY - 7}px)`;
    });
  }
};
