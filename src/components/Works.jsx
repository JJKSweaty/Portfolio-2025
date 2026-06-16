import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Cable,
  Cpu,
  Github,
  Layers3,
  Play,
  Terminal,
} from "lucide-react";
import { projects } from "../data/portfolio";
import { Badge } from "@/components/ui/badge";

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

const labLayers = ["Overview", "System", "Build", "Result"];

const bootLines = [
  "> loading project...",
  "> initializing stack...",
  "> opening system preview...",
];

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

const consoleMediaStyle = (image) => ({
  objectFit: "cover",
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

const getProjectText = (project) =>
  [
    project.title,
    project.subtitle,
    project.category,
    project.role,
    project.summary,
    ...(project.tags || []),
    ...(project.caseStudy?.components || []),
    ...(project.caseStudy?.engineering || []),
  ]
    .join(" ")
    .toLowerCase();

const hasAnyTerm = (text, terms) => terms.some((term) => text.includes(term));

const getBuildNotes = (project) => {
  const text = getProjectText(project);
  const engineering = project.caseStudy?.engineering || project.decisions || [];
  const components = project.caseStudy?.components || [];
  const validation = project.caseStudy?.validation || [];

  return [
    {
      label: "Firmware",
      active: hasAnyTerm(text, [
        "firmware",
        "esp32",
        "freertos",
        "lvgl",
        "spi",
        "pwm",
        "verilog",
        "rtl",
      ]),
      value: engineering[0] || project.role,
    },
    {
      label: "Hardware",
      active: hasAnyTerm(text, [
        "hardware",
        "asic",
        "gpu",
        "cuda",
        "sensor",
        "touchscreen",
        "peripheral",
        "raspberry",
        "pcb",
      ]),
      value: components.slice(0, 3).join(" / ") || project.category,
    },
    {
      label: "Software",
      active: Boolean(project.tags?.length || project.caseStudy?.architecture?.length),
      value:
        project.caseStudy?.ownership ||
        project.tags?.slice(0, 4).join(" / ") ||
        project.summary,
    },
    {
      label: "Testing",
      active: Boolean(validation.length),
      value: validation[0],
    },
  ].filter((note) => note.active && note.value);
};

const getPortIcon = (label) => {
  const normalized = label.toLowerCase();
  if (normalized === "github") return Github;
  if (["demo", "video"].includes(normalized)) return Play;
  return ArrowUpRight;
};

const getDebugPorts = (project) => {
  const ports = [];

  if (project.caseStudy) {
    ports.push({
      label: "Case Study",
      href: `/projects/${project.slug}`,
      internal: true,
      Icon: ArrowRight,
    });
  }

  project.links?.forEach((link) => {
    ports.push({
      ...link,
      internal: link.href.startsWith("/"),
      Icon: getPortIcon(link.label),
    });
  });

  return ports;
};

const SystemOverlay = ({ project }) => {
  const stack = project.tags?.slice(0, 4) || [];

  return (
    <div className="console-system-overlay" aria-hidden="true">
      <svg viewBox="0 0 900 430" role="presentation">
        <path className="system-line system-line-one" d="M88 260 C 210 106, 372 128, 456 216 S 668 336, 812 182" />
        <path className="system-line system-line-two" d="M96 132 C 248 196, 334 310, 456 250 S 662 98, 792 286" />
        <circle cx="88" cy="260" r="8" />
        <circle cx="456" cy="216" r="8" />
        <circle cx="812" cy="182" r="8" />
      </svg>

      <div className="system-flow">
        {["Input", "Processing", "Control", "Output"].map((step, index) => (
          <span key={step}>
            {step}
            {stack[index] && <small>{stack[index]}</small>}
          </span>
        ))}
      </div>
    </div>
  );
};

const ActivePreview = ({ project, layer, isBooting }) => {
  const fit = project.image.fit || "cover";

  return (
    <div
      className={`console-preview-screen console-layer-${layer.toLowerCase()} ${
        isBooting ? "console-preview-booting" : ""
      }`}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        event.currentTarget.style.setProperty("--tilt-x", `${x * 12}px`);
        event.currentTarget.style.setProperty("--tilt-y", `${y * 10}px`);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-x", "0px");
        event.currentTarget.style.setProperty("--tilt-y", "0px");
      }}
    >
      <AnimatePresence mode="wait">
        {isBooting ? (
          <motion.div
            key={`${project.slug}-boot`}
            className="console-terminal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="terminal-topline">
              <Terminal aria-hidden="true" />
              PROJECT_BOOT::{project.slug}
            </div>
            {bootLines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.22, duration: 0.18 }}
              >
                {line}
              </motion.p>
            ))}
            <span className="terminal-cursor" />
          </motion.div>
        ) : (
          <motion.div
            key={`${project.slug}-${layer}`}
            className="console-active-content"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            <div className="console-device-column">
              <div className={`console-device-panel project-media-${fit}`}>
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  style={consoleMediaStyle(project.image)}
                />
                <span className="device-scanline" aria-hidden="true" />
                {layer === "System" && <SystemOverlay project={project} />}
              </div>

              <div className="console-tech-row" aria-label={`${project.title} technologies`}>
                {project.tags.slice(0, 6).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {layer === "Overview" && (
              <div className="console-readout">
                <Badge variant="secondary">{project.category}</Badge>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
            )}

            {layer === "Build" && (
              <div className="build-note-grid">
                {getBuildNotes(project).map((note) => (
                  <article key={note.label} className="build-note">
                    <span>{note.label}</span>
                    <p>{note.value}</p>
                  </article>
                ))}
              </div>
            )}

            {layer === "Result" && (
              <div className="result-panel">
                <div>
                  <span>Result</span>
                  <p>{project.caseStudy?.results?.[0] || project.status}</p>
                </div>
                <div>
                  <span>Status</span>
                  <p>{project.status}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LayerRail = ({ layerIndex, setLayerIndex }) => (
  <div className="console-layer-rail" aria-label="Project preview layer selector">
    <input
      type="range"
      min="0"
      max={labLayers.length - 1}
      step="1"
      value={layerIndex}
      aria-label="Project layer"
      onChange={(event) => setLayerIndex(Number(event.target.value))}
    />
    <div className="layer-labels">
      {labLayers.map((layer, index) => (
        <button
          type="button"
          key={layer}
          className={index === layerIndex ? "active" : ""}
          onClick={() => setLayerIndex(index)}
        >
          {layer}
        </button>
      ))}
    </div>
  </div>
);

const DebugPorts = ({ project, isBooting }) => {
  const ports = getDebugPorts(project);

  return (
    <div className={`debug-port-row ${isBooting ? "debug-port-row-disabled" : ""}`}>
      {ports.map(({ label, href, internal, Icon }) =>
        internal ? (
          <Link key={`${label}-${href}`} to={href} className="debug-port">
            <Icon aria-hidden="true" />
            {label} Port
          </Link>
        ) : (
          <a
            key={`${label}-${href}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="debug-port"
          >
            <Icon aria-hidden="true" />
            {label} Port
          </a>
        )
      )}
    </div>
  );
};

const ProjectModule = ({ project, index, isActive, onSelect }) => (
  <button
    type="button"
    className={`project-module ${isActive ? "project-module-active" : ""}`}
    onClick={onSelect}
  >
    <span className="module-index">MOD-{String(index + 1).padStart(2, "0")}</span>
    <span className="module-chip">
      <Cpu aria-hidden="true" />
    </span>
    <span className="module-title">{project.title}</span>
    <span className="module-meta">{project.category}</span>
    <span className="module-pins" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  </button>
);

const ProjectLabConsole = () => {
  const [activeSlug, setActiveSlug] = useState(showcaseProjects[0]?.slug);
  const [layerIndex, setLayerIndex] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  const activeProject =
    showcaseProjects.find((project) => project.slug === activeSlug) ||
    showcaseProjects[0];
  const activeLayer = labLayers[layerIndex];

  useEffect(() => {
    setIsBooting(true);
    const bootTimer = window.setTimeout(() => setIsBooting(false), 1050);
    return () => window.clearTimeout(bootTimer);
  }, [activeSlug]);

  if (!activeProject) return null;

  return (
    <motion.div
      className="project-lab-console"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.28 }}
      onWheel={(event) => {
        if (Math.abs(event.deltaY) < 28) return;
        setLayerIndex((current) => {
          if (event.deltaY > 0) return Math.min(labLayers.length - 1, current + 1);
          return Math.max(0, current - 1);
        });
      }}
    >
      <div className="lab-console-header">
        <div>
          <span className="console-eyebrow">
            <Terminal aria-hidden="true" />
            PROJECT LAB
          </span>
          <h3>{activeProject.title}</h3>
        </div>
        <div className="console-status">
          <Activity aria-hidden="true" />
          {isBooting ? "Booting" : activeLayer}
        </div>
      </div>

      <div className="lab-console-body">
        <LayerRail layerIndex={layerIndex} setLayerIndex={setLayerIndex} />
        <ActivePreview
          project={activeProject}
          layer={activeLayer}
          isBooting={isBooting}
        />
      </div>

      <DebugPorts project={activeProject} isBooting={isBooting} />

      <div className="project-module-dock" aria-label="Project modules">
        {showcaseProjects.map((project, index) => (
          <ProjectModule
            key={project.slug}
            project={project}
            index={index}
            isActive={project.slug === activeProject.slug}
            onSelect={() => {
              setActiveSlug(project.slug);
              setLayerIndex(0);
            }}
          />
        ))}
      </div>

      <div className="console-spec-strip" aria-hidden="true">
        <span>
          <Cable />
          input
        </span>
        <span>processing</span>
        <span>control</span>
        <span>
          output
          <Layers3 />
        </span>
      </div>
    </motion.div>
  );
};

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
            <h2 id="projects-title">Interactive Project Console</h2>
            <p>
              Three systems-heavy builds loaded as inspectable project modules
              with live layers, boot states, and debug-port links.
            </p>
          </div>
        </div>

        <ProjectLabConsole />

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
