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

  const handleClick = () => {
    if (hasRoute) {
      navigate(project.route);
      window.scrollTo(0, 0);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group h-full relative"
    >
      <div
        className={`relative h-full flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[var(--theme-primary)]/30 hover:bg-white/[0.04] hover:shadow-[0_0_40px_-12px_var(--theme-glow)] ${hasRoute ? "cursor-pointer" : ""}`}
        onClick={handleClick}
        role={hasRoute ? "link" : undefined}
        tabIndex={hasRoute ? 0 : undefined}
        onKeyDown={(event) => event.key === "Enter" && handleClick()}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-black/40 flex-shrink-0">
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
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : project.demoVideo && getYouTubeId(project.demoVideo) ? (
            <img
              src={`https://img.youtube.com/vi/${getYouTubeId(project.demoVideo)}/hqdefault.jpg`}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 w-20 h-20 -m-4 rounded-full bg-[var(--theme-primary)]/5 blur-2xl" />
                <FontAwesomeIcon
                  icon={project.type === "hardware" ? faMicrochip : faCode}
                  className="text-4xl text-[var(--theme-primary)]/20 relative z-10"
                />
              </div>
            </div>
          )}

          {hasDemo && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onOpenDemo(project);
              }}
              className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-md border border-white/[0.18] bg-black/55 px-2.5 py-1 text-[11px] text-white hover:border-[var(--theme-primary)]/50 hover:text-[var(--theme-primary)] transition-colors"
            >
              <FontAwesomeIcon icon={faPlay} className="text-[10px]" />
              Quick Demo
            </button>
          )}

          {project.source_code_link && (
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="absolute top-2.5 right-2.5 flex items-center justify-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:border-[var(--theme-primary)]/50"
              aria-label="View source on GitHub"
            >
              <img src={github} alt="" className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4 sm:p-5">
          <h3 className="text-[15px] font-semibold text-white leading-tight mb-1.5">
            {project.name}
          </h3>

          <p className="text-[13px] leading-relaxed text-slate-400 mb-3 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag.name}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md text-[var(--theme-primary)]/70 bg-[var(--theme-primary)]/[0.06] ring-1 ring-inset ring-[var(--theme-primary)]/10"
              >
                {tag.name}
              </span>
            ))}
          </div>

          {hasRoute && (
            <div className="mt-3 pt-3 border-t border-white/[0.04]">
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--theme-primary)]/80 font-medium group-hover:text-[var(--theme-primary)] transition-colors">
                View Details
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-[10px] transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Works = () => {
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

  const openDemo = (project) => {
    const url = project.demoVideoMp4 || project.demoVideo;
    if (!url) return;

    setActiveDemo({
      name: project.name,
      url,
      isMp4: Boolean(project.demoVideoMp4),
    });
  };

  return (
    <>
      <motion.div variants={textVariant()} className="text-center mb-4">
        <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-2">
          What I&apos;ve Built
        </p>
        <h2 className="display-font text-3xl sm:text-4xl font-semibold text-white">
          Projects
        </h2>
      </motion.div>

      <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed text-center max-w-2xl mx-auto mb-8">
        From CUDA-accelerated neural nets to custom PCBs and embedded
        dashboards, this is the software and hardware work I enjoy building.
      </p>

      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex justify-center flex-wrap gap-2 mb-4">
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat.key === "all"
                  ? projects.length
                  : projects.filter((project) => project.category === cat.key)
                      .length;
              if (count === 0 && cat.key !== "all") return null;
              const isActive = activeCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                    isActive
                      ? "bg-[var(--theme-primary)]/15 text-[var(--theme-primary)] border-[var(--theme-primary)]/30"
                      : "text-slate-400 border-white/[0.06] hover:text-white hover:border-white/10"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 ${
                      isActive
                        ? "text-[var(--theme-primary)]/60"
                        : "text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative max-w-xl mx-auto">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by tech, project name, or topic..."
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm text-white placeholder:text-slate-500 pl-9 pr-3 py-2.5 focus:outline-none focus:border-[var(--theme-primary)]/45 transition-colors"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${query}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {filtered.map((project, idx) => (
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

