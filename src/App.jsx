import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import * as Avatar from '@radix-ui/react-avatar';
import * as Progress from '@radix-ui/react-progress';
import { ArrowTopRightIcon, CalendarIcon, ChevronDownIcon, CodeIcon, LayersIcon, LightningBoltIcon, PersonIcon, RocketIcon, StarIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';
import { useEffect } from 'react';
import NavMenu from './components/NavMenu';
import SectionHeading from './components/SectionHeading';
import ResumeDialog from './components/ResumeDialog';
import CopyEmailButton from './components/CopyEmailButton';
import ProjectCard from './components/ProjectCard';
import ProfileCard from './components/ProfileCard';
import {
  aboutPoints,
  achievements,
  certifications,
  education,
  experience,
  heroStats,
  mentorNotes,
  profiles,
  projects,
  responsibility,
  site,
  skillGroups,
  workshops
} from './data/siteContent';

function useRevealAndProgress() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll('[data-reveal]');

    if (reduceMotion) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
      document.documentElement.style.setProperty('--scroll-progress', '0');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.16 }
    );

    revealTargets.forEach((element) => observer.observe(element));

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress.toFixed(2)}`);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);
}

function App() {
  useRevealAndProgress();

  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="progress-shell" aria-hidden="true">
        <div className="progress-bar" />
      </div>

      <NavMenu />

      <main id="main">
        <section className="hero-section">
          <div className="hero-orb hero-orb-a" aria-hidden="true" />
          <div className="hero-orb hero-orb-b" aria-hidden="true" />

          <div className="hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="hero-kicker">AI • ML • NLP • Cloud • UI Engineering</p>
              <h1>
                {site.name}
              </h1>
              <p className="hero-role">{site.role}</p>
              <p className="hero-summary">{site.tagline}</p>

              <div className="hero-actions">
                <ResumeDialog />
                <a className="button button-ghost" href="#projects">
                  <RocketIcon />
                  Explore projects
                </a>
              </div>

              <div className="hero-meta" aria-label="Key portfolio metrics">
                {heroStats.map((stat) => (
                  <div className="stat-pill" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual" data-reveal>
              <div className="hero-card">
                <Avatar.Root className="hero-avatar">
                  <Avatar.Image src={site.profile} alt={site.name} />
                  <Avatar.Fallback delayMs={200}>{site.initials}</Avatar.Fallback>
                </Avatar.Root>

                <div className="hero-visual-copy">
                  <p className="hero-visual-label">Currently building</p>
                  <h2>LipiSathi and AI scheduling systems</h2>
                  <p>
                    Transliteration, optimization, and deployment-focused work with polished interfaces and measurable outcomes.
                  </p>
                </div>

                <Separator className="separator" />

                <div className="hero-snapshot">
                  <div>
                    <PersonIcon />
                    <span>AI-HUB frontend contributor</span>
                  </div>
                  <div>
                    <CodeIcon />
                    <span>Static deploys on GitHub Pages</span>
                  </div>
                  <div>
                    <LayersIcon />
                    <span>Cross-domain project portfolio</span>
                  </div>
                  <div>
                    <LightningBoltIcon />
                    <span>Accessible, fast, and responsive UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-block">
          <SectionHeading
            eyebrow="Foundation"
            title="About"
            description="A version of the story that keeps the original identity but presents it with cleaner hierarchy and stronger product polish."
          />

          <div className="about-grid">
            <div className="panel panel-highlight" data-reveal>
              <h3>What defines the work</h3>
              <div className="stack-list">
                {aboutPoints.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <div className="panel" data-reveal>
              <h3>Quick context</h3>
              <div className="context-grid">
                <div>
                  <span>Education</span>
                  <strong>VVIT CSE (AI &amp; ML)</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{site.location}</strong>
                </div>
                <div>
                  <span>Focus</span>
                  <strong>ML, NLP, cloud, and UI systems</strong>
                </div>
                <div>
                  <span>Style</span>
                  <strong>Static-first, premium, accessible</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="mentor-strip" data-reveal>
            {mentorNotes.map((note) => (
              <article className="mentor-card" key={note.author}>
                <p>“{note.quote}”</p>
                <strong>{note.author}</strong>
                <span>{note.context}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-block">
          <SectionHeading
            eyebrow="Capabilities"
            title="Skills"
            description="Radix Tabs keep the categories clear while the progress indicators turn the skill list into a more scannable system."
          />

          <Tabs.Root className="skills-tabs" defaultValue={skillGroups[0].id} data-reveal>
            <Tabs.List className="tabs-list" aria-label="Skill categories">
              {skillGroups.map((group) => (
                <Tabs.Trigger className="tabs-trigger" key={group.id} value={group.id}>
                  {group.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {skillGroups.map((group) => (
              <Tabs.Content className="tabs-content" key={group.id} value={group.id}>
                <div className="skills-panel">
                  <div className="skills-copy">
                    <h3>{group.label}</h3>
                    <p>{group.description}</p>
                    <div className="progress-wrap">
                      <div className="progress-label">
                        <span>Depth</span>
                        <strong>{group.progress}%</strong>
                      </div>
                      <Progress.Root className="progress-root" value={group.progress}>
                        <Progress.Indicator className="progress-indicator" style={{ width: `${group.progress}%` }} />
                      </Progress.Root>
                    </div>
                  </div>

                  <div className="chip-cloud">
                    {group.items.map((item) => (
                      <span className="chip chip-strong" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </section>

        <section id="projects" className="section-block">
          <SectionHeading
            eyebrow="Proof of work"
            title="Projects"
            description="The strongest project becomes the anchor card, and the rest are still presented with enough metrics to make the story credible at a glance."
          />

          <div className="project-stack">
            {projects.filter((project) => project.featured).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          <div className="project-grid">
            {projects.filter((project) => !project.featured).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section id="experience" className="section-block">
          <SectionHeading
            eyebrow="Professional growth"
            title="Experience"
            description="A vertical timeline keeps the chronology intact and makes the internship and platform work easier to scan."
          />

          <div className="timeline" data-reveal>
            {experience.map((item) => (
              <article className="timeline-card" key={item.title}>
                <div className="timeline-card-header">
                  <img src={item.logo} alt={item.org} loading="lazy" decoding="async" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.org}</p>
                  </div>
                </div>
                <div className="timeline-meta">
                  <span>
                    <CalendarIcon />
                    {item.period}
                  </span>
                </div>
                <ul className="check-list">
                  {item.details.map((detail) => (
                    <li key={detail}>
                      <StarIcon />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="project-links">
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                      <ArrowTopRightIcon />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section-block">
          <SectionHeading
            eyebrow="Academic path"
            title="Education"
            description="The education timeline stays compact and emphasizes the context that actually matters for the portfolio."
          />

          <div className="education-grid" data-reveal>
            {education.map((item) => (
              <article className="education-card" key={item.title}>
                <div className="card-header">
                  <img src={item.logo} alt={item.org} loading="lazy" decoding="async" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.org}</p>
                  </div>
                </div>
                <div className="card-meta">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
                <p className="card-result">{item.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="proof" className="section-block">
          <SectionHeading
            eyebrow="Credentials and impact"
            title="Proof"
            description="Certifications, achievements, workshops, and responsibility are grouped here so the evidence feels intentional rather than scattered."
          />

          <Accordion.Root className="proof-accordion" type="multiple" defaultValue={['certifications', 'achievements']} data-reveal>
            <Accordion.Item className="accordion-item" value="certifications">
              <Accordion.Header>
                <Accordion.Trigger className="accordion-trigger">
                  Certifications
                  <ChevronDownIcon />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content">
                <div className="credential-grid">
                  {certifications.map((item) => (
                    <a className={`credential-card ${item.href ? 'credential-link' : ''}`} key={item.title} href={item.href || undefined} target={item.href ? '_blank' : undefined} rel={item.href ? 'noreferrer' : undefined}>
                      <img src={item.logo} alt={item.title} loading="lazy" decoding="async" />
                      <h3>{item.title}</h3>
                      <p>{item.issuer}</p>
                      <span>{item.period}</span>
                      <strong>{item.note}</strong>
                    </a>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className="accordion-item" value="achievements">
              <Accordion.Header>
                <Accordion.Trigger className="accordion-trigger">
                  Achievements
                  <ChevronDownIcon />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content">
                <div className="achievement-grid">
                  {achievements.map((item) => (
                    <article className="achievement-card" key={item.title}>
                      <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                    </article>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className="accordion-item" value="leadership">
              <Accordion.Header>
                <Accordion.Trigger className="accordion-trigger">
                  Leadership and workshops
                  <ChevronDownIcon />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content">
                <div className="leadership-grid">
                  <article className="panel panel-highlight">
                    <div className="card-header">
                      <img src={responsibility.logo} alt={responsibility.org} />
                      <div>
                        <h3>{responsibility.title}</h3>
                        <p>{responsibility.org}</p>
                      </div>
                    </div>
                    <div className="card-meta">
                      <span>{responsibility.period}</span>
                    </div>
                    <p className="card-result">{responsibility.summary}</p>
                  </article>

                  <div className="workshop-stack">
                    {workshops.map((item) => (
                      <article className="workshop-card" key={item.title}>
                        <img src={item.image} alt={item.title} />
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.summary}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </section>

        <section id="coding" className="section-block">
          <SectionHeading
            eyebrow="Coding profiles"
            title="Coding Intelligence"
            description="Each profile is presented as a live card instead of a brittle analytics widget, which is cleaner for static deployment."
          />

          <div className="profile-grid" data-reveal>
            {profiles.map((profile) => (
              <ProfileCard key={profile.name} profile={profile} />
            ))}
          </div>
        </section>

        <section id="contact" className="section-block section-contact">
          <SectionHeading
            eyebrow="Next conversation"
            title="Contact"
            description="A focused closing section that makes it easy to reach out, download the resume, or jump to a profile." 
          />

          <div className="contact-panel" data-reveal>
            <div>
              <p className="contact-kicker">Let’s build something intelligent.</p>
              <h3>{site.email}</h3>
              <p>{site.phone} • {site.location}</p>
            </div>

            <div className="contact-actions">
              <CopyEmailButton />
              <a className="button button-ghost" href={site.links.github} target="_blank" rel="noreferrer">
                <ArrowTopRightIcon />
                GitHub
              </a>
              <a className="button button-ghost" href={site.links.linkedin} target="_blank" rel="noreferrer">
                <ArrowTopRightIcon />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 {site.name}. Built for GitHub Pages with Radix UI.</p>
        <div className="footer-links">
          <a href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={site.links.mailto}>Email</a>
          <a href={site.links.phone}>Call</a>
        </div>
      </footer>
    </div>
  );
}

export default App;