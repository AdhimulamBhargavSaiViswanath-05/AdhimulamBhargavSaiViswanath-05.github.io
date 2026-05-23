# ABSV Portfolio — Complete Upgrade Strategy & GitHub Copilot Agent Master Prompt

**For:** Adhimulam Bhargav Sai Viswanath  
**Prepared by:** Claude (Senior Creative Frontend Architect Analysis)  
**Date:** May 2026

---

## PART 1 — CURRENT PORTFOLIO AUDIT

### What Exists Now

The current portfolio is a single-page HTML/CSS/JS site with a flat structure:
```
index.html
style.css
script.js
assets/
```

### UI/UX Problems Identified

**Architecture & Structure**
- Monolithic single HTML file — zero component separation, no maintainability
- No build system, bundler, or asset pipeline — raw file serving
- No lazy loading for images — all assets load on first paint
- No code splitting — everything in one JS and one CSS file

**Visual Design Limitations**
- No cohesive design system — font sizes, spacing, colors are ad-hoc
- The "Wisdom from Mentors" section appears above the About section — wrong information hierarchy
- Skills section uses raw comma-separated text inside paragraphs — not scannable
- No visual differentiation between section importance levels
- Project cards use inconsistent image sizes (LipiSathi logo vs generic NLP logo reused twice)
- No hover states on project cards — static, flat feel
- The GitHub Analytics section shows raw image embeds — no loading state, broken if stats API is down
- No loading screen or page entry animation
- No scroll-triggered animations — everything is static on arrival

**Responsiveness Issues**
- Navigation bar has no mobile hamburger menu — overflows on small screens
- Project grid collapses poorly on mobile — cards become too small
- Hero section text sizing not fluid — abrupt jumps between breakpoints
- Profile image has no responsive treatment

**Branding Gaps**
- No personal logo or monogram system beyond "ABSV" text
- No consistent color accent — the site doesn't have a single signature color that belongs to "you"
- No AI/ML visual identity — could be any developer's portfolio
- Tagline "Aspiring AI Engineer" is passive — undersells your actual work

**Content Hierarchy Problems**
- Mentor quotes section placed before About Me — jarring opening
- Certifications section is longer than Projects — wrong priority
- No "what I'm building now" or "currently learning" dynamic element
- No quantified impact statements in hero (95% accuracy, R²: 0.96, 0.3s generation)
- Contact section is bare — just links, no CTA

**Performance Issues**
- No image optimization (WebP conversion, srcset)
- No font subsetting or font-display: swap
- No preload hints for critical assets
- GitHub stats images are third-party — slow/unreliable
- No service worker or caching strategy

---

## PART 2 — NEW ARCHITECTURE DESIGN PLAN

### Recommended Stack

**Core:** Vanilla HTML5 + CSS3 + ES6+ JavaScript (NO framework required — keeps it GitHub Pages compatible, fast, and fully yours)

**Why no React/Next.js for this specific case:**
- GitHub Pages serves static files — no Node.js server
- Adding React/Vite adds build complexity for a personal portfolio
- Pure HTML/CSS/JS with modern APIs is faster, more portable, and easier to maintain solo
- The animations and effects you want are fully achievable without a framework

**Libraries to add via CDN (no build step needed):**
- **GSAP 3** (via CDN) — for scroll-triggered animations, timeline sequences
- **Typed.js** — for the hero typewriter effect
- **Particles.js or tsParticles** — for the neural network background
- **AOS (Animate on Scroll)** — lightweight scroll reveal (or replace with GSAP ScrollTrigger)
- **Lenis** (via CDN) — smooth scroll inertia

### New Section Architecture (in order)

```
01. LOADER         — Full-screen animated entry (AI boot sequence aesthetic)
02. NAV            — Glassmorphism fixed navbar with scroll progress indicator
03. HERO           — Animated name, dynamic role typewriter, neural net canvas BG
04. ABOUT          — Two-column: personality left, animated stats right
05. SKILLS         — Hexagonal grid or orbital chart (not bars/lists)
06. PROJECTS       — Full-width cards with hover reveal, metrics front and center
07. EXPERIENCE     — Vertical timeline with animated connectors
08. ACHIEVEMENTS   — Award cards with particle burst on hover
09. EDUCATION      — Clean timeline, minimal
10. CERTIFICATIONS — Logo wall with hover detail cards
11. CODING         — Live stats integration (GitHub + coding profiles)
12. CONTACT        — Dark section with glowing CTA, social links, copy-email button
13. FOOTER         — Minimal, signature line
```

### Visual Identity System

**Color Palette**
```
--bg-primary:     #050A0F    /* Near-black with slight blue tint */
--bg-secondary:   #0A1628    /* Dark navy */
--bg-card:        #0D1F35    /* Card backgrounds */
--accent-primary: #00D4FF    /* Electric cyan — your signature color */
--accent-second:  #7B61FF    /* Deep violet */
--accent-glow:    #00FFCC    /* Mint green for data/ML elements */
--text-primary:   #E8F4FD    /* Near-white */
--text-secondary: #8BA7C7    /* Muted blue-grey */
--text-muted:     #4A6B8A    /* Subtle text */
--border-glass:   rgba(0, 212, 255, 0.15)
--gradient-hero:  linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%)
```

**Typography**
```
Display:  "Space Mono" (Google Fonts) — technical, monospaced feel for name/titles
          OR "Bebas Neue" for large headings
Body:     "DM Sans" or "Outfit" — clean, modern, readable
Code:     "JetBrains Mono" — for tech tags and skill chips
```

**Motion Design Language**
- Entry: staggered fade-up with 0.1s delays between elements
- Hover: subtle scale(1.02) + glow box-shadow transition
- Scroll: elements slide in from bottom 30px with opacity 0→1
- Background: slow-drifting neural network particle canvas (CPU-light)
- Cursor: custom dot cursor with trail effect (desktop only)
- Numbers: count-up animation when stats section enters viewport
- Loading: AI terminal boot sequence (3-4 seconds max)

