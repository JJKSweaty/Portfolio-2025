import { ArrowUpRight, Plus } from "lucide-react";
import { designTeams, experiences } from "../data/portfolio";
import Reveal from "./Reveal";

const ExperienceRow = ({ experience }) => (
  <article className="experience-row">
    <div className="experience-date mono-label">{experience.period}</div>
    <div className="experience-body">
      <div className="experience-row-heading">
        <div>
          <h3>{experience.company}</h3>
          <p className="experience-role">{experience.role}</p>
        </div>
        {experience.companyUrl && (
          <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="quiet-icon-link" aria-label={`Visit ${experience.company}`}>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        )}
      </div>
      <p className="experience-description">{experience.summary}</p>
      <details className="work-details">
        <summary>Contributions <Plus size={16} aria-hidden="true" /></summary>
        <ul>{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        <p className="experience-tools mono-label">{experience.domains.join(" / ")}</p>
      </details>
    </div>
  </article>
);

const Experience = () => (
  <>
    <section id="experience" className="portfolio-section site-container" aria-labelledby="experience-title">
      <Reveal className="section-rule">
        <p className="mono-label section-index">02 / Experience</p>
        <h2 id="experience-title">Learning by building.</h2>
      </Reveal>
      <div className="experience-list">
        {experiences.map((experience) => (
          <Reveal key={experience.company}><ExperienceRow experience={experience} /></Reveal>
        ))}
      </div>
    </section>
    <section id="teams" className="portfolio-section site-container" aria-labelledby="teams-title">
      <Reveal className="section-rule">
        <p className="mono-label section-index">03 / Design teams</p>
        <div><h2 id="teams-title">Built together.</h2><p className="section-description">Solar cars, aircraft, and silicon. The work I do with other Waterloo students.</p></div>
      </Reveal>
      <div className="experience-list">
        {designTeams.map((experience) => (
          <Reveal key={experience.company}><ExperienceRow experience={experience} /></Reveal>
        ))}
      </div>
      <div className="education-note">
        <p className="mono-label">Education</p>
        <p>University of Waterloo <span>BASc, Electrical Engineering · Expected April 2029</span></p>
      </div>
    </section>
  </>
);

export default Experience;
