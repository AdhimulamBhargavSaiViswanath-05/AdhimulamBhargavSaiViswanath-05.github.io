<<<<<<< HEAD
// Loader

window.addEventListener("load",()=>{

    setTimeout(()=>{

        document.getElementById("loader")
        .style.display="none";

    },1500);

});

// Typing Effect

const typingText =
document.querySelector(".typing-text");

const words = [

    "Aspiring AI Engineer",
    "Machine Learning Developer",
    "NLP Enthusiast",
    "Cloud Learner",
    "Frontend Designer"

];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

    const currentWord =
    words[wordIndex];

    if(!isDeleting){

        typingText.textContent =
        currentWord.substring(0,charIndex++);

    }else{

        typingText.textContent =
        currentWord.substring(0,charIndex--);

    }

    let speed =
    isDeleting ? 50 : 100;

    if(charIndex ===
       currentWord.length + 1){

        isDeleting = true;
        speed = 1200;

    }
=======
'use strict';

/* ═══════════════════════════════════════════════════════════════
   NEURAL NETWORK CANVAS BACKGROUND
   ═══════════════════════════════════════════════════════════════ */
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ACCENT   = [159, 224, 154];
  const ACCENT_T = [104, 200, 180];
  const NODE_COLOR = [78, 95, 68];
>>>>>>> e105486df4c77b7fe765febd854b53e615107e89

    if(charIndex === 0){

<<<<<<< HEAD
        isDeleting = false;

        wordIndex =
        (wordIndex + 1)
        % words.length;

    }

    setTimeout(typeEffect,speed);

}

typeEffect();

// Theme Toggle

const toggleBtn =
document.getElementById("theme-toggle");

// Theme Toggle Logic Updated
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    
    // Update theme toggle icon
    const icon = toggleBtn.querySelector("i");
    icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
});

// Load Theme

if(localStorage.getItem("theme")
=== "light"){

    document.body.classList.add(
    "light-theme");

}

// Scroll Reveal

const reveals =
document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

    reveals.forEach((element)=>{

        const windowHeight =
        window.innerHeight;

        const revealTop =
        element.getBoundingClientRect().top;

        if(revealTop < windowHeight - 100){

            element.classList.add("active");

        }

    });

});

// Scroll Progress

window.addEventListener("scroll",()=>{

    const scrollTop =
    document.documentElement.scrollTop;

    const scrollHeight =
    document.documentElement.scrollHeight
    -
    document.documentElement.clientHeight;

    const progress =
    (scrollTop / scrollHeight) * 100;

    document.getElementById(
    "progress-bar").style.width =
    progress + "%";

});

// Cursor Glow & Mouse Interactions
const cards = document.querySelectorAll(".skill-card, .project-card, .stat-card, .quote-card");

document.addEventListener("mousemove", (e) => {
    // 3D Tilt Effect
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            card.style.transform = `perspective(1000px) scale(1) rotateX(0) rotateY(0)`;
        }
    });
