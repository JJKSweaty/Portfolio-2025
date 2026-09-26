import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Download, Github, Play } from "lucide-react";
import { Navbar } from "../../components";
import { getProjectBySlug, portfolio } from "../../data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:.*v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] || null;
};

const ArchitectureDiagram = ({ nodes }) => (
  <div className="architecture-scroll" role="region" tabIndex={0} aria-label={`System architecture: ${nodes.join(" to ")}`}>
    <div className="architecture-diagram">
      {nodes.map((node, index) => (
        <div className="architecture-step-wrap" key={`${node}-${index}`}>
          <div className="architecture-step">{node}</div>
          {index < nodes.length - 1 && <div className="architecture-arrow">-&gt;</div>}
        </div>
      ))}
    </div>
  </div>
);

const CaseSection = ({ title, children }) => (
  <section className="case-section">
    <h2>{title}</h2>
    {children}
  </section>
);

const mediaStyle = (image, fit = image?.fit || "cover") => ({
  objectFit: fit,
  objectPosition: image?.position || "center",
});

const ProjectImage = ({ project, className = "" }) => (
  <div className={`case-image-frame ${className}`}>
    <img
      src={project.image.src}
      alt={project.image.alt}
      loading="eager"
      style={mediaStyle(project.image)}
    />
  </div>
);

