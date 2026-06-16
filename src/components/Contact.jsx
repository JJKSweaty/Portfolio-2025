import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const Contact = () => {
  const { person, socials } = portfolio;

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="site-container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let us connect</h2>
          <p>
            I am interested in firmware, embedded systems, systems software,
            hardware validation, and GPU systems opportunities.
          </p>
        </div>

        <div className="contact-panel">
          <a className="email-link" href={`mailto:${person.email}`}>
            <Mail size={18} aria-hidden="true" />
            {person.email}
          </a>

          <div className="contact-links">
            {socials
              .filter((link) => link.label !== "Email")
              .map((link) => {
                const Icon = iconMap[link.label];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            <a href={person.resumePath}>
              <FileText size={16} aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