=======
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    nodes.forEach(n => {
      const dist = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
      if (dist < 30) draggedNode = n;
    });
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseInteraction.x = e.clientX - rect.left;
    mouseInteraction.y = e.clientY - rect.top;
    mouseInteraction.active = true;
    if (draggedNode) {
      draggedNode.x = mouseInteraction.x;
      draggedNode.y = mouseInteraction.y;
    }
  });

  window.addEventListener('mouseup', () => { draggedNode = null; });

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildGraph();
  }

  function buildGraph() {
    const count = Math.min(Math.floor((W * H) / 22000), 72);
    nodes = [];
    edges = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1.5 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        colorIdx: Math.random() < 0.15 ? 1 : 0,
      });
    }
    const MAX_DIST = Math.min(W, H) * 0.22;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) edges.push({ a: i, b: j, maxDist: MAX_DIST });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const grd = ctx.createRadialGradient(W * 0.18, H * 0.28, 0, W * 0.18, H * 0.28, W * 0.55);
    grd.addColorStop(0, 'rgba(50,90,50,0.06)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    nodes.forEach(n => {
      if (n !== draggedNode) {
        n.x += n.vx;
        n.y += n.vy;
        if (mouseInteraction.active) {
          const dx = mouseInteraction.x - n.x;
          const dy = mouseInteraction.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) { n.x += dx * 0.01; n.y += dy * 0.01; }
        }
      }
      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;
      n.pulse += n.pulseSpeed;
    });

    const MAX_DIST = Math.min(W, H) * 0.22;
    edges.forEach(e => {
      const a = nodes[e.a], b = nodes[e.b];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > MAX_DIST) return;
      const alpha = (1 - dist / MAX_DIST) * 0.18;
      const phaseDiff = Math.abs(Math.sin(a.pulse - b.pulse));
      const boost = phaseDiff > 0.85 ? 0.25 : 0;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      const [r, g, bl] = a.colorIdx === 1 ? ACCENT_T : ACCENT;
      ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha + boost})`;
      ctx.lineWidth = boost > 0 ? 1.2 : 0.6;
      ctx.stroke();
    });

    nodes.forEach(n => {
      const glow = 0.5 + 0.5 * Math.sin(n.pulse);
      const [r, g, b] = n.colorIdx === 1 ? ACCENT_T : NODE_COLOR;
      const alpha = 0.3 + glow * 0.4;
      if (n.colorIdx === 1) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.04)`;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  if (prefersReduced) { draw(); return; }

  raf = requestAnimationFrame(draw);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);
  });
})();


/* ═══════════════════════════════════════════════════════════════
   MOBILE DRAWER
   ═══════════════════════════════════════════════════════════════ */
const menuToggle = document.getElementById('menu-toggle');
const navDrawer  = document.getElementById('nav-drawer');
const overlay    = document.getElementById('drawer-overlay');

function openDrawer() {
  navDrawer.classList.add('is-open');
  navDrawer.setAttribute('aria-hidden', 'false');
  overlay.classList.add('is-active');
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const [b1, b2] = menuToggle.querySelectorAll('.bar');
  b1.style.transform = 'rotate(45deg) translate(3.5px, 3.5px)';
  b2.style.transform = 'rotate(-45deg) translate(3.5px, -3.5px)';
}

function closeDrawer() {
  navDrawer.classList.remove('is-open');
  navDrawer.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('is-active');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  const [b1, b2] = menuToggle.querySelectorAll('.bar');
  b1.style.transform = b2.style.transform = '';
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navDrawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });
  overlay.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) closeDrawer();
  });
}


/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ═══════════════════════════════════════════════════════════════
   ACTIVE NAV + SCROLL HEADER
   ═══════════════════════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.site-nav a');
const header    = document.querySelector('.site-header');

