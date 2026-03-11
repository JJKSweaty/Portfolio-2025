import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { textVariant } from "../utils/motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faCode,
  faMagnifyingGlass,
  faMicrochip,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  { key: "all", label: "All" },
  { key: "embedded", label: "Embedded" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "full-stack", label: "Full-Stack" },
  { key: "hardware", label: "Hardware" },
];

const getYouTubeId = (url) => {
  if (!url) return null;
  const regex =
    /(?:youtube(?:-nocookie)?\.com\/(?:.*v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  if (match?.[1]) return match[1];
  const lastPath = url.split("/").pop();
  if (lastPath?.length === 11) return lastPath;
  return null;
};

const ProjectCard = ({ project, index, onOpenDemo }) => {
  const navigate = useNavigate();
  const hasRoute = Boolean(project.route);
  const hasDemo = Boolean(project.demoVideo || project.demoVideoMp4);
  const youtubeId = getYouTubeId(project.demoVideo);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <div className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden hover:border-[var(--theme-primary)]/35 hover:bg-white/[0.035] transition-all duration-300">
        <div className="relative aspect-[16/10] overflow-hidden bg-black/45">
          {project.demoVideoMp4 ? (
            <video
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              src={`${project.demoVideoMp4}#t=0.1`}
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : youtubeId ? (
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={project.type === "hardware" ? faMicrochip : faCode}
                className="text-4xl text-[var(--theme-primary)]/30"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute top-2.5 right-2.5 flex items-center gap-2">
            {project.source_code_link && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-black/55 border border-white/15 hover:border-[var(--theme-primary)]/50 transition-colors"
                aria-label="View source on GitHub"
              >
                <img src={github} alt="" className="w-4 h-4" />
              </a>
            )}
            {project.devpost_link && (
              <a
                href={project.devpost_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-black/55 border border-white/15 hover:border-[var(--theme-primary)]/50 transition-colors"
                aria-label="View project on Devpost"
              >
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-xs text-white/85"
                />
              </a>
            )}
          </div>

          {hasDemo && (
            <button
              onClick={() => onOpenDemo(project)}
              className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-md border border-white/[0.2] bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white hover:border-[var(--theme-primary)]/55 hover:text-[var(--theme-primary)] transition-colors"
            >
              <FontAwesomeIcon icon={faPlay} className="text-[10px]" />
              Demo
            </button>
          )}
        </div>

        <div className="p-4 sm:p-5 flex flex-col h-[calc(100%-1px)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] rounded-full bg-[var(--theme-primary)]/15 text-[var(--theme-primary)]/90">
              {project.type}
            </span>
            <span className="text-[11px] text-slate-500 uppercase tracking-[0.1em]">
              {project.category}
            </span>
          </div>

          <h3 className="text-base font-semibold text-white leading-tight mb-2">
            {project.name}
          </h3>

          <p className="text-sm leading-relaxed text-slate-400 mb-4 break-words">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag.name}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md text-[var(--theme-primary)]/75 bg-[var(--theme-primary)]/[0.06] ring-1 ring-inset ring-[var(--theme-primary)]/15"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className="mt-auto">
            {hasRoute ? (
              <button
                onClick={() => {
                  navigate(project.route);
                  window.scrollTo(0, 0);
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--theme-primary)] hover:text-[var(--theme-primary)]/85 transition-colors"
              >
                View case study
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            ) : project.source_code_link ? (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--theme-primary)] hover:text-[var(--theme-primary)]/85 transition-colors"
              >
                View source
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Works = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [activeDemo, setActiveDemo] = useState(null);

  const filtered = useMemo(() => {
    const categoryFiltered =
      activeCategory === "all"
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    const search = query.trim().toLowerCase();
    if (!search) return categoryFiltered;

    return categoryFiltered.filter((project) => {
      const combined = [
        project.name,
        project.description,
        project.type,
        project.category,
        ...project.tags.map((tag) => tag.name),
      ]
        .join(" ")
        .toLowerCase();

      return combined.includes(search);
    });
  }, [activeCategory, query]);

  const featuredProject = useMemo(() => {
    if (!filtered.length) return null;
    return (
      filtered.find((project) => project.featured) ||
      filtered.find((project) => project.route) ||
      filtered[0]
    );
  }, [filtered]);

  const gridProjects = useMemo(() => {
    if (!featuredProject) return filtered;
    return filtered.filter((project) => project.name !== featuredProject.name);
  }, [filtered, featuredProject]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const hardware = filtered.filter((project) => project.type === "hardware").length;
    const software = filtered.filter((project) => project.type === "software").length;
    const caseStudies = filtered.filter((project) => Boolean(project.route)).length;

    return [
      { label: "Showing", value: total },
      { label: "Hardware", value: hardware },
      { label: "Software", value: software },
      { label: "Case Studies", value: caseStudies },
    ];
  }, [filtered]);

  const openDemo = (project) => {
    const url = project.demoVideoMp4 || project.demoVideo;
    if (!url) return;

    setActiveDemo({
      name: project.name,
      url,
      isMp4: Boolean(project.demoVideoMp4),
    });
  };

  const featuredVideoId = getYouTubeId(featuredProject?.demoVideo);
  const featuredHasDemo = Boolean(featuredProject?.demoVideo || featuredProject?.demoVideoMp4);

  return (
    <>
      <motion.div variants={textVariant()} className="text-center mb-4">
        <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-2">
          Selected Work
        </p>
        <h2 className="display-font text-3xl sm:text-4xl font-semibold text-white">
          Project Showcase
        </h2>
      </motion.div>

      <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed text-center max-w-2xl mx-auto mb-8">
        Embedded systems, AI tooling, and full-stack builds with a focus on reliability,
        practical performance, and clean execution.
      </p>

      <div className="max-w-6xl mx-auto mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5 sm:p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => {
            const count =
              cat.key === "all"
                ? projects.length
                : projects.filter((project) => project.category === cat.key).length;
            if (count === 0 && cat.key !== "all") return null;

            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  isActive
                    ? "bg-[var(--theme-primary)]/15 text-[var(--theme-primary)] border-[var(--theme-primary)]/35"
                    : "text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
                <span className={`ml-1.5 ${isActive ? "text-[var(--theme-primary)]/60" : "text-slate-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2.5 text-center"
            >
              <p className="text-lg font-semibold text-white leading-none">{item.value}</p>
              <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-[0.1em]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative max-w-xl">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by tech, project name, or topic..."
            className="w-full rounded-xl border border-white/[0.1] bg-black/25 text-sm text-white placeholder:text-slate-500 pl-9 pr-3 py-2.5 focus:outline-none focus:border-[var(--theme-primary)]/45 transition-colors"
          />
        </div>
      </div>

      {featuredProject && (
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-4 sm:p-5">
            <div className="rounded-2xl border border-white/[0.08] bg-black/35 p-3 sm:p-4">
              <div className="relative mx-auto w-full max-w-[560px] aspect-[16/9] rounded-xl overflow-hidden bg-black/55">
                {featuredProject.demoVideoMp4 ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    autoPlay
                    preload="metadata"
                    src={`${featuredProject.demoVideoMp4}#t=0.1`}
                  />
                ) : featuredProject.image ? (
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : featuredVideoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${featuredVideoId}/hqdefault.jpg`}
                    alt={featuredProject.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={featuredProject.type === "hardware" ? faMicrochip : faCode}
                      className="text-5xl text-[var(--theme-primary)]/35"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] rounded-full bg-[var(--theme-primary)]/18 text-[var(--theme-primary)]/95 border border-[var(--theme-primary)]/30">
                    Featured
                  </span>
                  <span className="px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] rounded-full bg-black/45 text-slate-200 border border-white/15">
                    {featuredProject.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-2">
                Spotlight Project
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight mb-3">
                {featuredProject.name}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-slate-300 mb-4 break-words">
                {featuredProject.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-md text-[var(--theme-primary)]/80 bg-[var(--theme-primary)]/[0.08] ring-1 ring-inset ring-[var(--theme-primary)]/20"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {featuredProject.route && (
                  <button
                    onClick={() => {
                      navigate(featuredProject.route);
                      window.scrollTo(0, 0);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--theme-primary)]/16 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30 hover:bg-[var(--theme-primary)]/22 transition-colors"
                  >
                    View case study
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                )}
                {featuredHasDemo && (
                  <button
                    onClick={() => openDemo(featuredProject)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/[0.2] text-white hover:border-[var(--theme-primary)]/50 hover:text-[var(--theme-primary)] transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlay} className="text-xs" />
                    Watch demo
                  </button>
                )}
                {featuredProject.source_code_link && (
                  <a
                    href={featuredProject.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/[0.2] text-slate-200 hover:text-white hover:border-white/35 transition-colors"
                  >
                    Source
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${query}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {gridProjects.map((project, idx) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={idx}
              onOpenDemo={openDemo}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-slate-500 mt-8">
          No project matched your search. Try another keyword.
        </p>
      )}

      <AnimatePresence>
        {activeDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setActiveDemo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 border-b border-white/[0.06]">
                <span className="text-white text-sm font-medium ml-2">
                  {activeDemo.name} Demo
                </span>
                <button
                  onClick={() => setActiveDemo(null)}
                  className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close demo modal"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div className="relative aspect-video bg-black">
                {activeDemo.isMp4 ? (
                  <video
                    src={activeDemo.url}
                    className="absolute inset-0 w-full h-full"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  (() => {
                    const videoId = getYouTubeId(activeDemo.url);
                    const embedUrl = videoId
                      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                      : activeDemo.url;
                    return (
                      <iframe
                        src={embedUrl}
                        title="Project Demo"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  })()
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(Works, "projects");
