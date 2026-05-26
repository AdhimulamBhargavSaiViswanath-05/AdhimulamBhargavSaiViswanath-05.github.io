import * as Dialog from '@radix-ui/react-dialog';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ArrowTopRightIcon, CheckIcon, ChevronRightIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';

export default function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.featured ? 'project-card-featured' : ''}`} data-reveal>
      <div className="project-card-media">
          <AspectRatio.Root ratio={project.featured ? 16 / 9 : 4 / 3}>
            <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
        </AspectRatio.Root>
      </div>

      <div className="project-card-body">
        <p className="project-kicker">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>

        <div className="project-metrics">
          <span>{project.impact}</span>
          <span>{project.role}</span>
        </div>

        <div className="chip-row" aria-label={`${project.title} stack`}>
          {project.stack.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <Dialog.Root>
            <Dialog.Trigger className="button button-secondary button-small">
              Details
              <ChevronRightIcon />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="project-dialog">
                <div className="dialog-header">
                  <div>
                    <Dialog.Title>{project.title}</Dialog.Title>
                    <Dialog.Description>{project.category}</Dialog.Description>
                  </div>
                  <Dialog.Close className="icon-button" aria-label="Close project details">
                    <Cross2Icon />
                  </Dialog.Close>
                </div>

                <ScrollArea.Root className="dialog-scroll-area">
                  <ScrollArea.Viewport className="dialog-scroll-viewport">
                    <div className="project-dialog-grid">
                      <div>
                        <div className="project-dialog-preview">
                          <AspectRatio.Root ratio={16 / 9}>
                            <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                          </AspectRatio.Root>
                        </div>
                        <p className="project-dialog-summary">{project.summary}</p>
                      </div>

                      <div className="project-dialog-panel">
                        <div className="project-dialog-badge">{project.impact}</div>
                        <Separator className="separator" />
                        <h4>Stack</h4>
                        <ul className="check-list">
                          {project.stack.map((item) => (
                            <li key={item}>
                              <CheckIcon />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <Separator className="separator" />
                        <h4>Links</h4>
                        <div className="project-links">
                          {project.links.map((link) => (
                            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                              {link.label}
                              <ArrowTopRightIcon />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar className="dialog-scrollbar" orientation="vertical">
                    <ScrollArea.Thumb className="dialog-thumb" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {project.links.map((link) => (
            <a key={link.href} className="button button-ghost button-small" href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <ArrowTopRightIcon />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}