function updateNav() {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (y >= top && y < top + sec.offsetHeight) {
      const id = sec.getAttribute('id');
      navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
    }
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();


/* ═══════════════════════════════════════════════════════════════
   SMOOTH SCROLL (with fixed header offset)
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
>>>>>>> e105486df4c77b7fe765febd854b53e615107e89
});

// ML Data Stream Effect
const dataStream = document.getElementById("data-stream");
const cols = Math.floor(window.innerWidth / 50);

<<<<<<< HEAD
for(let i=0; i<cols; i++) {
    const col = document.createElement("div");
    col.className = "data-column";
    col.style.left = (i * 50) + "px";
    col.style.animationDelay = (Math.random() * 10) + "s";
    col.style.animationDuration = (5 + Math.random() * 10) + "s";
    
    let binary = "";
    for(let j=0; j<50; j++) {
        binary += Math.round(Math.random()) + "<br>";
    }
    col.innerHTML = binary;
    dataStream.appendChild(col);
}

// Neural Dots Background
const canvasContainer = document.getElementById("neural-canvas");
const dotsCount = 100; // Increased count
const dots = [];
const googleColors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];

for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    const color = googleColors[Math.floor(Math.random() * googleColors.length)];
    dot.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        opacity: ${0.6 + Math.random() * 0.4};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 8px ${color};
    `;
    
    const speedX = (Math.random() - 0.5) * 0.8;
    const speedY = (Math.random() - 0.5) * 0.8;
    
    dots.push({ element: dot, x: Math.random() * 100, y: Math.random() * 100, vx: speedX, vy: speedY });
    canvasContainer.appendChild(dot);
}

function animateDots() {
    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        if (dot.x < 0 || dot.x > 100) dot.vx *= -1;
        if (dot.y < 0 || dot.y > 100) dot.vy *= -1;
        
        dot.element.style.left = dot.x + "%";
        dot.element.style.top = dot.y + "%";
    });
    requestAnimationFrame(animateDots);
}
animateDots();

// Resume Preview Modal Logic
const resumeModal = document.getElementById("resume-modal");
const viewResumeBtn = document.getElementById("view-resume-btn");
const closeModal = document.getElementById("close-modal");
const printResume = document.getElementById("print-resume");
const resumeIframe = document.getElementById("resume-iframe");

if (viewResumeBtn) {
    viewResumeBtn.addEventListener("click", () => {
        resumeModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    });
}

if (closeModal) {
    closeModal.addEventListener("click", () => {
        resumeModal.classList.remove("active");
        document.body.style.overflow = "auto";
    });
}

// Close on outside click
resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

if (printResume) {
    printResume.addEventListener("click", () => {
        resumeIframe.contentWindow.focus();
        resumeIframe.contentWindow.print();
    });
}
=======
/* ═══════════════════════════════════════════════════════════════
   TERMINAL TYPEWRITER
   ═══════════════════════════════════════════════════════════════ */
(function initTerminal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const extraLines = [
    ['$ python lipisathi.py --lang te,hi,ta',   '# Transliterated 284 signs · accuracy 96.2% ✓'],
    ['$ git push origin feature/csp-solver',   '# Branch updated · 3 files changed ✓'],
    ['$ jupyter nbconvert --execute eda.ipynb','# Notebook executed · 12 cells, 0 errors ✓'],
  ];

  const body = document.getElementById('terminal-body');
  if (!body) return;

  let idx = 0;

  function addLines() {
    const pair = extraLines[idx % extraLines.length];
    idx++;

    const lines = body.querySelectorAll('.terminal-line:not(:last-child)');
    if (lines.length >= 8) {
      lines[0].remove();
      lines[1] && lines[1].remove();
    }

    const cursor = body.querySelector('.terminal-line:last-child');

    [pair[0], pair[1]].forEach((text, i) => {
      const p = document.createElement('p');
      p.className = 'terminal-line' + (i === 1 ? ' t-comment' : '');
      if (i === 0) {
        p.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd">${text.slice(2)}</span>`;
      } else {
        p.textContent = text;
      }
      p.style.opacity = '0';
      p.style.transition = 'opacity 0.4s';
      body.insertBefore(p, cursor);
      requestAnimationFrame(() => requestAnimationFrame(() => { p.style.opacity = '1'; }));
    });
  }

  setInterval(addLines, 4200);
})();


/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER ROLE EFFECT
   ═══════════════════════════════════════════════════════════════ */
(function initTypewriter() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const el = document.getElementById('typed-role');
    if (el) el.textContent = 'AI & ML Engineer';
    return;
  }

  const roles = [
    'AI & ML Engineer',
    'Deep Learning Enthusiast',
    'NLP & Computer Vision Dev',
    'SIH 2024 National Finalist',
    'B.Tech CSE @ VVIT',
  ];

  const el = document.getElementById('typed-role');
  if (!el) return;

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause = 0;

  function tick() {
    const current = roles[roleIdx];

    if (pause > 0) { pause--; setTimeout(tick, 80); return; }

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; pause = 22; }
      setTimeout(tick, 65);
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        pause = 4;
      }
      setTimeout(tick, 38);
    }
  }

  setTimeout(tick, 900);
})();


/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE  (data-theme attribute on <html>)
   ═══════════════════════════════════════════════════════════════ */
(function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();


/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR FOLLOWER
   ═══════════════════════════════════════════════════════════════ */
const follower = document.querySelector('.cursor-follower');
if (follower) {
  document.addEventListener('mousemove', (e) => {
    follower.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
  });
}


/* ═══════════════════════════════════════════════════════════════
   PARALLAX MOUSE (brain watermark only – subtle)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth  / 2) * 0.008;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.008;
  const brain = document.querySelector('.brain-watermark-wrap');
  if (brain) brain.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
});
>>>>>>> e105486df4c77b7fe765febd854b53e615107e89
