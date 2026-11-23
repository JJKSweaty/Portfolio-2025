import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects } from "../data/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const showcaseSlugs = ["custom-vr-headset", "esp32-media-controller", "remembr"];
const showcaseProjects = showcaseSlugs.map((slug) => projects.find((project) => project.slug === slug));
const archiveProjects = projects.filter((project) => !showcaseSlugs.includes(project.slug));
const caseHref = (project) => project.caseStudy?.href || `/projects/${project.slug}`;

const ProjectImage = ({ image, priority = false }) => (
  <img src={image.src} alt={image.alt} loading={priority ? "eager" : "lazy"} decoding="async" style={{ objectFit: image.fit || "cover", objectPosition: image.position || "center" }} />
);

const ProjectMedia = ({ project, priority }) => {
  const pcb = project.featuredMedia?.[0];
  if (!pcb) return <div className={`showcase-image showcase-image-${project.slug}`}><ProjectImage image={project.image} priority={priority} /></div>;

  return (
    <Tabs defaultValue="pcb" className="showcase-views">
      <TabsContent value="build" className="showcase-image"><ProjectImage image={project.image} priority={priority} /></TabsContent>
      <TabsContent value="pcb" className="showcase-image showcase-pcb"><ProjectImage image={pcb} /></TabsContent>
      <TabsList className="showcase-tabs" aria-label={`${project.title} build views`}>
        <TabsTrigger value="build">Headset</TabsTrigger>
        <TabsTrigger value="pcb">Custom PCB</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

const ProjectLinks = ({ project }) => (
  <div className="work-links">
    {project.caseStudy && <Link to={caseHref(project)} aria-label={`View ${project.title} project`}>{project.caseStudy.label || "View Project"}<ArrowUpRight size={16} aria-hidden="true" /></Link>}
    {project.links?.map((link) => (
      <a key={link.href} aria-label={`${project.title}: ${link.label}`} href={link.href} target={link.href.startsWith("/") ? undefined : "_blank"} rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
    ))}
  </div>
);

const ProjectStory = ({ project }) => (
    <article className="showcase-project">
      <div className="showcase-media">
        <ProjectMedia project={project} />
      </div>
      <div className="showcase-copy">
        <p className="showcase-caption mono-label">{project.category} · {project.year}</p>
        <h3><Link to={caseHref(project)}>{project.title}</Link></h3>
        <p className="showcase-description">{project.summary}</p>
        <ProjectLinks project={project} />
      </div>
    </article>
);

const Works = () => (
  <section id="projects" className="portfolio-section site-container selected-work" aria-labelledby="projects-title">
    <h2 id="projects-title">Selected projects</h2>
    <div className="showcase-list">{showcaseProjects.map((project) => <ProjectStory key={project.slug} project={project} />)}</div>
    <div className="project-index">
      <div className="project-index-heading"><h3>More projects</h3></div>
      {archiveProjects.map((project) => (
        <details key={project.slug} className="archive-item">
          <summary><span className="archive-year mono-label">{project.year}</span><span className="archive-title">{project.title}</span><span className="archive-category mono-label">{project.category}</span><Plus size={18} aria-hidden="true" /></summary>
          <div className="archive-detail">
            <div className="archive-image"><ProjectImage image={project.image} /></div>
            <div><p>{project.summary}</p><p className="mono-label archive-tech">{project.tags.join(" / ")}</p><ProjectLinks project={project} /></div>
          </div>
        </details>
      ))}
    </div>
  </section>
);

export default Works;
