import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    company: "Vitruvius Innovation",
    role: "Embedded Systems Intern",
    period: "Sep 2025 – Dec 2025",
    description:
      "Designed custom low-noise PCBs with ESP32-S3 and 7+ biomedical sensors. Built FreeRTOS firmware streaming multi-sensor data via BLE with sub-50 ms latency and ±2% calibration accuracy.",
    technologies: ["ESP32-S3", "FreeRTOS", "ESP-IDF", "BLE", "PCB Design"],
  },
  {
    company: "Electrium Mobility",
    role: "Firmware Engineer",
    period: "May 2025 – Sep 2025",
    description:
      "Built a touchscreen dashboard on ESP32 with FreeRTOS showing real-time motor and battery telemetry. Integrated BLE sensor feedback for responsive wireless VESC communication.",
    technologies: ["FreeRTOS", "ESP32", "BLE", "C/C++"],
  },
  {
    company: "UW Aerial Robotics (UWARG)",
    role: "Embedded Flight Systems",
    period: "Apr 2025 – Present",
    description:
      "Designed a motor tester system using STM32, SPI, and PWM to evaluate servo motors. Configured external ADCs via SPI and mapped readings to PWM duty cycles for motor control.",
    technologies: ["STM32", "SPI", "PWM", "ADC", "C/C++"],
  },
  {
    company: "UW ECE Department",
    role: "IT Engineer",
    period: "Sep 2024 – Dec 2024",
    description:
      "Maintained server environments with 99% uptime. Automated computer deployment via Microsoft Deployment Services, cutting setup time by 50%.",
    technologies: ["Deployment Services", "Networking", "System Admin"],
  },
  {
    company: "WE Accelerate",
    role: "AI/ML Research",
    period: "Jan 2024 – Apr 2024",
    description:
      "Built a healthcare chatbot using Azure AI, improving diagnosis accuracy by 30%. Optimized data workflows for patient recommendations.",
    technologies: ["Azure AI", "JavaScript", "React"],
  },
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current && hasInteracted) {
      const timer = setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, hasInteracted]);

  const active = experiences[activeIndex];

  return (
    <section id="work" className="min-h-[70vh] py-20 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-2">
            Where I've Worked
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Experience
          </h2>
        </motion.div>

        {/* ── horizontal timeline (desktop) / vertical list (mobile) ── */}
        <div className="relative mb-10">
          {/* horizontal line (desktop) */}
          <div className="hidden md:block absolute top-3 left-0 right-0 h-px bg-white/[0.06]" />

          <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0 relative">
            {experiences.map((exp, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  onClick={() => { setActiveIndex(i); setHasInteracted(true); }}
                  className={`group relative flex md:flex-col items-center md:items-center gap-3 md:gap-2 text-left md:text-center px-3 py-2 md:p-0 rounded-lg md:rounded-none transition-all duration-200
                    ${isActive ? 'bg-white/[0.04] md:bg-transparent' : 'hover:bg-white/[0.02] md:hover:bg-transparent'}`}
                >
                  {/* dot */}
                  <div
                    className={`w-2.5 h-2.5 flex-shrink-0 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-glow)]'
                        : 'bg-transparent border-white/20 group-hover:border-white/40'
                    }`}
                  />
                  {/* label */}
                  <div>
                    <p className={`text-xs font-medium transition-colors ${
                      isActive ? 'text-[var(--theme-primary)]' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {exp.company}
                    </p>
                    <p className="text-[10px] text-slate-500 hidden md:block">{exp.period.split(' – ')[0]}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── detail card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            ref={cardRef}
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 max-w-3xl mx-auto"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--theme-primary)]">
                {active.company}
              </h3>
              <p className="text-sm text-white font-medium">{active.role}</p>
              <p className="text-xs text-slate-500 mt-0.5">{active.period}</p>
            </div>

            <p className="text-[14px] leading-relaxed text-slate-400 mb-5">
              {active.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {active.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md
                             text-[var(--theme-primary)]/70 bg-[var(--theme-primary)]/[0.06] ring-1 ring-inset ring-[var(--theme-primary)]/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Experience;
