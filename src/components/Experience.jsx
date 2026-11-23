import { ArrowUpRight, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { designTeams, experiences, portfolio, upcomingExperiences } from "../data/portfolio";

const ExperienceRow = ({ experience, employer = false }) => {
  const date = <div className="experience-date mono-label">{experience.period}</div>;
  return (
    <article className="experience-row">
      {experience.logo && <img className="employer-logo" data-full-bleed={experience.fullBleedLogo} src={experience.logo} alt="" width="48" height="48" loading="lazy" />}
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
        {employer && date}
        <div className="experience-notes">
          <p className="experience-description">{experience.summary}</p>
          {experience.hardwarePage && (
            <a className="experience-document" href={`${portfolio.person.hardwarePortfolioPath}#page=${experience.hardwarePage}`} target="_blank" rel="noopener noreferrer">Hardware Portfolio, p. {experience.hardwarePage}<ArrowUpRight size={14} aria-hidden="true" /></a>
          )}
          {experience.details && <details className="work-details">
            <summary aria-label={`Contributions at ${experience.company}`}>Contributions <Plus size={16} aria-hidden="true" /></summary>
            <ul>{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            {experience.image && <figure className="experience-photo"><img src={experience.image.src} alt={experience.image.alt} loading="lazy" /><figcaption>{experience.image.alt}</figcaption></figure>}
            {experience.sourceUrl && <a className="experience-document" href={experience.sourceUrl} target="_blank" rel="noopener noreferrer">Source Code<ArrowUpRight size={14} aria-hidden="true" /></a>}
            <p className="experience-tools mono-label">{experience.domains.join(" / ")}</p>
          </details>}
        </div>
      </div>
      {!employer && date}
    </article>
  );
};

const Experience = ({ teams = false }) => {
  const id = teams ? "teams" : "experience";
  return (
    <section id={id} className="portfolio-section site-container history-section" aria-labelledby={id + "-title"}>
      <h2 id={id + "-title"}>{teams ? "Design teams" : "Experience"}</h2>
      <div>
        {teams ? designTeams.map((experience) => (
          <ExperienceRow key={experience.company} experience={experience} />
        )) : [["Upcoming", upcomingExperiences], ["Completed", experiences]].map(([label, entries]) => (
          <div className="experience-group" role="group" aria-label={label} key={label}>
            <div className="experience-group-label mono-label">{label}<Separator /></div>
            {entries.map((experience) => <ExperienceRow key={experience.company} experience={experience} employer />)}
          </div>
        ))}
        {teams && <div className="education-note">
          <h3>Education</h3>
          <p>University of Waterloo<br /><span>BASc, Electrical Engineering · Expected April 2029</span></p>
        </div>}
      </div>
    </section>
  );
};

export default Experience;