const MediaGallery = ({ project }) => {
  const media = project.media || project.featuredMedia?.map((item) => ({ ...item, type: "image" })) || [];

  if (!media.length && !project.image) return null;

  const gallery = media.length
    ? media
    : [{ type: "image", src: project.image.src, alt: project.image.alt }];

  return (
    <div className="media-gallery">
      {gallery.map((item, index) => {
        if (item.type === "video") {
          return (
            <figure className="media-frame" key={`${item.src}-${index}`}>
              <video controls playsInline preload="metadata">
                <source src={item.src} type="video/mp4" />
              </video>
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          );
        }

        if (item.type === "youtube") {
          const id = getYouTubeId(item.src);
          return (
            <figure className="media-frame" key={`${item.src}-${index}`}>
              {id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}`}
                  loading="lazy"
                  title={item.caption || `${project.title} video`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <a href={item.src} target="_blank" rel="noopener noreferrer">
                  Watch video
                </a>
              )}
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          );
        }

        return (
          <figure className="media-frame" key={`${item.src}-${index}`}>
            <img
              src={item.src}
              alt={item.alt || project.image.alt}
              loading="lazy"
              style={mediaStyle(item, item.fit || project.image.fit)}
            />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        );
      })}
    </div>
  );
};

const CadDownloads = ({ cad }) => {
  if (!cad) return null;

  return (
    <Card className="cad-panel">
      {cad.thumbnail && (
        <img src={cad.thumbnail} alt="CAD model preview" loading="lazy" />
      )}
      <div>
        <h3>CAD Files</h3>
        <p>Download the enclosure and mounting files for this build.</p>
        <div className="cad-links">
          {cad.files.map((file) => (
            <Button key={file.href} asChild variant="outline" size="sm">
              <a href={file.href} download>
                <Download aria-hidden="true" />
                {file.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    document.title = project
      ? `${project.title} - ${portfolio.person.name}`
      : `Project not found - ${portfolio.person.name}`;
  }, [project]);

  if (!project) {
    return (
      <div className="app-shell">
        <Navbar />
        <main id="main-content" className="site-container not-found">
          <h1>Project not found</h1>
          <p>The requested case study does not exist.</p>
          <Link className="button button-primary" to="/#projects">
            Back to projects
          </Link>
        </main>
      </div>
    );
  }

  const { caseStudy } = project;
  const githubLink = project.links?.find((link) => link.label === "GitHub");

  return (
    <div className="app-shell">
      <Navbar />
      <main id="main-content" className="case-page">
        <div className="site-container">
          <Button asChild variant="ghost" className="back-link">
            <Link to="/#projects">
              <ArrowLeft aria-hidden="true" />
              Back to projects
            </Link>
          </Button>

          <header className="case-hero">
            <div>
              <p className="eyebrow">{project.category}</p>
              <h1>{project.title}</h1>
              <p className="case-subtitle">{project.subtitle}</p>
              <p>{project.summary}</p>
              <div className="case-meta">
                <span>{project.year}</span>
                {project.status && <span>{project.status}</span>}
              </div>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="project-actions">
                {githubLink && (
                  <Button asChild>
                    <a
                      href={githubLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github aria-hidden="true" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.links
                  ?.filter((link) => link.label !== "GitHub")
                  .map((link) => (
                    <Button key={link.label} asChild variant="outline">
                      <a
                        href={link.href}
                        target={link.href.startsWith("/") ? undefined : "_blank"}
                        rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
                      >
                        {["Demo", "Video"].includes(link.label) ? (
                          <Play aria-hidden="true" />
                        ) : (
                          <ArrowUpRight aria-hidden="true" />
                        )}
                        {link.label}
                      </a>
                    </Button>
                  ))}
              </div>
            </div>

            <ProjectImage project={project} />
          </header>

          {project.hardwarePage && <a className="case-document-link" href={`${portfolio.person.hardwarePortfolioPath}#page=${project.hardwarePage}`} target="_blank" rel="noopener noreferrer">Hardware Portfolio, p. {project.hardwarePage}<ArrowUpRight size={16} aria-hidden="true" /></a>}
          {caseStudy ? (
            <div className="case-layout">
              <article className="case-content">
                <CaseSection title="Overview">
                  <p>{caseStudy.overview}</p>
                </CaseSection>

                <CaseSection title="Problem">
                  <p>{caseStudy.problem}</p>
                </CaseSection>

                <CaseSection title="System Architecture">
                  <ArchitectureDiagram nodes={caseStudy.architecture} />
                </CaseSection>

                <CaseSection title="Ownership">
                  <p>{caseStudy.ownership}</p>
                </CaseSection>

                <CaseSection title="Engineering Decisions">
                  <ul>
                    {caseStudy.engineering.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CaseSection>

                <CaseSection title="Hardware and Software">
                  <ul>
                    {caseStudy.components.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CaseSection>

                {caseStudy.validation?.length > 0 && <CaseSection title="Validation and Testing">
                  <ul>
                    {caseStudy.validation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CaseSection>}

                {caseStudy.limitations?.length > 0 && (
                  <CaseSection title="Current Limitations">
                    <ul>{caseStudy.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
                  </CaseSection>
                )}
                <CaseSection title="Results">
                  <ul>
                    {caseStudy.results.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CaseSection>

                {caseStudy.references?.length > 0 && (
                  <CaseSection title="References">
                    <ul>{caseStudy.references.map((reference) => <li key={reference.href}><a className="case-reference" href={reference.href} target="_blank" rel="noopener noreferrer">{reference.label}<ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul>
                  </CaseSection>
                )}
                <CaseSection title="Project Gallery">
                  <MediaGallery project={project} />
                  <CadDownloads cad={project.cad} />
                </CaseSection>
              </article>

              <Card className="case-sidebar" role="complementary" aria-label="Project Summary">
                <CardHeader>
                  <CardTitle>At a Glance</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl>
                    <div>
                      <dt>Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <div>
                      <dt>Year</dt>
                      <dd>{project.year}</dd>
                    </div>
                    {project.status && (
                      <div>
                        <dt>Status</dt>
                        <dd>{project.status}</dd>
                      </div>
                    )}
                    {project.hardwarePage && <div><dt>Hardware Portfolio</dt><dd><a href={`${portfolio.person.hardwarePortfolioPath}#page=${project.hardwarePage}`} target="_blank" rel="noopener noreferrer">Read the PDF, p. {project.hardwarePage}</a></dd></div>}
                    <div>
                      <dt>Contact</dt>
                      <dd>
                        <a href={`mailto:${portfolio.person.email}`}>
                          {portfolio.person.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          ) : (
            <section className="case-content case-section">
              <h2>Summary</h2>
              <p>{project.summary}</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectCaseStudy;