---

## PART 3 — FOLDER STRUCTURE

```
AdhimulamBhargavSaiViswanath-05.github.io/
│
├── index.html                    # Main entry — lean, semantic HTML5
├── style.css                     # Split into sections via CSS custom properties
├── script.js                     # Modular JS with init functions per section
│
├── assets/
│   ├── images/
│   │   ├── profile.webp          # Convert to WebP
│   │   ├── projects/
│   │   │   ├── lipasathi.webp
│   │   │   ├── timetable.webp
│   │   │   ├── nlp-stemmer.webp
│   │   │   ├── bus-prediction.webp
│   │   │   └── amazon-analysis.webp
│   │   ├── experience/
│   │   │   ├── aws-apssdc.webp
│   │   │   └── aihub.webp
│   │   ├── education/
│   │   │   ├── vvit.webp
│   │   │   ├── srichaitanya.webp
│   │   │   └── viveka.webp
│   │   └── certs/
│   │       ├── isro.webp
│   │       ├── worldquant.webp
│   │       ├── aws-cert.webp
│   │       └── google-cloud.webp
│   ├── resume.pdf
│   └── favicon/
│       ├── favicon.svg           # SVG monogram "ABSV"
│       └── favicon.ico
│
├── js/
│   ├── loader.js                 # Boot sequence animation
│   ├── nav.js                    # Navbar scroll behavior, hamburger
│   ├── hero.js                   # Typewriter, particle canvas
│   ├── skills.js                 # Skill hexagons / orbital render
│   ├── projects.js               # Project card interactions
│   ├── timeline.js               # Experience/education timeline
│   ├── counters.js               # Animated stat counters
│   ├── cursor.js                 # Custom cursor (desktop)
│   └── scroll.js                 # Lenis init, scroll-triggered reveals
│
├── css/
│   ├── variables.css             # Design tokens
│   ├── reset.css                 # Modern CSS reset
│   ├── typography.css            # Font system
│   ├── layout.css                # Grid, containers
│   ├── components.css            # Cards, buttons, tags
│   ├── sections/
│   │   ├── loader.css
│   │   ├── hero.css
│   │   ├── about.css
│   │   ├── skills.css
│   │   ├── projects.css
│   │   ├── experience.css
│   │   ├── achievements.css
│   │   └── contact.css
│   ├── animations.css            # All keyframes
│   └── responsive.css            # All media queries
│
└── .github/
    └── workflows/
        └── deploy.yml            # Optional: GitHub Actions for optimization
```

---

## PART 4 — COMPONENT BREAKDOWN

### 1. Loader Component
- Full-screen dark overlay
- Monogram "ABSV" animates in with a draw-on SVG effect
- Terminal-style text prints: `> initializing portfolio...` `> loading AI systems...` `> welcome.`
- Fades out after ~2.5s, revealing the site underneath
- CSS: `position:fixed; z-index:9999; background:#050A0F`

### 2. Hero Section
- Full viewport height (`100svh`)
- Left side: Name in large monospaced font, role typewriter cycling through: `AI Engineer`, `ML Developer`, `NLP Researcher`, `Cloud & DevOps Learner`
- Key metrics bar below name: `95% OCR Accuracy` | `R² 0.96 ML Model` | `0.3s Timetable Gen` | `SIH Top 7 Nationally`
- Right side (or background): Neural network canvas — animated nodes and edges, electric cyan color
- CTA buttons: `View Resume` (outlined) + `Explore Projects` (filled, glowing)
- Scroll indicator: animated chevron with "scroll to explore"

### 3. Skills Section — Orbital / Hexagonal Grid
Instead of text lists, render skills as:
- **Core orbit**: ML, DL, NLP, Cloud, CSP rotate around a center "ABSV" monogram
- **Hex grid**: Each skill is a hexagonal tile, color-coded by category
- On hover: tile glows and shows proficiency context
- Categories: AI/ML (cyan) | Languages (violet) | Cloud/DevOps (green) | Frontend (orange) | CS Core (grey)

### 4. Projects Section
- Full-width cards (not small grid)
- Each card: gradient background, project image/mockup on right, text on left
- Metrics displayed prominently in colored badges: `R² 0.96`, `~95% accuracy`, `0.3–0.4s`
- Tags as monospace chips
- "View on GitHub" + "Live Demo" buttons
- Featured project (LipiSathi) gets a full-width hero card treatment

### 5. Experience Timeline
- Vertical center line with glowing dot connectors
- Cards alternate left/right on desktop, stack on mobile
- Company logo in card header
- Animated line draws downward as user scrolls (GSAP ScrollTrigger or IntersectionObserver)

### 6. Achievements Section
- Two large award cards with trophy/medal iconography
- On hover: small particle burst effect (CSS only via pseudo-elements)
- SIH card: map of India with "Top 7" callout
- VVIT Exhibition: hologram image with reveal animation

### 7. Contact Section
- Dark `#050A0F` section with electric glow
- Large headline: "Let's build something intelligent."
- Email displayed with one-click copy button (clipboard API)
- Social links as icon buttons with hover glow
- "Open to: Full-time roles · Internships · Research collaborations · Freelance AI projects"

---

## PART 5 — SEO & PERFORMANCE REQUIREMENTS

```html
<!-- In <head> -->
<meta name="description" content="Adhimulam Bhargav Sai Viswanath — AI/ML Engineer, B.Tech CSE student at VVIT. Projects in NLP, Deep Learning, Cloud Computing. Smart India Hackathon Top 7.">
<meta name="keywords" content="AI Engineer, Machine Learning, NLP, Deep Learning, Python, VVIT, Smart India Hackathon, Portfolio">
<meta property="og:title" content="Adhimulam Bhargav Sai Viswanath | AI Engineer Portfolio">
<meta property="og:description" content="...">
<meta property="og:image" content="/assets/og-preview.webp">  <!-- 1200x630 -->
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://adhimulambhargavsaiviswanath-05.github.io/">
```

