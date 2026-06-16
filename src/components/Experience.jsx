import { ChevronDown, ExternalLink } from "lucide-react";
import { experiences } from "../data/portfolio";

const Experience = () => {
  return (
    <section id="experience" className="section-block" aria-labelledby="experience-title">
      <div className="site-container">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title">Firmware, hardware, and systems roles</h2>
          <p>
            Recent work across embedded firmware, real-time sensing, flight
            systems, digital design, and lab infrastructure.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((experience) => (
            <article className="timeline-item" key={`${experience.company}-${experience.period}`}>
              <div className="timeline-date">{experience.period}</div>

              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <h3>{experience.role}</h3>
                    <p>
                      {experience.company}
                      <span> / {experience.location}</span>
                    </p>
                  </div>
                  {experience.companyUrl && (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-link"
                      aria-label={`Open ${experience.company} website`}
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <p className="timeline-summary">{experience.summary}</p>

                <div className="tag-row" aria-label={`${experience.company} domains`}>
                  {experience.domains.map((domain) => (
                    <span key={domain}>{domain}</span>
                  ))}
                </div>

                <details className="experience-details">
                  <summary>
                    More detail
                    <ChevronDown size={16} aria-hidden="true" />
                  </summary>
                  <ul>
                    {experience.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
