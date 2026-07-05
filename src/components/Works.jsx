import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Play,
} from "lucide-react";
import { projects } from "../data/portfolio";
import { Badge } from "@/components/ui/badge";
import { ProjectMarquee } from "@/components/ui/3d-marquee";
import { ImagesBadge } from "@/components/ui/images-badge";

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

const marqueeFeaturedProjectSlugs = [
  "remembr",
  "custom-vr-headset",
  "userspace-tcp-ip-stack",
  "esp32-media-controller",
  "vision-guided-autonomous-disk-launcher",
];

const marqueeProjects = [
  ...marqueeFeaturedProjectSlugs,
  ...projects.map((project) => project.slug).filter((slug) => !marqueeFeaturedProjectSlugs.includes(slug)),
]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter(Boolean)
  .map((project) => ({
    src: project.image.src,
    alt: project.image.alt,
    title: project.title,
    category: project.category,
    featured: marqueeFeaturedProjectSlugs.includes(project.slug),
    fit: project.image.fit,
    position: project.image.position,
  }));

const getPrimaryLink = (project, label) =>
  project.links?.find((link) => link.label.toLowerCase() === label.toLowerCase());

const getSupportingLink = (project) =>
  project.links?.find((link) =>
    ["video", "demo", "devpost", "gds viewer"].includes(link.label.toLowerCase())
  );

const getProjectBadgeImages = (project) => {
  const supportingImages = project.media
    ?.filter((item) => item.type === "image" && item.src)
    .map((item) => item.src) || [];
  const cadImages = project.cad?.thumbnail ? [project.cad.thumbnail] : [];
  const images = [project.image.src, ...cadImages, ...supportingImages];

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

const FeaturedProjectMarquee = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="project-marquee-section" aria-labelledby="project-marquee-title">
      <div className="project-marquee-heading">
        <p className="eyebrow">Project showcase</p>
        <h3 id="project-marquee-title">Featured Projects</h3>
        <p>Firmware, embedded systems, edge AI, and low-level systems projects.</p>
      </div>

      <ProjectMarquee items={marqueeProjects} reducedMotion={reducedMotion} />
    </section>
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
  const storyRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [34, -34]
  );
  const highlights = (
    project.caseStudy?.engineering ||
    project.decisions ||
    []
  ).slice(0, 2);
  const result = project.caseStudy?.results?.[0];

  return (
    <motion.article
      ref={storyRef}
      className={`project-story ${index % 2 === 1 ? "project-story-reverse" : ""}`}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.24, once: true }}
      transition={{ duration: reducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-story-media">
        <motion.div className="project-story-image" style={{ y: imageY }}>
          <ProjectImage project={project} priority={index === 0} />
        </motion.div>
      </div>

      <div className="project-story-content">
        <div className="project-story-meta">
          <Badge variant="secondary">{project.category}</Badge>
          <span>{project.year}</span>
          <span>{project.status}</span>
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
          <div className="project-story-result">
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
    </motion.article>
  );
};

const getProjectHref = (project) =>
  project.caseStudy ? getCaseStudyHref(project) : project.links?.[0]?.href;

const SupportingProjectCard = ({ project, index }) => {
  const github = getPrimaryLink(project, "GitHub");
  const supporting = getSupportingLink(project);
  const fallbackLink = !github && !supporting ? project.links?.[0] : null;
  const href = getProjectHref(project);
  const external = href && !href.startsWith("/");

  return (
    <motion.article
      className="supporting-project-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.32, delay: index * 0.025 }}
    >
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
          <span>{project.status}</span>
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
    </motion.article>
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
      {supportingProjects.map((project, index) => (
        <SupportingProjectCard key={project.slug} project={project} index={index} />
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

      <FeaturedProjectMarquee />

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
