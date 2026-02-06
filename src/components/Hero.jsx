import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { AppleHelloEnglishEffect } from "./ui/shadcn-io/apple-hello-effect";
import ParticleBackground from "./ParticleBackground";
import { faceLogo, resumePdf } from "../assets";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden flex items-center justify-center pt-16 sm:pt-20">
      <ParticleBackground />

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,#070809_0%,#0a0b0d_58%,#070809_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 -translate-y-8 sm:-translate-y-10">
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

            <h1 className="display-font text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-none mb-4">
              I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7ebd2] via-[#d8c4a5] to-[#9de6c5]">
                Jonathan
              </span>
            </h1>

            <p className="text-[#d9d2c6] text-lg sm:text-2xl font-medium mb-4">
              Electrical Engineering @ University of Waterloo
            </p>

            <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-7">
              I build embedded systems, design hardware, and tinker with GPU
              acceleration.
            </p>

            <div className="flex justify-center mb-7">
              <img
                src={faceLogo}
                alt="Jonathan Koshy"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#9de6c5]/35 shadow-[0_0_40px_rgba(157,230,197,0.15)]"
              />
            </div>

            <div className="flex justify-center flex-wrap items-center gap-3">
              <a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-[#d8c4a5]/45 bg-gradient-to-r from-[#d8c4a5]/20 to-[#9de6c5]/20 text-[#f2eadb] hover:from-[#d8c4a5]/30 hover:to-[#9de6c5]/30 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faFileArrowDown} className="text-xs" />
                View Resume
              </a>
              <a
                href="#skills"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-[#9de6c5]/30 bg-slate-900/55 text-slate-100 hover:text-white hover:border-[#9de6c5]/60 hover:bg-slate-900/80 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faBolt} className="text-xs" />
                Explore Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
