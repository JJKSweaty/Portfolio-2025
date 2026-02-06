import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faCode } from "@fortawesome/free-solid-svg-icons";

const skillGroups = {
  hardware: [
    { category: "Microcontrollers", skills: ["ESP32-S3", "STM32", "Arduino", "Raspberry Pi"] },
    { category: "Protocols", skills: ["SPI", "I2C", "UART", "BLE", "USB"] },
    { category: "Design Tools", skills: ["KiCad", "Altium", "Oscilloscope", "Logic Analyzer", "Multimeter"] },
    { category: "Frameworks", skills: ["ESP-IDF", "FreeRTOS", "PlatformIO", "STM32CubeIDE"] },
  ],
  software: [
    { category: "Languages", skills: ["Python", "C/C++", "TypeScript", "Java", "CUDA"] },
    { category: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "Three.js"] },
    { category: "AI / ML", skills: ["PyTorch", "TensorFlow", "OpenCV", "MediaPipe", "YOLO"] },
    { category: "Backend & Infra", skills: ["Node.js", "Flask", "Supabase", "Git", "Docker"] },
  ],
};

const SkillCategory = ({ category, skills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: index * 0.1 }}
    className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 hover:border-white/[0.1] transition-colors duration-300"
  >
    <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--theme-primary)]/70 mb-4">
      {category}
    </h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: index * 0.08 + i * 0.03 }}
          className="px-3 py-1.5 text-[13px] font-medium rounded-lg
                     text-slate-300 bg-white/[0.03] border border-white/[0.06]
                     hover:text-white hover:border-white/[0.12] hover:bg-white/[0.06]
                     transition-all duration-200 cursor-default"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const [activeTab, setActiveTab] = useState("hardware");

  const tabs = [
    { key: "hardware", label: "Hardware", icon: faMicrochip },
    { key: "software", label: "Software", icon: faCode },
  ];

  return (
    <>
      <motion.div variants={textVariant()} className="text-center mb-4">
        <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-2">
          What I Work With
        </p>
        <h2 className="display-font text-3xl sm:text-4xl font-semibold text-white">
          Skills
        </h2>
      </motion.div>

      <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed text-center max-w-lg mx-auto mb-10">
        Technologies I use across embedded, full-stack, and ML work.
      </p>

      {/* tab switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-5 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-white/[0.08] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className="text-[10px]" />
              {tab.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key
                    ? "bg-[var(--theme-primary)]/15 text-[var(--theme-primary)]"
                    : "bg-white/[0.04] text-slate-500"
                }`}
              >
                {skillGroups[tab.key].reduce((acc, g) => acc + g.skills.length, 0)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* skill cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          {skillGroups[activeTab].map((group, idx) => (
            <SkillCategory
              key={group.category}
              category={group.category}
              skills={group.skills}
              index={idx}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(Skills, "skills");