**Performance checklist:**
- [ ] All images converted to WebP with `<picture>` fallbacks
- [ ] Font loading: `rel="preload"` for display font, `font-display: swap`
- [ ] CSS: split into critical (inlined) vs deferred
- [ ] JS: `defer` on all script tags
- [ ] Lazy loading: `loading="lazy"` on all below-fold images
- [ ] No third-party GitHub stats images — replace with GitHub API calls
- [ ] GSAP loaded from CDN with `integrity` hash

---

## PART 6 — THE GITHUB COPILOT AGENT MASTER PROMPT

---

```
# GITHUB COPILOT AGENT — PORTFOLIO TRANSFORMATION PROMPT
# Target: Adhimulam Bhargav Sai Viswanath | AI Engineer Portfolio
# Repository: AdhimulamBhargavSaiViswanath-05/AdhimulamBhargavSaiViswanath-05.github.io

---

## MISSION STATEMENT

You are a senior creative frontend architect and UI/UX engineer. Your task is to
completely transform the existing portfolio website from a basic HTML/CSS/JS site
into a premium, futuristic, AI-themed personal brand website that matches the
quality of a top-tier product landing page.

The final site must feel: ELITE, INTELLIGENT, INTERACTIVE, CLEAN, FUTURISTIC.
It must NOT look like a student template or any AI-generated boilerplate.

---

## PHASE 1 — SETUP & ARCHITECTURE

### Step 1.1 — Create new folder structure

Refactor the repository to this exact structure:

```
/
├── index.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── typography.css
│   ├── layout.css
│   ├── components.css
│   ├── animations.css
│   ├── responsive.css
│   └── sections/
│       ├── loader.css
│       ├── nav.css
│       ├── hero.css
│       ├── about.css
│       ├── skills.css
│       ├── projects.css
│       ├── experience.css
│       ├── achievements.css
│       ├── education.css
│       ├── certifications.css
│       ├── coding.css
│       └── contact.css
├── js/
│   ├── main.js          (init orchestrator)
│   ├── loader.js
│   ├── nav.js
│   ├── hero.js
│   ├── canvas.js        (neural network background)
│   ├── skills.js
│   ├── projects.js
│   ├── timeline.js
│   ├── counters.js
│   ├── cursor.js
│   └── scroll.js
└── assets/
    ├── images/ (existing images preserved)
    ├── resume.pdf
    └── favicon.svg
