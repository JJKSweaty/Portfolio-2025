import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const experiences = [
  {
    company: "AeroCardia",
    role: "Embedded Systems Intern",
    period: "Sep 2025 - Dec 2025",
    location: "Toronto, ON",
    summary:
      "Built low-noise biomedical boards and real-time firmware pipelines for high-fidelity sensor acquisition.",
    highlights: [
      "Designed ESP32-S3 PCBs with 7+ sensors and noise-aware analog routing.",
      "Implemented FreeRTOS firmware and BLE telemetry with sub-50 ms stream latency.",
      "Calibrated signal chain to maintain approximately +/-2% measurement accuracy.",
    ],
    stack: ["ESP32-S3", "FreeRTOS", "ESP-IDF", "BLE", "PCB Design"],
    track: "Embedded + Hardware",
  },
  {
    company: "Electrium Mobility",
    role: "Firmware Engineer",
    period: "May 2025 - Sep 2025",
    location: "Waterloo, ON",
    summary:
      "Delivered an embedded dashboard experience for motor and battery monitoring with responsive controls.",
    highlights: [
      "Built a touchscreen UI on ESP32 using FreeRTOS and modular driver architecture.",
      "Integrated BLE feedback loops for wireless VESC communication and live telemetry.",
      "Improved control responsiveness under rapid state changes and noisy sensor updates.",
    ],
    stack: ["ESP32", "FreeRTOS", "BLE", "VESC", "C/C++"],
    track: "Firmware",
  },
  {
    company: "UWARG",
    role: "Embedded Flight Systems",
    period: "Apr 2025 - Present",
    location: "Waterloo, ON",
    summary:
      "Developing flight hardware test tools for safer and more repeatable actuator validation.",
    highlights: [
      "Designed STM32 motor tester architecture for closed-loop servo evaluation.",
      "Configured external ADCs over SPI and mapped sensor values to PWM control curves.",
      "Standardized test workflows to improve repeatability across hardware revisions.",
    ],
    stack: ["STM32", "SPI", "PWM", "ADC", "C/C++"],
    track: "Aerospace Systems",
  },
  {
    company: "UW ECE Department",
    role: "IT Engineer",
    period: "Sep 2024 - Dec 2024",
    location: "Waterloo, ON",
    summary:
      "Maintained reliable infrastructure and automated deployment workflows for academic labs.",
    highlights: [
      "Sustained high-availability server operations and incident response coverage.",
      "Automated workstation imaging pipelines to cut setup time by roughly 50%.",
      "Provided hardware recommendations tailored to course and research workloads.",
    ],
    stack: ["Deployment Services", "Windows Imaging", "Networking", "System Admin"],
    track: "Infrastructure",
  },
  {
    company: "WE Accelerate",
    role: "AI/ML Research",
    period: "Jan 2024 - Apr 2024",
    location: "Remote",
    summary:
      "Built a healthcare guidance assistant with Azure AI and data-driven recommendation flows.",
    highlights: [
      "Shipped chatbot workflows focused on higher diagnosis quality and triage speed.",
      "Improved data processing paths for more consistent recommendation outputs.",
      "Connected frontend interaction patterns to model-backed response pipelines.",
    ],
    stack: ["Azure AI", "JavaScript", "React", "Data Analysis"],
    track: "Applied AI",
  },
];

const Experience = () => {
  const embeddedRoles = experiences.filter((item) =>
    item.track.toLowerCase().includes("embedded")
  ).length;
  const hardwareRoles = experiences.filter((item) =>
    item.track.toLowerCase().includes("hardware")
  ).length;

  const stats = [
    { label: "Roles", value: experiences.length },
    { label: "Embedded", value: embeddedRoles },
    { label: "Hardware", value: hardwareRoles },
    { label: "Latest", value: "2025" },
  ];

  return (
    <section id="work" className="py-16 sm:py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-2">
            Professional Journey
          </p>
          <h2 className="display-font text-3xl sm:text-4xl font-semibold text-white">
            Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed max-w-2xl mx-auto mt-4">
            Product-focused roles across embedded firmware, hardware prototyping,
            and applied AI systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            className="h-fit lg:sticky lg:top-24 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-2">
              Snapshot
            </p>
            <h3 className="text-xl font-semibold text-white mb-3">Hands-On Builder</h3>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              End-to-end delivery from schematic and firmware to test tooling,
              validation, and product-facing UX.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2.5"
                >
                  <p className="text-lg font-semibold text-white leading-none">{item.value}</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.12em]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>

          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--theme-primary)]/40 via-white/10 to-transparent" />

            <div className="space-y-5 sm:space-y-6">
              {experiences.map((exp, index) => (
                <motion.article
                  key={`${exp.company}-${exp.period}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="relative pl-8 sm:pl-10"
                >
                  <span className="absolute left-[3px] top-7 w-4 h-4 rounded-full border border-[var(--theme-primary)]/40 bg-[#090b0d] shadow-[0_0_0_4px_rgba(7,8,9,0.9)]" />

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6 hover:border-[var(--theme-primary)]/30 transition-colors duration-300">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] rounded-full bg-[var(--theme-primary)]/15 text-[var(--theme-primary)]/90 border border-[var(--theme-primary)]/25">
                        {exp.period}
                      </span>
                      <span className="px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                        {exp.track}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      {exp.company}
                      <span className="text-slate-500"> | {exp.location}</span>
                    </p>

                    <p className="text-sm sm:text-[15px] text-slate-400 leading-relaxed mt-4 mb-4">
                      {exp.summary}
                    </p>

                    <ul className="space-y-2 mb-5">
                      {exp.highlights.map((point) => (
                        <li
                          key={point}
                          className="text-sm text-slate-300/90 leading-relaxed break-words flex gap-2.5"
                        >
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-[10px] text-[var(--theme-primary)] mt-[7px]"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-md text-[var(--theme-primary)]/80 bg-[var(--theme-primary)]/[0.08] ring-1 ring-inset ring-[var(--theme-primary)]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
