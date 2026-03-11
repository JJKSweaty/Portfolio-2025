import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { AppleHelloEnglishEffect } from "./ui/shadcn-io/apple-hello-effect";
import { faceLogo, resumePdf } from "../assets";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden flex items-center justify-center pt-20 sm:pt-24">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-8%,rgba(140,160,182,0.18),transparent_44%),linear-gradient(180deg,#070b11_0%,#090d14_56%,#070b11_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 sm:-translate-y-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-14 sm:h-20 flex justify-center items-center mb-1 text-[#d8c9b3]">
              <AppleHelloEnglishEffect
                speed={1.05}
                className="h-10 sm:h-14 w-full max-w-[280px] sm:max-w-[360px]"
              />
            </div>

            <h1 className="display-font text-4xl sm:text-6xl md:text-7xl font-semibold text-white leading-[0.95] mb-4">
              I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7edf5] via-[#b6c3d2] to-[#8ca0b6]">
                Jonathan
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-2xl font-medium mb-4">
              Electrical Engineering @ University of Waterloo
            </p>

            <p className="text-slate-300 text-sm sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-7">
              I build embedded systems, design hardware, and tinker with GPU
              acceleration.
            </p>

            <div className="flex justify-center mb-7">
              <img
                src={faceLogo}
                alt="Jonathan Koshy"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[var(--theme-primary)]/35 shadow-[0_0_28px_var(--theme-glow)]"
              />
            </div>

            <div className="flex justify-center flex-wrap items-center gap-3">
              <a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-[var(--theme-primary)]/35 bg-[var(--theme-primary)]/12 text-slate-100 hover:bg-[var(--theme-primary)]/18 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faFileArrowDown} className="text-xs" />
                View Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-white/[0.2] bg-black/30 text-slate-100 hover:text-white hover:border-[var(--theme-primary)]/45 hover:bg-black/45 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faBolt} className="text-xs" />
                View Projects
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
