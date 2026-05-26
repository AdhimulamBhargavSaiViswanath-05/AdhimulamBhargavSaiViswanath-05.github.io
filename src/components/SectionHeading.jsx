export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading" data-reveal>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}