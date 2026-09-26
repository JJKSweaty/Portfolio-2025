import { ArrowUp, ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import Reveal from "./Reveal";

const Contact = () => {
  const { person, socials } = portfolio;
  return (
    <footer id="contact" className="portfolio-footer site-container" aria-labelledby="contact-title">
      <Reveal>
        <p className="mono-label">05 / Get in touch</p>
        <h2 id="contact-title">Have something<br />in mind?</h2>
        <a className="footer-email" href={`mailto:${person.email}`}>{person.email}<ArrowUpRight aria-hidden="true" /></a>
        <p className="footer-interest">Always happy to talk firmware, hardware, and interesting things to build.</p>
      </Reveal>
      <div className="footer-bottom">
        <span className="mono-label">© {new Date().getFullYear()} {person.name}</span>
        <div className="footer-links">
          {socials.filter((link) => link.label !== "Email").map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
          <a href={person.resumePath} target="_blank" rel="noopener noreferrer">Resume<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href="#hero-title" aria-label="Back to top"><ArrowUp size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
