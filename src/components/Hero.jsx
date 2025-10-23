import React from 'react';
import { motion } from "framer-motion";
import AnimatedName from "./AnimatedName";
import { AppleHelloEnglishEffect } from "./ui/shadcn-io/apple-hello-effect";
import ParticleBackground from "./ParticleBackground";
import { styles } from "../styles";
import styled from 'styled-components';

const StyledGlitchButton = styled.a`
  button, button::after {
    padding: 5px 20px;
    font-size: 24px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: transparent;
    position: relative;
  }

  button::after {
    --move1: inset(50% 50% 50% 50%);
    --move2: inset(31% 0 40% 0);
    --move3: inset(39% 0 15% 0);
    --move4: inset(45% 0 40% 0);
    --move5: inset(45% 0 6% 0);
    --move6: inset(14% 0 61% 0);
    clip-path: var(--move1);
    content: '↓';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
  }

  button:hover::after {
    animation: glitch_4011 1s;
    text-shadow: 10 10px 10px black;
    animation-timing-function: steps(2, end);
    text-shadow: -3px -3px 0px #1df2f0, 3px 3px 0px #E94BE8;
    background-color: transparent;
    border: 3px solid rgb(0, 255, 213);
  }

  button:hover {
    text-shadow: -1px -1px 0px #1df2f0, 1px 1px 0px #E94BE8;
  }

  button:hover {
    background-color: transparent;
    border: 1px solid rgb(0, 255, 213);
    box-shadow: 0px 10px 10px -10px rgb(0, 255, 213);
  }

  @keyframes glitch_4011 {
    0% {
      clip-path: var(--move1);
      transform: translate(0px,-10px);
    }

    10% {
      clip-path: var(--move2);
      transform: translate(-10px,10px);
    }

    20% {
      clip-path: var(--move3);
      transform: translate(10px,0px);
    }

    30% {
      clip-path: var(--move4);
      transform: translate(-10px,10px);
    }

    40% {
      clip-path: var(--move5);
      transform: translate(10px,-10px);
    }

    50% {
      clip-path: var(--move6);
      transform: translate(-10px,10px);
    }

    60% {
      clip-path: var(--move1);
      transform: translate(10px,-10px);
    }

    70% {
      clip-path: var(--move3);
      transform: translate(-10px,10px);
    }

    80% {
      clip-path: var(--move2);
      transform: translate(10px,-10px);
    }

    90% {
      clip-path: var(--move4);
      transform: translate(-10px,10px);
    }

    100% {
      clip-path: var(--move1);
      transform: translate(0);
    }
  }
`;

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto bg-black flex items-center justify-center overflow-hidden">
      {/* Particle background */}
      <ParticleBackground />
      
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-20 sm:h-24 md:h-32 flex justify-center items-center mb-2 sm:mb-4 text-[var(--theme-primary)]">
            <AppleHelloEnglishEffect 
              speed={1.1}
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px]"
            />
          </div>
          
          <h1 className={`${styles.heroHeadText} text-[var(--theme-primary)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8`}>
            I'm Jonathan
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 px-2 leading-relaxed"
          >
            I'm a University of Waterloo Electrical Engineering student. I develop embedded systems, hardware designs and experimenting with GPU Acceleration using CUDA.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap px-2"
          >
            <a 
              href="#work"
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg
                       border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] rounded-md 
                       hover:bg-[var(--theme-primary)] hover:text-black transition-all duration-300
                       shadow-[0_0_10px_var(--theme-glow)] hover:shadow-[0_0_20px_var(--theme-glow)]
                       transform hover:-translate-y-1 active:translate-y-0"
            >
              Experience
            </a>
            <a 
              href="#projects"
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg
                       border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] rounded-md 
                       hover:bg-[var(--theme-primary)] hover:text-black transition-all duration-300
                       shadow-[0_0_10px_var(--theme-glow)] hover:shadow-[0_0_20px_var(--theme-glow)]
                       transform hover:-translate-y-1 active:translate-y-0"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 sm:bottom-8 w-full flex justify-center items-center">
        <StyledGlitchButton href="#skills">
          <motion.button
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            ↓
          </motion.button>
        </StyledGlitchButton>
      </div>
    </section>
  );
};

export default Hero;