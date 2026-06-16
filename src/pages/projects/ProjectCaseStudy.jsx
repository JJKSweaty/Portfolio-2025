import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Download, Github, Play } from "lucide-react";
import { Navbar } from "../../components";
import { getProjectBySlug, portfolio } from "../../data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:.*v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] || null;
};

const ArchitectureDiagram = ({ nodes }) => (
  <div className="architecture-scroll" role="img" aria-label={nodes.join(" to ")}>
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
  <motion.section
    className="case-section"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.22 }}
  >
    <h2>{title}</h2>
    {children}
  </motion.section>
);

const mediaStyle = (image) => ({
  objectFit: "cover",
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
  const media = project.media || [];

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
                  src={`https://www.youtube.com/embed/${id}`}
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
              style={mediaStyle(item)}
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
        <h3>CAD files</h3>
        <p>Mounting files preserved from the original project assets.</p>
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
    if (!project) return;
    document.title = `${project.title} - ${portfolio.person.name}`;
  }, [project]);

  if (!project) {
    return (
      <div className="app-shell">
        <Navbar />
        <main className="site-container not-found">
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
      <main className="case-page">
        <div className="site-container">
          <Button asChild variant="ghost" className="back-link">
            <Link to="/#projects">
              <ArrowLeft aria-hidden="true" />
              Back to projects
            </Link>
          </Button>

          <motion.header
            className="case-hero"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div>
              <p className="eyebrow">{project.category}</p>
              <h1>{project.title}</h1>
              <p className="case-subtitle">{project.subtitle}</p>
              <p>{project.summary}</p>
              <div className="case-meta">
                <span>{project.year}</span>
                <span>{project.status}</span>
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
          </motion.header>

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

                <CaseSection title="Hardware And Software Components">
                  <ul>
                    {caseStudy.components.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CaseSection>

                <CaseSection title="Validation And Testing">
                  <ul>
                    {caseStudy.validation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CaseSection>

                <CaseSection title="Results">
                  <ul>
                    {caseStudy.results.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CaseSection>

                <CaseSection title="Project Gallery">
                  <MediaGallery project={project} />
                  <CadDownloads cad={project.cad} />
                </CaseSection>
              </article>

              <Card className="case-sidebar" aria-label="Project summary">
                <CardHeader>
                  <CardTitle>At a glance</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl>
                    <div>
                      <dt>Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <Separator />
                    <div>
                      <dt>Year</dt>
                      <dd>{project.year}</dd>
                    </div>
                    <Separator />
                    <div>
                      <dt>Status</dt>
                      <dd>{project.status}</dd>
                    </div>
                    <Separator />
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
