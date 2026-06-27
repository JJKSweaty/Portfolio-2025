import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { DitherShader } from "./ui/dither-shader";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const bootSequence = [
  "initializing portfolio...",
  "loading firmware engineer profile...",
  "ready",
];

const BOOT_STORAGE_KEY = "portfolio-boot-complete";
const skylineImage = "/images/torontophoto.jpg";

const contentVariants = {
  booting: { opacity: 0, y: 18 },
  ready: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  const { person, socials } = portfolio;
  const [bootComplete, setBootComplete] = useState(
    () => window.sessionStorage.getItem(BOOT_STORAGE_KEY) === "true"
  );

  useEffect(() => {
    if (bootComplete) return undefined;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const bootTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(BOOT_STORAGE_KEY, "true");
      setBootComplete(true);
    }, prefersReducedMotion ? 80 : 1900);

    return () => window.clearTimeout(bootTimer);
  }, [bootComplete]);

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <AnimatePresence>
        {!bootComplete && (
          <motion.div
            className="hero-boot-overlay"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="boot-terminal terminal-window">
              <div className="terminal-window-bar">
                <span className="traffic-lights" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>portfolio_init</span>
              </div>
              <div className="boot-terminal-body">
                <p className="boot-command">jjk@portfolio ~ % ./start</p>
                {bootSequence.map((line, index) => (
                  <p
                    className="boot-line"
                    key={line}
                    style={{
                      "--boot-delay": `${0.22 + index * 0.28}s`,
                      "--line-width": `${line.length + 2}ch`,
                    }}
                  >
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="site-container hero-shell"
        initial={bootComplete ? false : "booting"}
        animate={bootComplete ? "ready" : "booting"}
        variants={contentVariants}
      >
        <div className="hero-composition">
          <div className="hero-copy">
            <h1 id="hero-title">{person.name}</h1>
            <p className="hero-title">{person.title}</p>
            <div className="hero-two-line">
              <p>
                University of Waterloo Electrical Engineering student building
                low-level software for sensing, control, communication, and edge compute.
              </p>
              <p>
                Interested in firmware, embedded systems, embedded Linux, GPU systems,
                and hardware-software integration.
              </p>
            </div>

          </div>

          <div className="hero-visual-system" aria-label="Toronto skyline and profile photo">
            <div className="hero-image-frame hero-skyline-frame">
              <DitherShader
                src={skylineImage}
                gridSize={1}
                ditherMode="bayer"
                colorMode="color"
                primaryColor="#2f2a26"
                secondaryColor="#fbf8f2"
                threshold={0.46}
                objectFit="cover"
                className="hero-dither-canvas hero-skyline-canvas"
                ariaLabel="Dithered Toronto skyline with the CN Tower"
              />
            </div>

            <div className="hero-profile-row">
              <div className="hero-image-frame hero-portrait-frame">
                <img
                  src={person.headshot}
                  alt={person.name}
                  width="280"
                  height="280"
                  className="hero-portrait-photo"
                />
              </div>

              <div className="hero-connect">
                <div className="hero-actions">
                  <a className="button button-primary" href="#projects">
                    View Projects
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a className="button button-secondary" href={person.resumePath}>
                    <FileText size={16} aria-hidden="true" />
                    View Resume
                  </a>
                </div>

                <div className="hero-links" aria-label="External profile links">
                  {socials.map((link) => {
                    const Icon = socialIcons[link.label] || ArrowRight;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      >
                        <Icon size={16} aria-hidden="true" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
