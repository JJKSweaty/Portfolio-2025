import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBrain,
  faBriefcase,
  faChartLine,
  faMicrochip,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import { SectionWrapper } from "../hoc";

const metrics = [
  {
    label: "Technical Projects",
    value: 8,
    suffix: "+",
    icon: faMicrochip,
    detail:
      "Shipped end-to-end projects across embedded systems, AI tooling, and full-stack builds.",
  },
  {
    label: "Professional Roles",
    value: 5,
    suffix: "",
    icon: faBriefcase,
    detail:
      "Co-op, research, and design-team roles with production-facing deliverables.",
  },
  {
    label: "Infrastructure Uptime",
    value: 99,
    suffix: "%",
    icon: faServer,
    detail:
      "Maintained and supported academic infrastructure with consistently high reliability.",
  },
];

const focusAreas = [
  {
    title: "Embedded Firmware",
    blurb:
      "Designing robust firmware for real-time control, sensing, and communication on constrained hardware.",
    icon: faBolt,
  },
  {
    title: "Hardware + PCB",
    blurb:
      "From board architecture to debug cycles, I build hardware that can be deployed and iterated quickly.",
    icon: faChartLine,
  },
  {
    title: "Applied AI Systems",
    blurb:
      "Using AI where it creates practical leverage: perception, assistants, and engineering automation.",
    icon: faBrain,
  },
];

const AnimatedMetric = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, value, {
      duration: 1.1,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const Highlights = () => {
  return (
    <section className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-center mb-12"
      >
        <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-2">
          Snapshot
        </p>
        <h2 className="display-font text-3xl sm:text-4xl font-semibold text-white">
          Real Outcomes
        </h2>
        <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed max-w-2xl mx-auto mt-4">
          A quick view of what I have actually shipped and the impact of that
          work across firmware, hardware, and systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {metrics.map((metric, index) => (
          <motion.article
            key={metric.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="rounded-2xl border border-white/[0.1] bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] backdrop-blur-sm p-5"
          >
            <div className="flex items-center gap-2 text-[var(--theme-primary)] mb-4">
              <FontAwesomeIcon icon={metric.icon} className="text-sm" />
              <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--theme-primary)]/80">
                Proven
              </span>
            </div>
            <p className="display-font text-3xl font-semibold text-white mb-2">
              <AnimatedMetric value={metric.value} suffix={metric.suffix} />
            </p>
            <h3 className="text-sm font-medium text-slate-200 mb-1">
              {metric.label}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {metric.detail}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {focusAreas.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:border-[var(--theme-primary)]/35 transition-colors duration-300"
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="text-[var(--theme-primary)] text-lg mb-4"
            />
            <h3 className="text-base font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.blurb}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Highlights, "highlights");
