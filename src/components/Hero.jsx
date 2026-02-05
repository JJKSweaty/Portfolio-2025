import React from 'react';
import { motion } from "framer-motion";
import { AppleHelloEnglishEffect } from "./ui/shadcn-io/apple-hello-effect";
import ParticleBackground from "./ParticleBackground";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto bg-black flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* animated hello */}
          <div className="h-16 sm:h-20 md:h-24 flex justify-center items-center mb-4 text-[var(--theme-primary)]">
            <AppleHelloEnglishEffect 
              speed={1.1}
              className="h-10 sm:h-14 md:h-18 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[420px]"
            />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            I'm <span className="text-[var(--theme-primary)]">Jonathan</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Electrical Engineering @ UWaterloo.{' '}
            <span className="text-slate-300">
              I build embedded systems, design hardware, and tinker with GPU acceleration.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <a 
              href="#projects"
              className="px-6 py-2.5 text-sm font-medium rounded-lg
                       bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] 
                       border border-[var(--theme-primary)]/30
                       hover:bg-[var(--theme-primary)]/20 hover:border-[var(--theme-primary)]/50
                       transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a 
              href="#work"
              className="px-6 py-2.5 text-sm font-medium rounded-lg
                       text-slate-300 border border-white/[0.08]
                       hover:text-white hover:border-white/20 hover:bg-white/[0.04]
                       transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Experience
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <motion.a
          href="#skills"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-500 hover:text-[var(--theme-primary)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;