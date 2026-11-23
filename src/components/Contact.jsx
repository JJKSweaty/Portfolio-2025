import { ArrowUp, ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";

const Contact = () => {
  const { person, socials } = portfolio;
  return (
    <footer id="contact" className="portfolio-footer site-container" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">Contact</h2>
        <a className="footer-email" href={`mailto:${person.email}`}>{person.email}<ArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="footer-bottom">
        <span className="mono-label">© {new Date().getFullYear()} {person.name}</span>
        <div className="footer-links">
          {socials.filter((link) => link.label !== "Email").map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
          <a href={person.hardwarePortfolioPath} target="_blank" rel="noopener noreferrer">Hardware Portfolio<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={person.resumePath} target="_blank" rel="noopener noreferrer">Résumé<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href="#hero-title" aria-label="Back to top"><ArrowUp size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