```

### Step 1.2 — Establish CSS Design Token System

In `css/variables.css`, define ALL design tokens:

```css
:root {
  /* Colors */
  --bg-primary: #050A0F;
  --bg-secondary: #0A1628;
  --bg-card: #0D1F35;
  --bg-card-hover: #112540;
  --accent-cyan: #00D4FF;
  --accent-violet: #7B61FF;
  --accent-mint: #00FFCC;
  --accent-glow: rgba(0, 212, 255, 0.3);
  --text-primary: #E8F4FD;
  --text-secondary: #8BA7C7;
  --text-muted: #4A6B8A;
  --border-subtle: rgba(0, 212, 255, 0.12);
  --border-card: rgba(0, 212, 255, 0.2);
  --gradient-brand: linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%);
  --gradient-card: linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(123,97,255,0.05) 100%);

  /* Typography */
  --font-display: 'Space Mono', monospace;
  --font-body: 'DM Sans', sans-serif;
  --font-code: 'JetBrains Mono', monospace;

  /* Spacing (8pt grid) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-12: 96px;
  --space-16: 128px;

  /* Layout */
  --max-width: 1200px;
  --section-padding: var(--space-16) var(--space-4);
  --card-radius: 16px;
  --border-radius-sm: 8px;

  /* Animation */
  --transition-fast: 150ms ease;
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 600ms cubic-bezier(0.4, 0, 0.2, 1);
  --glow-cyan: 0 0 20px rgba(0, 212, 255, 0.4);
  --glow-violet: 0 0 20px rgba(123, 97, 255, 0.4);
}
```

---

## PHASE 2 — HTML STRUCTURE

### Step 2.1 — Rewrite index.html

Write semantic, SEO-optimized HTML5. Structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adhimulam Bhargav Sai Viswanath | AI Engineer</title>
  <!-- Full SEO meta block (OG, Twitter, canonical, description) -->
  <!-- Preload critical fonts -->
  <!-- CSS imports (variables → reset → typography → layout → sections → animations → responsive) -->
  <!-- Google Fonts: Space Mono, DM Sans, JetBrains Mono -->
</head>
<body>

  <!-- LOADER -->
  <div id="loader" role="status" aria-label="Loading portfolio">
    <div class="loader__monogram">ABSV</div>
    <div class="loader__terminal">
      <span class="loader__line" data-text="> initializing neural interface..."></span>
      <span class="loader__line" data-text="> loading AI systems..."></span>
      <span class="loader__line" data-text="> welcome, human."></span>
    </div>
    <div class="loader__progress"><div class="loader__bar"></div></div>
  </div>

  <!-- CUSTOM CURSOR (desktop only) -->
  <div class="cursor" aria-hidden="true">
    <div class="cursor__dot"></div>
    <div class="cursor__ring"></div>
  </div>

  <!-- NAVIGATION -->
  <header id="nav" role="banner">
    <nav class="nav__container" aria-label="Main navigation">
      <a href="#hero" class="nav__logo">
        <span class="nav__logo-text">ABSV</span>
        <span class="nav__logo-dot"></span>
      </a>
      <ul class="nav__links" role="list">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="assets/resume.pdf" class="nav__cta" target="_blank" rel="noopener">Resume</a>
      <button class="nav__hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav__progress-bar" aria-hidden="true"></div>
  </header>

  <main>

    <!-- HERO -->
    <section id="hero" class="section section--hero" aria-labelledby="hero-name">
      <canvas id="neural-canvas" aria-hidden="true"></canvas>
      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          B.Tech CSE (AI & ML) · VVIT · 2027
        </div>
        <h1 id="hero-name" class="hero__name">
          Adhimulam<br>
          <span class="hero__name-highlight">Bhargav Sai</span><br>
          Viswanath
        </h1>
        <p class="hero__role">
          <span class="hero__role-prefix">I build </span>
          <span id="hero-typewriter" class="hero__typewriter"></span>
        </p>
        <div class="hero__metrics" aria-label="Key achievements">
          <div class="hero__metric">
            <span class="hero__metric-value" data-count="95">0</span>
            <span class="hero__metric-unit">%</span>
            <span class="hero__metric-label">OCR Accuracy</span>
          </div>
          <div class="hero__metric">
            <span class="hero__metric-value" data-count="96">0</span>
            <span class="hero__metric-unit">%</span>
            <span class="hero__metric-label">ML Model R²</span>
          </div>
          <div class="hero__metric">
            <span class="hero__metric-value" data-count="7">0</span>
            <span class="hero__metric-unit">th</span>
            <span class="hero__metric-label">SIH Nationally</span>
          </div>
          <div class="hero__metric">
            <span class="hero__metric-value" data-count="4">0</span>
            <span class="hero__metric-unit">+</span>
            <span class="hero__metric-label">Live Projects</span>
          </div>
        </div>
        <div class="hero__ctas">
          <a href="assets/resume.pdf" class="btn btn--primary" target="_blank" rel="noopener">
            View Resume
          </a>
          <a href="#projects" class="btn btn--outline">Explore Projects</a>
        </div>
      </div>
      <div class="hero__scroll-indicator" aria-hidden="true">
        <span>scroll</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section" aria-labelledby="about-heading">
      <div class="container">
        <div class="section__label">01 / About</div>
        <h2 id="about-heading" class="section__title">The Human Behind the Models</h2>
        <div class="about__grid">
          <div class="about__text">
            <p class="about__lead">
              AI/ML student at VVIT building real systems — not just notebooks.
            </p>
            <p>
              I work at the intersection of NLP, computer vision, constraint optimization,
              and cloud infrastructure. My projects ship to production, serve real users,
              and solve actual problems.
            </p>
            <p>
              Currently: AWS Cloud & DevOps Intern at APSSDC × AWS Academy, and
              Apps Developer & UI/UX Designer at AI-HUB@VVIT — the student AI
              platform I helped grow from a GitHub Pages experiment to a custom-domain
              AI ecosystem with 20+ collaborators.
            </p>
            <div class="about__tags">
              <span>Machine Learning</span>
              <span>Deep Learning</span>
              <span>NLP</span>
              <span>Cloud / DevOps</span>
              <span>UI/UX Design</span>
              <span>Constraint Satisfaction</span>
            </div>
          </div>
          <div class="about__stats">
            <div class="about__stat-card">
              <span class="about__stat-number" data-count="8">0</span>
              <span class="about__stat-decimal">.36</span>
              <span class="about__stat-label">CGPA / 10.0</span>
            </div>
            <div class="about__stat-card">
              <span class="about__stat-number" data-count="5">0</span>
              <span class="about__stat-label">Live Projects</span>
            </div>
            <div class="about__stat-card">
              <span class="about__stat-number" data-count="3">0</span>
              <span class="about__stat-label">Years Coding</span>
            </div>
            <div class="about__stat-card">
              <span class="about__stat-number" data-count="20">0</span>
              <span class="about__stat-unit">+</span>
              <span class="about__stat-label">Collaborators</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills" class="section section--dark" aria-labelledby="skills-heading">
      <div class="container">
        <div class="section__label">02 / Skills</div>
        <h2 id="skills-heading" class="section__title">Technical Toolkit</h2>
        <div class="skills__grid">
          <!-- AI & ML Category -->
          <div class="skills__category">
            <div class="skills__category-header">
              <span class="skills__category-dot skills__category-dot--cyan"></span>
              AI & Machine Learning
            </div>
            <div class="skills__chips">
              <span class="chip chip--cyan">Scikit-learn</span>
              <span class="chip chip--cyan">PyTorch</span>
              <span class="chip chip--cyan">CNNs</span>
              <span class="chip chip--cyan">NLP Pipelines</span>
              <span class="chip chip--cyan">EDA</span>
              <span class="chip chip--cyan">CSP Optimization</span>
              <span class="chip chip--cyan">OCR Systems</span>
              <span class="chip chip--cyan">Pandas / NumPy</span>
            </div>
          </div>
          <!-- Languages -->
          <div class="skills__category">
            <div class="skills__category-header">
              <span class="skills__category-dot skills__category-dot--violet"></span>
              Languages
            </div>
            <div class="skills__chips">
              <span class="chip chip--violet">Python</span>
              <span class="chip chip--violet">Java</span>
              <span class="chip chip--violet">C</span>
              <span class="chip chip--violet">SQL</span>
              <span class="chip chip--violet">HTML/CSS/JS</span>
            </div>
          </div>
          <!-- Cloud & DevOps -->
          <div class="skills__category">
            <div class="skills__category-header">
              <span class="skills__category-dot skills__category-dot--mint"></span>
              Cloud & DevOps
            </div>
            <div class="skills__chips">
              <span class="chip chip--mint">AWS EC2</span>
              <span class="chip chip--mint">Linux</span>
              <span class="chip chip--mint">NGINX</span>
              <span class="chip chip--mint">Git / GitHub</span>
              <span class="chip chip--mint">GitHub Actions</span>
              <span class="chip chip--mint">GitHub Pages</span>
            </div>
          </div>
          <!-- CS Core -->
          <div class="skills__category">
            <div class="skills__category-header">
              <span class="skills__category-dot"></span>
              CS Fundamentals
            </div>
            <div class="skills__chips">
              <span class="chip">DSA</span>
              <span class="chip">DBMS</span>
              <span class="chip">OS</span>
              <span class="chip">Computer Networks</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="section" aria-labelledby="projects-heading">
      <div class="container">
        <div class="section__label">03 / Projects</div>
        <h2 id="projects-heading" class="section__title">What I've Built</h2>
        <div class="projects__grid">

          <!-- Featured: LipiSathi -->
          <article class="project-card project-card--featured" aria-labelledby="proj-lipasathi">
            <div class="project-card__content">
              <div class="project-card__meta">
                <span class="project-card__badge">Featured · Team Lead</span>
                <div class="project-card__tags">
                  <span>OCR</span><span>Deep Learning</span><span>NLP</span><span>SIH 2025</span>
                </div>
              </div>
              <h3 id="proj-lipasathi" class="project-card__title">LipiSathi</h3>
              <p class="project-card__subtitle">Offline Multilingual Transliteration System</p>
              <p class="project-card__desc">
                Offline system for transliterating street signs using OCR, image processing,
                and deep learning pipelines. Built for India's linguistic diversity.
              </p>
              <div class="project-card__metrics">
                <span class="metric-badge metric-badge--highlight">~95% Accuracy</span>
                <span class="metric-badge">Smart India Hackathon WR-6</span>
                <span class="metric-badge">National Top 7</span>
              </div>
              <div class="project-card__links">
                <a href="https://github.com/SIH-2025-Word-Weavers" class="btn btn--sm btn--outline" target="_blank" rel="noopener">GitHub →</a>
              </div>
            </div>
          </article>

          <!-- Timetable -->
          <article class="project-card" aria-labelledby="proj-timetable">
            <div class="project-card__content">
              <div class="project-card__tags">
                <span>CSP</span><span>AI</span><span>Optimization</span>
              </div>
              <h3 id="proj-timetable" class="project-card__title">AI Timetable Generator</h3>
              <p class="project-card__desc">
                Constraint satisfaction–based academic scheduling. Conflict-free timetables in milliseconds.
              </p>
              <div class="project-card__metrics">
                <span class="metric-badge metric-badge--highlight">0.3–0.4s generation</span>
                <span class="metric-badge">Live deployment</span>
              </div>
              <div class="project-card__links">
                <a href="https://github.com/AdhimulamBhargavSaiViswanath-05/TimeTableGeneration" class="btn btn--sm btn--outline" target="_blank" rel="noopener">GitHub →</a>
                <a href="https://tt.aihub-vvitu.social/" class="btn btn--sm btn--primary" target="_blank" rel="noopener">Live Demo</a>
              </div>
            </div>
          </article>

          <!-- NLP Stemmer -->
          <article class="project-card" aria-labelledby="proj-nlp">
            <div class="project-card__content">
              <div class="project-card__tags">
                <span>NLP</span><span>Python</span><span>Linguistics</span>
              </div>
              <h3 id="proj-nlp" class="project-card__title">Custom NLP Stemming Engine</h3>
              <p class="project-card__desc">
                Modular rule-based stemmer using ordered linguistic transformations.
              </p>
              <div class="project-card__metrics">
                <span class="metric-badge metric-badge--highlight">~95% Accuracy</span>
              </div>
              <div class="project-card__links">
                <a href="https://github.com/AdhimulamBhargavSaiViswanath-05/Custom_NLP_Stemming_Engine" class="btn btn--sm btn--outline" target="_blank" rel="noopener">GitHub →</a>
              </div>
            </div>
          </article>

          <!-- Bus Prediction -->
          <article class="project-card" aria-labelledby="proj-bus">
            <div class="project-card__content">
              <div class="project-card__tags">
                <span>ML</span><span>Random Forest</span><span>Regression</span>
              </div>
              <h3 id="proj-bus" class="project-card__title">Bus Service Prediction</h3>
              <p class="project-card__desc">
                ML models predicting passenger demand and ticket pricing.
              </p>
              <div class="project-card__metrics">
                <span class="metric-badge metric-badge--highlight">R² = 0.96</span>
                <span class="metric-badge">Random Forest</span>
              </div>
              <div class="project-card__links">
                <a href="https://github.com/AdhimulamBhargavSaiViswanath-05/bus-traffic-price-prediction" class="btn btn--sm btn--outline" target="_blank" rel="noopener">GitHub →</a>
              </div>
            </div>
          </article>

          <!-- Amazon Analysis -->
          <article class="project-card" aria-labelledby="proj-amazon">
            <div class="project-card__content">
              <div class="project-card__tags">
                <span>Web Scraping</span><span>EDA</span><span>Visualization</span>
              </div>
              <h3 id="proj-amazon" class="project-card__title">Amazon Product Trend Analysis</h3>
              <p class="project-card__desc">
                Scraped and analyzed Amazon datasets to surface price trends and review patterns.
              </p>
              <div class="project-card__links">
                <a href="https://github.com/AdhimulamBhargavSaiViswanath-05/AmazonWebScrapping" class="btn btn--sm btn--outline" target="_blank" rel="noopener">GitHub →</a>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience" class="section section--dark" aria-labelledby="exp-heading">
      <div class="container">
        <div class="section__label">04 / Experience</div>
        <h2 id="exp-heading" class="section__title">Where I've Worked</h2>
        <div class="timeline">

          <div class="timeline__item" data-aos="fade-up">
            <div class="timeline__connector"></div>
            <div class="timeline__card">
              <div class="timeline__header">
                <img src="assets/images/experience/aws-apssdc.webp" alt="APSSDC AWS" class="timeline__logo" loading="lazy">
                <div>
                  <h3 class="timeline__role">AWS Cloud Computing & DevOps Intern</h3>
                  <p class="timeline__org">APSSDC × AWS Academy</p>
                  <p class="timeline__period">May 2026 – Present</p>
                </div>
              </div>
              <ul class="timeline__bullets">
                <li>Hands-on EC2, NGINX, SSH, and static deployment workflows</li>
                <li>AWS Cloud Foundations & Linux fundamentals in production environments</li>
              </ul>
              <a href="https://github.com/AdhimulamBhargavSaiViswanath-05/aws-devops-learning-journey" class="btn btn--sm btn--outline" target="_blank" rel="noopener">View Journey →</a>
            </div>
          </div>

          <div class="timeline__item" data-aos="fade-up">
            <div class="timeline__connector"></div>
            <div class="timeline__card">
              <div class="timeline__header">
                <img src="assets/images/experience/aihub.webp" alt="AI-HUB" class="timeline__logo" loading="lazy">
                <div>
                  <h3 class="timeline__role">Apps Developer & Frontend Designer</h3>
                  <p class="timeline__org">AI-HUB@VVIT</p>
                  <p class="timeline__period">Jan 2025 – Present</p>
                </div>
              </div>
              <ul class="timeline__bullets">
                <li>Founding member; grew platform from GitHub Pages to custom-domain AI ecosystem</li>
                <li>Deployed AI Timetable Generator serving VVIT students</li>
                <li>Collaborating with 20+ students, alumni, and peers</li>
              </ul>
              <div class="timeline__links">
                <a href="https://aihub-vvitu.social/" class="btn btn--sm btn--primary" target="_blank" rel="noopener">Website</a>
                <a href="https://aihub-vvit.github.io" class="btn btn--sm btn--outline" target="_blank" rel="noopener">GitHub</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ACHIEVEMENTS -->
    <section id="achievements" class="section" aria-labelledby="ach-heading">
      <div class="container">
        <div class="section__label">05 / Achievements</div>
        <h2 id="ach-heading" class="section__title">Recognition</h2>
        <div class="achievements__grid">
          <div class="achievement-card achievement-card--gold">
            <div class="achievement-card__icon">🏆</div>
            <h3>Smart India Hackathon 2025</h3>
            <p class="achievement-card__result">National WR-6 · Top 7 in India</p>
            <p>Internal Top 50 from 256+ teams. Led Team Word Weavers on LipiSathi.</p>
          </div>
          <div class="achievement-card achievement-card--silver">
            <div class="achievement-card__icon">🥇</div>
            <h3>VVIT Science Exhibition</h3>
            <p class="achievement-card__result">First Prize · 2023</p>
            <p>Holographic projection project awarded top prize at department-level exhibition.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section section--dark section--contact" aria-labelledby="contact-heading">
      <div class="container container--narrow">
        <div class="section__label">06 / Contact</div>
        <h2 id="contact-heading" class="contact__headline">Let's build something intelligent.</h2>
        <p class="contact__sub">
          Open to: <strong>Full-time roles</strong> · <strong>Internships</strong> ·
          <strong>Research collaborations</strong> · <strong>AI project consulting</strong>
        </p>
        <div class="contact__email-wrapper">
          <span class="contact__email">bhargavsaiadhimulam12@gmail.com</span>
          <button class="contact__copy-btn" data-clipboard="bhargavsaiadhimulam12@gmail.com" aria-label="Copy email">
            Copy
          </button>
        </div>
        <div class="contact__socials">
          <a href="https://www.linkedin.com/in/adhimulambhargavsaiviswanath/" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
          <a href="https://github.com/AdhimulamBhargavSaiViswanath-05" target="_blank" rel="noopener" aria-label="GitHub">GitHub</a>
          <a href="assets/resume.pdf" target="_blank" rel="noopener">Resume PDF</a>
        </div>
      </div>
    </section>

  </main>

  <footer class="footer">
    <p>© 2026 Adhimulam Bhargav Sai Viswanath · Built with purpose, not templates.</p>
  </footer>

  <!-- CDN SCRIPTS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <!-- LOCAL SCRIPTS (in order) -->
  <script src="js/loader.js" defer></script>
  <script src="js/canvas.js" defer></script>
  <script src="js/cursor.js" defer></script>
  <script src="js/nav.js" defer></script>
  <script src="js/hero.js" defer></script>
  <script src="js/counters.js" defer></script>
  <script src="js/timeline.js" defer></script>
  <script src="js/scroll.js" defer></script>
  <script src="js/main.js" defer></script>

</body>
</html>
```

