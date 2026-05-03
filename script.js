(function() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let columns, drops;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / 18);
    drops = Array(columns).fill(0).map(() => Math.random() * height);
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = ctx.createLinearGradient(0, 0, width, height);
    ctx.fillStyle.addColorStop?.(0, '#bff');
    ctx.fillStyle.addColorStop?.(0.5, '#6ef');
    ctx.fillStyle.addColorStop?.(1, '#0f0');
    ctx.font = 'bold 18px JetBrains Mono, monospace';
    for (let i = 0; i < columns; i++) {
      const text = Math.random() > 0.5 ? '0' : '1';
      const x = i * 18;
      const y = drops[i];
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.fillText(text, x, y);
      ctx.shadowBlur = 0;
      // Slower speed for subtle effect
      drops[i] += 7 + Math.random() * 2.5;
      if (drops[i] > height + 40 || Math.random() > 0.992) {
        drops[i] = Math.random() * -100;
      }
    }
    ctx.restore();
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();
})();
'use strict';

/* ═══════════════════════════════════════════════════════════════
   NEURAL NETWORK CANVAS BACKGROUND
   Replaces the static BackgroundWallpaper.png entirely.
   Draws animated nodes + edges that pulse like a neural net,
   matching the AI/ML theme — far more professional than clipart.
   ═══════════════════════════════════════════════════════════════ */

(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme colors
  const ACCENT     = [159, 224, 154];  // sage green
  const ACCENT_T   = [104, 200, 180];  // teal
  const NODE_COLOR = [78, 95, 68];     // muted green-grey

  let W, H, nodes, edges, raf;
  let draggedNode = null;
  let mouseInteraction = { x: 0, y: 0, active: false };

  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    // Find closest node within reach
    nodes.forEach(n => {
      const dist = Math.sqrt((n.x - mx)**2 + (n.y - my)**2);
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

  window.addEventListener('mouseup', () => {
    draggedNode = null;
  });

  // ---- RESIZE ----
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildGraph();
  }

  // ---- BUILD GRAPH ----
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
        colorIdx: Math.random() < 0.15 ? 1 : 0, // 15% teal accent
      });
    }

    // Connect nearby nodes
    const MAX_DIST = Math.min(W, H) * 0.22;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          edges.push({ a: i, b: j, maxDist: MAX_DIST, base: d });
        }
      }
    }
  }

  // ---- DRAW ----
  function draw(ts) {
    ctx.clearRect(0, 0, W, H);

    // Subtle radial gradient vignette — dark center is fine,
    // but we add a faint glow in the top-left hero area
    const grd = ctx.createRadialGradient(W * 0.18, H * 0.28, 0, W * 0.18, H * 0.28, W * 0.55);
    grd.addColorStop(0, 'rgba(50,90,50,0.06)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Update node positions
    nodes.forEach(n => {
      if (n !== draggedNode) {
        n.x += n.vx;
        n.y += n.vy;

        // Mouse attraction/repulsion for all nodes
        if (mouseInteraction.active) {
            const dx = mouseInteraction.x - n.x;
            const dy = mouseInteraction.y - n.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
                n.x += dx * 0.01;
                n.y += dy * 0.01;
            }
        }
      }

      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;
      n.pulse += n.pulseSpeed;
    });

    const MAX_DIST = Math.min(W, H) * 0.22;

    // Draw edges
    edges.forEach(e => {
      const a = nodes[e.a];
      const b = nodes[e.b];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > MAX_DIST) return;

      const alpha = (1 - dist / MAX_DIST) * 0.18;
      // Pulse: a travelling signal along some edges
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

    // Draw nodes
    nodes.forEach(n => {
      const glow = 0.5 + 0.5 * Math.sin(n.pulse);
      const [r, g, b] = n.colorIdx === 1 ? ACCENT_T : NODE_COLOR;
      const alpha = 0.3 + glow * 0.4;

      // Outer glow for accent nodes
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

  // ---- INIT ----
  window.addEventListener('resize', resize, { passive: true });
  resize();

  if (prefersReduced) {
    // Static single frame, no animation loop
    draw(0);
    return;
  }

  raf = requestAnimationFrame(draw);

  // Pause when tab hidden for performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
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
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));


/* ═══════════════════════════════════════════════════════════════
   ACTIVE NAV
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
});


/* ═══════════════════════════════════════════════════════════════
   TERMINAL TYPEWRITER (subtle — types new lines periodically)
   ═══════════════════════════════════════════════════════════════ */
(function initTerminal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const extraLines = [
    ['$ git push origin feature/csp-solver',       '# Branch updated · 3 files changed ✓'],
  ];

  const body = document.getElementById('terminal-body');
  if (!body) return;

  let idx = 0;

  function addLines() {
    const pair = extraLines[idx % extraLines.length];
    idx++;

    // Keep max 8 lines — remove oldest pair
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
      requestAnimationFrame(() => { requestAnimationFrame(() => { p.style.opacity = '1'; }); });
    });
  }

  setInterval(addLines, 4200);
})();

// tsParticles Neural Network Setup
(async () => {
  await loadAll(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          push: { quantity: 4 },
          grab: { distance: 200, links: { opacity: 0.5 } },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: false,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 80,
        },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
      background: { color: "transparent" },
    },
  });
})();

// Theme Toggle Logic Refined
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

const updateTheme = (isLight) => {
  body.classList.toggle('light-mode', isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
};

// Initial state
const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
  updateTheme(true);
}

themeBtn.addEventListener('click', () => {
  updateTheme(!body.classList.contains('light-mode'));
});

// Custom Cursor Follower
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
  if (follower) {
    follower.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
  }
});

// Intersection Observer for Reveal
const observerOptions = { threshold: 0.1 };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Parallax Mouse Effect
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
  
  // Target background elements with specific center-alignment handling
  const brain = document.querySelector('.brain-watermark-wrap');
  const robotL = document.querySelector('.robot-left');
  const robotR = document.querySelector('.robot-right');
  const hero = document.querySelector('.hero-inner');

  if(brain) brain.style.transform = `translate(calc(-50% + ${moveX * 0.5}px), calc(-50% + ${moveY * 0.5}px))`;
  if(robotL) robotL.style.transform = `translate(${moveX * 0.8}px, calc(-50% + ${moveY * 0.8}px))`;
  if(robotR) robotR.style.transform = `translate(${moveX * 0.8}px, calc(-50% + ${moveY * 0.8}px))`;
  if(hero) hero.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.3}px)`;
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  document.documentElement.setAttribute('data-theme', storedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});