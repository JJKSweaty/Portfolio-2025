import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const Hero = () => {
  const { person, socials } = portfolio;

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Firmware / Embedded Systems / Edge Compute</p>
          <h1 id="hero-title">{person.name}</h1>
          <p className="hero-title">{person.title}</p>
          <p className="hero-summary">{person.summary}</p>
          <p className="hero-focus">{person.focus}</p>

          <div className="availability-panel" aria-label="Availability">
            {person.availability.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View Projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href={person.resumePath}>
              <FileText size={16} aria-hidden="true" />
              View Resume
            </a>
          </div>

          <div className="hero-links" aria-label="External profile links">
            {socials.map((link) => {
              const Icon = socialIcons[link.label] || ArrowRight;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                >
                  <Icon size={16} aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        <aside className="hero-aside" aria-label="Profile snapshot">
          <img
            src={person.headshot}
            alt="Jonathan Koshy"
            width="168"
            height="168"
            className="profile-photo"
          />
        </aside>
      </div>
    </section>
  );
};

export default Hero;