---

## PHASE 3 — CSS IMPLEMENTATION

### Step 3.1 — css/reset.css
Write a modern CSS reset based on Josh Comeau's reset. Include:
- `box-sizing: border-box` on `*, *::before, *::after`
- `margin: 0`, `padding: 0` defaults
- `line-height: 1.5` on body
- `img, picture, video, canvas, svg: display:block; max-width:100%`
- `input, button, textarea, select: font: inherit`
- `p, h1-h6: overflow-wrap: break-word`
- `scroll-behavior: smooth` on `html` (with `@media (prefers-reduced-motion: no-preference)` guard)

### Step 3.2 — css/typography.css
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 { font-family: var(--font-display); line-height: 1.1; }
h1 { font-size: clamp(2.5rem, 8vw, 6rem); }
h2 { font-size: clamp(1.8rem, 4vw, 3rem); }
h3 { font-size: clamp(1.2rem, 2.5vw, 1.8rem); }
p  { font-size: clamp(0.95rem, 1.5vw, 1.05rem); color: var(--text-secondary); }
code, .chip, .metric-badge { font-family: var(--font-code); }
```

### Step 3.3 — Loader CSS
```css
#loader {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg-primary);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: var(--space-4);
  transition: opacity 0.6s ease, visibility 0.6s ease;
}
#loader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
.loader__monogram {
  font-family: var(--font-display);
  font-size: 4rem; font-weight: 700;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: monogram-glow 1s ease-in-out infinite alternate;
}
@keyframes monogram-glow {
  from { filter: drop-shadow(0 0 8px rgba(0,212,255,0.4)); }
  to   { filter: drop-shadow(0 0 24px rgba(0,212,255,0.8)); }
}
.loader__terminal {
  font-family: var(--font-code);
  font-size: 0.85rem;
  color: var(--accent-mint);
  text-align: center;
  min-height: 4em;
}
.loader__line { display: block; opacity: 0; animation: type-in 0.5s ease forwards; }
.loader__line:nth-child(1) { animation-delay: 0.3s; }
.loader__line:nth-child(2) { animation-delay: 1.0s; }
.loader__line:nth-child(3) { animation-delay: 1.7s; }
@keyframes type-in { to { opacity: 1; } }
.loader__progress {
  width: 200px; height: 2px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px; overflow: hidden;
  margin-top: var(--space-2);
}
.loader__bar {
  height: 100%;
  background: var(--gradient-brand);
  animation: progress-fill 2.5s ease forwards;
}
@keyframes progress-fill { to { width: 100%; } }
```

### Step 3.4 — Glassmorphism Navbar CSS
```css
#nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: var(--space-2) 0;
  transition: background var(--transition-base), backdrop-filter var(--transition-base);
}
#nav.scrolled {
  background: rgba(5, 10, 15, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
}
.nav__container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex; align-items: center; justify-content: space-between;
}
.nav__logo-text {
  font-family: var(--font-display);
  font-size: 1.2rem; font-weight: 700;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nav__links { display: flex; gap: var(--space-4); list-style: none; }
.nav__links a {
  font-size: 0.9rem; color: var(--text-secondary);
  text-decoration: none; font-family: var(--font-code);
  transition: color var(--transition-fast);
}
.nav__links a:hover { color: var(--accent-cyan); }
.nav__cta {
  padding: 0.4rem 1.2rem;
  border: 1px solid var(--accent-cyan);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-code); font-size: 0.85rem;
  color: var(--accent-cyan); text-decoration: none;
  transition: all var(--transition-base);
}
.nav__cta:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  box-shadow: var(--glow-cyan);
}
.nav__progress-bar {
  position: absolute; bottom: 0; left: 0;
  height: 2px; width: 0%;
  background: var(--gradient-brand);
  transition: width 0.1s linear;
}
```

### Step 3.5 — Hero CSS
Implement full-viewport hero with:
- Canvas behind all content (`position: absolute; inset: 0; z-index: 0`)
- All content in `.hero__content` with `position: relative; z-index: 1`
- `.hero__name` using `clamp(2.5rem, 8vw, 6rem)` font size
- `.hero__name-highlight` with gradient text fill
- `.hero__typewriter` with a blinking cursor `::after { content: '|'; animation: blink 1s step-end infinite; }`
- `.hero__metrics` as a flexbox row of 4 metric cards with glassmorphism borders
- `.btn--primary`: filled with gradient background + glow on hover
- `.btn--outline`: border only, fill on hover

### Step 3.6 — Project Cards CSS
```css
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-4);
}
.project-card--featured {
  grid-column: 1 / -1; /* Full width */
}
.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--card-radius);
  padding: var(--space-4);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  position: relative; overflow: hidden;
}
.project-card::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--gradient-card);
  opacity: 0;
  transition: opacity var(--transition-base);
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.12);
  border-color: var(--accent-cyan);
}
.project-card:hover::before { opacity: 1; }
.metric-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 4px;
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--accent-cyan);
}
.metric-badge--highlight {
  background: rgba(0, 212, 255, 0.2);
  color: var(--accent-mint);
  border-color: var(--accent-mint);
}
```

### Step 3.7 — Complete Responsive CSS
In `css/responsive.css`, implement these breakpoints:
```css
/* Tablet: 768px */
@media (max-width: 768px) {
  .nav__links { display: none; }
  .nav__hamburger { display: flex; }
  .hero__metrics { grid-template-columns: repeat(2, 1fr); }
  .about__grid { grid-template-columns: 1fr; }
  .projects__grid { grid-template-columns: 1fr; }
  .timeline { padding-left: 0; }
  .achievements__grid { grid-template-columns: 1fr; }
}

