import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Play,
} from "lucide-react";
import { projects } from "../data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const showcaseProjectSlugs = [
  "spi-controlled-pwm-peripheral",
  "cuda-mlp-mnist",
  "esp32-media-controller",
];

const showcaseProjects = showcaseProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter(Boolean);

const supportingProjects = projects.filter(
  (project) => !showcaseProjectSlugs.includes(project.slug)
);

const getPrimaryLink = (project, label) =>
  project.links?.find((link) => link.label.toLowerCase() === label.toLowerCase());

const getSupportingLink = (project) =>
  project.links?.find((link) =>
    ["video", "demo", "devpost", "gds viewer"].includes(link.label.toLowerCase())
  );

const mediaStyle = (image, fit) => ({
  objectFit: fit,
  objectPosition: image.position || "center",
});

const ProjectImage = ({ project, priority = false }) => {
  const fit = project.image.fit || "cover";

  return (
    <div className={`project-media-frame project-media-${fit}`}>
      <img
        src={project.image.src}
        alt={project.image.alt}
        loading={priority ? "eager" : "lazy"}
        style={mediaStyle(project.image, fit)}
      />
    </div>
  );
};

const ProjectLinks = ({ project }) => {
  const github = getPrimaryLink(project, "GitHub");
  const supporting = getSupportingLink(project);

  return (
    <div className="project-actions">
      {project.caseStudy && (
        <Button asChild>
          <Link to={`/projects/${project.slug}`}>
            Case Study
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      )}
      {github && (
        <Button asChild variant="outline">
          <a href={github.href} target="_blank" rel="noopener noreferrer">
            <Github aria-hidden="true" />
            GitHub
          </a>
        </Button>
      )}
      {supporting && (
        <Button asChild variant="ghost">
          <a
            href={supporting.href}
            target={supporting.href.startsWith("/") ? undefined : "_blank"}
            rel={supporting.href.startsWith("/") ? undefined : "noopener noreferrer"}
          >
            {["video", "demo"].includes(supporting.label.toLowerCase()) ? (
              <Play aria-hidden="true" />
            ) : (
              <ArrowUpRight aria-hidden="true" />
            )}
            {supporting.label}
          </a>
        </Button>
      )}
    </div>
  );
};

const FeaturedProject = ({ project, index }) => (
  <motion.article
    className="featured-project-wrap"
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.24, delay: index * 0.04 }}
    onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty(
        "--cursor-x",
        `${event.clientX - rect.left}px`
      );
      event.currentTarget.style.setProperty(
        "--cursor-y",
        `${event.clientY - rect.top}px`
      );
    }}
  >
    <Card className={`featured-project ${index === 0 ? "featured-project-primary" : ""}`}>
      <div className="project-feature-index">0{index + 1}</div>
      <div className="project-media-panel">
        <ProjectImage project={project} priority={index === 0} />
      </div>

      <CardHeader className="project-card-header">
        <div className="project-kicker">
          <Badge variant="secondary">{project.category}</Badge>
          <span>{project.year}</span>
          <span>{project.status}</span>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="project-card-content">
        <p className="project-summary">{project.summary}</p>
        <p className="project-role">
          <strong>Role:</strong> {project.role}
        </p>

        <div className="project-signal-strip" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="project-decisions">
          <p>Core technical decisions</p>
          <ul>
            {project.decisions.slice(0, 2).map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </div>

        <div className="tag-row">
          {project.tags.slice(0, 6).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <ProjectLinks project={project} />
      </CardContent>
    </Card>
  </motion.article>
);

const SupportingProjectCard = ({ project, index }) => {
  const github = getPrimaryLink(project, "GitHub");
  const supporting = getSupportingLink(project);
  const fallbackLink = !github && !supporting ? project.links?.[0] : null;

  return (
    <motion.article
      className="supporting-project-card"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.22, delay: index * 0.025 }}
    >
      <ProjectImage project={project} />

      <div className="supporting-project-body">
        <div className="project-kicker">
          <Badge variant="secondary">{project.category}</Badge>
          <span>{project.year}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.summary}</p>

        <div className="tag-row">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="supporting-project-links">
          {project.caseStudy && (
            <Link to={`/projects/${project.slug}`}>
              Case Study
              <ArrowRight aria-hidden="true" />
            </Link>
          )}
          {github && (
            <a href={github.href} target="_blank" rel="noopener noreferrer">
              <Github aria-hidden="true" />
              GitHub
            </a>
          )}
          {supporting && (
            <a
              href={supporting.href}
              target={supporting.href.startsWith("/") ? undefined : "_blank"}
              rel={supporting.href.startsWith("/") ? undefined : "noopener noreferrer"}
            >
              {["video", "demo"].includes(supporting.label.toLowerCase()) ? (
                <Play aria-hidden="true" />
              ) : (
                <ArrowUpRight aria-hidden="true" />
              )}
              {supporting.label}
            </a>
          )}
          {fallbackLink && (
            <a
              href={fallbackLink.href}
              target={fallbackLink.href.startsWith("/") ? undefined : "_blank"}
              rel={fallbackLink.href.startsWith("/") ? undefined : "noopener noreferrer"}
            >
              <ArrowUpRight aria-hidden="true" />
              {fallbackLink.label}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Works = () => {
  return (
    <section id="projects" className="section-block" aria-labelledby="projects-title">
      <div className="site-container">
        <div className="section-heading project-section-heading">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 id="projects-title">Project Highlights</h2>
            <p>
              Three deeper builds with the strongest architecture, systems ownership,
              and engineering depth.
            </p>
          </div>

        </div>

        <motion.div className="featured-projects">
          {showcaseProjects.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} index={index} />
          ))}
        </motion.div>

        <section className="supporting-projects" aria-labelledby="supporting-projects-title">
          <div className="supporting-projects-heading">
            <h3 id="supporting-projects-title">Additional projects</h3>
            <p>
              More firmware, hardware, AI, and full-stack work kept compact for quick scanning.
            </p>
          </div>

          <div className="supporting-project-grid">
            {supportingProjects.map((project, index) => (
              <SupportingProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Works;
