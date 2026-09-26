import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects } from "../data/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Reveal from "./Reveal";

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
    <Tabs defaultValue="build" className="showcase-views">
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
    {project.caseStudy && <Link to={caseHref(project)}>{project.caseStudy.label || "View project"}<ArrowUpRight size={16} aria-hidden="true" /></Link>}
    {project.links?.map((link) => (
      <a key={link.href} href={link.href} target={link.href.startsWith("/") ? undefined : "_blank"} rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
    ))}
  </div>
);

const ProjectStory = ({ project, index }) => (
  <Reveal>
    <article className="showcase-project">
      <div className="showcase-media">
        <ProjectMedia project={project} priority={index === 0} />
        <div className="showcase-caption mono-label"><span>{String(index + 1).padStart(2, "0")} / {project.category}</span><span>{project.year}</span></div>
      </div>
      <div className="showcase-copy">
        <p className="mono-label showcase-type">{project.slug === "custom-vr-headset" ? "Open-Source VR Headset" : project.slug === "remembr" ? "Edge AI Dementia Companion" : "Embedded UI"}</p>
        <h3><Link to={caseHref(project)}>{project.title}</Link></h3>
        <p className="showcase-description">{project.summary}</p>
        <p className="showcase-note">{project.showcaseNote}</p>
        <p className="showcase-tech mono-label">{project.tags.slice(0, 5).join(" / ")}</p>
        <ProjectLinks project={project} />
      </div>
    </article>
  </Reveal>
);

const Works = () => (
  <section id="projects" className="portfolio-section site-container selected-work" aria-labelledby="projects-title">
    <Reveal className="section-rule">
      <p className="mono-label section-index">01</p>
      <h2 id="projects-title">Projects</h2>
    </Reveal>
    <div className="showcase-list">{showcaseProjects.map((project, index) => <ProjectStory key={project.slug} project={project} index={index} />)}</div>
    <div className="project-index">
      <div className="project-index-heading"><h3>Additional Projects</h3><span className="mono-label">{String(archiveProjects.length).padStart(2, "0")} projects</span></div>
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