/* Mobile: 480px */
@media (max-width: 480px) {
  :root { --section-padding: var(--space-8) var(--space-3); }
  .hero__name { font-size: clamp(2rem, 10vw, 3rem); }
  .hero__ctas { flex-direction: column; }
  .contact__email { font-size: 0.85rem; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## PHASE 4 — JAVASCRIPT IMPLEMENTATION

### Step 4.1 — js/loader.js
```javascript
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2800);
  });
  document.body.style.overflow = 'hidden';
})();
```

### Step 4.2 — js/canvas.js — Neural Network Background
Write a Canvas 2D neural network animation:
- Create 60-80 nodes with random positions and slow drift velocities
- Each node: small circle (radius 2-3px) in var `--accent-cyan` with 60% opacity
- Connect nodes within 150px distance with lines; opacity fades with distance
- On `mousemove`, add a temporary "attractor" node near cursor that pulls nearby nodes
- Resize canvas on `window.resize` using `ResizeObserver`
- Use `requestAnimationFrame` loop
- Check `window.matchMedia('(prefers-reduced-motion: reduce)')` — if true, render static snapshot only

### Step 4.3 — js/hero.js — Typewriter Effect
```javascript
const roles = [
  'AI Systems.',
  'NLP Pipelines.',
  'ML Models.',
  'Cloud Infrastructure.',
  'Intelligent Interfaces.'
];
// Implement typewriter: type char by char, pause 2s, delete char by char, move to next role
// Update #hero-typewriter textContent
// Use requestAnimationFrame or setInterval with delays
```

### Step 4.4 — js/counters.js — Animated Count-Up
```javascript
// Use IntersectionObserver to detect when .hero__metrics or .about__stats enters viewport
// For each [data-count] element, animate from 0 to the target value over 1.5s
// Use easeOutQuart easing function
// Trigger only once per element (disconnect observer after triggering)
```

### Step 4.5 — js/nav.js
```javascript
// 1. On scroll: add/remove .scrolled class to #nav for glassmorphism effect
// 2. Update .nav__progress-bar width based on scroll percentage
// 3. Hamburger menu: toggle .nav__links visibility on mobile
// 4. Close menu on nav link click
// 5. Active link highlighting based on IntersectionObserver on sections
```

### Step 4.6 — js/cursor.js
```javascript
// Custom cursor — desktop only (pointer device check)
// .cursor__dot follows mouse exactly (no lag)
// .cursor__ring follows with lerp interpolation (smooth lag)
// On hover over a, button: add .cursor--hover class (ring expands)
// On mousedown: add .cursor--click class (dot scales down briefly)
// Hide on mobile: check window.matchMedia('(pointer: coarse)')
```

### Step 4.7 — js/scroll.js — Scroll Reveal
```javascript
// Use IntersectionObserver with threshold 0.15
// Target all elements with [data-reveal] attribute
// Add class .revealed when entering viewport
// In CSS: [data-reveal] { opacity: 0; transform: translateY(30px); transition: ... }
//         [data-reveal].revealed { opacity: 1; transform: none; }
// Add data-reveal to: .project-card, .timeline__card, .achievement-card, .skills__category
// Add data-reveal-delay="0.1", "0.2" etc. for stagger effect
```

### Step 4.8 — js/main.js — Init Orchestrator
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules in correct order
  initNav();
  initHeroTypewriter();
  initNeuralCanvas();
  initCursor();
  initScrollReveal();
  initCounters();
  initContactCopy();
});

