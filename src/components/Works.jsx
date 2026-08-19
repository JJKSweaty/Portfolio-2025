import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CircuitBoard,
  Glasses,
  Github,
  Play,
} from "lucide-react";
import { projects } from "../data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImagesBadge } from "@/components/ui/images-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const showcaseProjectSlugs = [
  "custom-vr-headset",
  "esp32-media-controller",
  "remembr",
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

const getProjectBadgeImages = (project) => {
  const featuredImages = project.featuredMedia?.map((item) => item.src) || [];
  const supportingImages = project.media
    ?.filter((item) => item.type === "image" && item.src)
    .map((item) => item.src) || [];
  const cadImages = project.cad?.thumbnail ? [project.cad.thumbnail] : [];
  const images = [project.image.src, ...featuredImages, ...cadImages, ...supportingImages];

  return images.length > 1 ? images.slice(0, 3) : [];
};

const mediaStyle = (image, fit) => ({
  objectFit: fit,
  objectPosition: image.position || "center",
});

const getLinkIcon = (label) => {
  const normalized = label.toLowerCase();
  if (normalized === "github") return Github;
  if (["demo", "video"].includes(normalized)) return Play;
  return ArrowUpRight;
};

const getCaseStudyHref = (project) =>
  project.caseStudy?.href || `/projects/${project.slug}`;

const getCaseStudyLabel = (project) =>
  project.caseStudy?.label || "Explore case study";

const ProjectImage = ({ project, priority = false }) => {
  const fit = project.image.fit || "cover";

  return (
    <div className={`project-media-frame project-media-${fit}`}>
      <img
        src={project.image.src}
        alt={project.image.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={mediaStyle(project.image, fit)}
      />
    </div>
  );
};

const ProjectMediaCard = ({ project, priority = false }) => {
  const pcb = project.featuredMedia?.[0];
  if (!pcb) return <ProjectImage project={project} priority={priority} />;

  return (
    <Card className="project-media-card">
      <Tabs defaultValue="headset" className="project-media-card-tabs">
        <TabsList className="project-media-tabs-list" aria-label={`${project.title} build views`}>
          <TabsTrigger value="headset" className="project-media-tab-trigger">
            <Glasses aria-hidden="true" />
            Headset build
          </TabsTrigger>
          <TabsTrigger value="pcb" className="project-media-tab-trigger">
            <CircuitBoard aria-hidden="true" />
            Custom PCB
          </TabsTrigger>
        </TabsList>

        <TabsContent value="headset" className="project-media-tab-panel">
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            style={mediaStyle(project.image, project.image.fit || "cover")}
          />
        </TabsContent>
        <TabsContent value="pcb" className="project-media-tab-panel">
          <img
            src={pcb.src}
            alt={pcb.alt}
            loading="lazy"
            decoding="async"
            style={mediaStyle(pcb, pcb.fit || "cover")}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const ProjectMediaBadge = ({ project }) => {
  const images = getProjectBadgeImages(project);
  if (!images.length) return null;

  const badge = (
    <ImagesBadge
      text={project.cad ? "CAD + build media" : "Build media"}
      images={images}
      className="project-media-badge"
      folderSize={{ width: 34, height: 25 }}
      teaserImageSize={{ width: 21, height: 15 }}
      hoverImageSize={{ width: 58, height: 38 }}
      hoverTranslateY={-40}
      hoverSpread={24}
      ariaLabel={`${project.title} media preview`}
    />
  );

  if (!project.caseStudy) {
    return <div className="project-media-badge-wrap">{badge}</div>;
  }

  return (
    <Link
      to={getCaseStudyHref(project)}
      className="project-media-badge-wrap"
      aria-label={`Open ${project.title} case study media`}
    >
      {badge}
    </Link>
  );
};

const ProjectLinks = ({ project, className }) => (
  <div className={className}>
    {project.caseStudy && (
      <Link to={getCaseStudyHref(project)}>
        {getCaseStudyLabel(project)}
        <ArrowRight aria-hidden="true" />
      </Link>
    )}

    {project.links?.map((link) => {
      const Icon = getLinkIcon(link.label);
      const external = !link.href.startsWith("/");

      return (
        <a
          key={`${project.slug}-${link.label}`}
          href={link.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          <Icon aria-hidden="true" />
          {link.label}
        </a>
      );
    })}
  </div>
);

const ProjectStory = ({ project, index }) => {
  const highlights = (
    project.caseStudy?.engineering ||
    project.decisions ||
    []
  ).slice(0, 2);
  const result = project.caseStudy?.results?.[0];

  return (
    <article className={`project-story ${index % 2 === 1 ? "project-story-reverse" : ""}`}>
      <div className="project-story-media">
        {project.featuredMedia?.length ? (
          <ProjectMediaCard project={project} priority={index === 0} />
        ) : (
          <div className="project-story-image">
            <ProjectImage project={project} priority={index === 0} />
          </div>
        )}
      </div>

      <div className="project-story-content">
        <div className="project-story-meta">
          <Badge variant="secondary">{project.category}</Badge>
          <span>{project.year}</span>
          {project.status && <span>{project.status}</span>}
        </div>

        <div>
          <p className="project-story-label">Featured system</p>
          <h3>{project.title}</h3>
          <p className="project-story-subtitle">{project.subtitle}</p>
        </div>

        <p className="project-story-summary">{project.summary}</p>

        {highlights.length > 0 && (
          <ul className="project-story-highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        {result && (
          <div className={`project-story-result${project.status === "HackCanada winner" ? " project-story-result-award" : ""}`}>
            <span>Outcome</span>
            <p>{result}</p>
          </div>
        )}

        <div className="tag-row" aria-label={`${project.title} technologies`}>
          {project.tags.slice(0, 6).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <ProjectLinks project={project} className="project-story-links" />
        <ProjectMediaBadge project={project} />
      </div>
    </article>
  );
};

const getProjectHref = (project) =>
  project.caseStudy ? getCaseStudyHref(project) : project.links?.[0]?.href;

const SupportingProjectCard = ({ project }) => {
  const github = getPrimaryLink(project, "GitHub");
  const supporting = getSupportingLink(project);
  const fallbackLink = !github && !supporting ? project.links?.[0] : null;
  const href = getProjectHref(project);
  const external = href && !href.startsWith("/");

  return (
    <article className="supporting-project-card">
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="supporting-project-media-link">
            <ProjectImage project={project} />
          </a>
        ) : (
          <Link to={href} className="supporting-project-media-link">
            <ProjectImage project={project} />
          </Link>
        )
      ) : (
        <ProjectImage project={project} />
      )}

      <div className="supporting-project-body">
        <div className="project-kicker">
          <Badge variant="secondary">{project.category}</Badge>
          <span>{project.year}</span>
          {project.status && <span>{project.status}</span>}
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
            <Link to={getCaseStudyHref(project)}>
              {project.caseStudy?.label || "Case study"}
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

        <ProjectMediaBadge project={project} />
      </div>
    </article>
  );
};

const AdditionalProjects = () => (
  <section className="supporting-projects" aria-labelledby="supporting-projects-title">
    <div className="supporting-projects-heading">
      <p className="eyebrow">Project archive</p>
      <h3 id="supporting-projects-title">Additional projects</h3>
      <p>More firmware, hardware, AI, robotics, and full-stack work.</p>
    </div>

    <div className="supporting-project-grid">
      {supportingProjects.map((project) => (
        <SupportingProjectCard key={project.slug} project={project} />
      ))}
    </div>
  </section>
);

const Works = () => (
  <section id="projects" className="section-block project-section" aria-labelledby="projects-title">
    <div className="site-container">
      <div className="section-heading project-section-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2 id="projects-title">Systems built from signal to software</h2>
          <p>
            A closer look at three projects where firmware, hardware, and
            performance constraints shaped the final system.
          </p>
        </div>
      </div>

      <div className="project-story-list">
        {showcaseProjects.map((project, index) => (
          <ProjectStory key={project.slug} project={project} index={index} />
        ))}
      </div>

      <AdditionalProjects />
    </div>
  </section>
);

export default Works;