function initContactCopy() {
  const btn = document.querySelector('.contact__copy-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.clipboard).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    });
  });
}
```

---

## PHASE 5 — ACCESSIBILITY REQUIREMENTS

Ensure the following across all code:
- All interactive elements reachable by Tab key
- `aria-label` on all icon-only buttons and links
- `role="list"` on semantic lists not using `<ul>`
- `alt` text on all images (empty `alt=""` for decorative images)
- Color contrast ratio ≥ 4.5:1 for all text (cyan on dark passes; verify)
- `aria-hidden="true"` on canvas, cursor, decorative elements
- `prefers-reduced-motion` media query disables all animations
- Focus styles: visible outline, never `outline: none` without replacement
- Skip to content link at top of page for keyboard users
- `lang="en"` on `<html>`
- Semantic heading hierarchy: h1 (once) → h2 (sections) → h3 (cards)

---

## PHASE 6 — PERFORMANCE REQUIREMENTS

- Convert all `.jpg`/`.png` images to `.webp` using `cwebp` or `squoosh`
- Use `<picture>` with `<source type="image/webp">` fallbacks
- Add `loading="lazy"` to all images below the fold
- Add `fetchpriority="high"` to hero profile image
- Use `rel="preload"` for Google Fonts CSS in `<head>`
- All `<script>` tags use `defer` attribute
- Inline critical CSS (loader styles) in a `<style>` tag in `<head>`
- Target Lighthouse score: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95

---

## PHASE 7 — FINAL QA CHECKLIST

Before committing:
- [ ] Loader appears and fades correctly on first load
- [ ] Neural network canvas renders and animates
- [ ] Typewriter cycles through all 5 roles correctly
- [ ] Navbar becomes glassmorphic on scroll
- [ ] Hamburger menu works on mobile (320px–768px)
- [ ] All project card links open in new tab
- [ ] Copy email button works and shows confirmation
- [ ] Scroll reveal animates each section on entry
- [ ] Count-up numbers animate when metrics enter viewport
- [ ] No horizontal overflow on any screen size
- [ ] Images load lazily (verify in DevTools Network tab)
- [ ] Lighthouse run: all scores ≥ 90
- [ ] Keyboard navigation works through entire page
- [ ] Reduced motion preference disables all animations
- [ ] Site deploys correctly to GitHub Pages on `main` branch push
- [ ] OG preview image appears when sharing link on LinkedIn

---

## FINAL NOTE TO COPILOT AGENT

Do NOT:
- Use any CSS framework (Bootstrap, Tailwind, Bulma)
- Add unnecessary dependencies
- Create placeholder/lorem ipsum content — use real data provided above
- Use purple-on-white color schemes
- Use template-style card designs
- Add cookie banners, popups, or notification requests
- Use `!important` excessively

DO:
- Write clean, modular, commented JavaScript
- Use CSS custom properties everywhere (no hardcoded values)
- Preserve ALL existing content, links, and data
- Keep all GitHub and live demo links intact
- Make it feel like a product, not a resume document
- Let the design have personality — this is an AI engineer, make it feel intelligent
```

---

## SUMMARY — KEY DECISIONS

| Decision | Choice | Reason |
|---|---|---|
| Framework | Vanilla HTML/CSS/JS | GitHub Pages compatible, fast, zero build step |
| Animation | GSAP (CDN) + CSS keyframes | Production-grade, GPU-accelerated |
| Background | Canvas 2D neural net | AI identity, lightweight, interactive |
| Color anchor | Electric cyan `#00D4FF` | Technical, AI-themed, high contrast on dark |
| Typography | Space Mono + DM Sans | Monospace = technical identity; DM Sans = readability |
| Layout | Dark-first, section contrast alternation | Reduces eye fatigue, creates visual rhythm |
| Content priority | Projects → Experience → Achievements | What matters most to recruiters, in that order |
| Mobile strategy | Hamburger nav, single-column stack, fluid typography | Clean collapse, no overflow |

---

*This document is your complete blueprint. Feed the PHASE 2–7 prompt block directly to GitHub Copilot Agent (Workspace mode) with "Apply to entire repository" selected.*
