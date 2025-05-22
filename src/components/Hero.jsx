import React from 'react';
import { motion } from "framer-motion";
import AnimatedName from "./AnimatedName";
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
    <section className="relative w-full h-screen mx-auto bg-black flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`${styles.heroHeadText} text-[#64ffda] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5`}>
            Hi, I'm
          </h1>
          <div className="h-[1.2em] flex justify-center items-center mb-18">
            <AnimatedName/>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-xl md:text-2xl mb-8"
          >
            I'm a University of Waterloo Electrical Engineering student. I develop full stack web applications, embedded systems, and hardware designs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-6"
          >
            <a 
              href="#work"
              className="px-8 py-3 border-2 border-[#64ffda] text-[#64ffda] rounded-md 
                       hover:bg-[#64ffda] hover:text-black transition-all duration-300
                       shadow-[0_0_15px_rgba(100,255,218,0.3)] hover:shadow-[0_0_25px_rgba(100,255,218,0.5)]"
            >
              Experience
            </a>
            <a 
              href="#projects"
              className="px-8 py-3 border-2 border-[#64ffda] text-[#64ffda] rounded-md 
                       hover:bg-[#64ffda] hover:text-black transition-all duration-300
                       shadow-[0_0_15px_rgba(100,255,218,0.3)] hover:shadow-[0_0_25px_rgba(100,255,218,0.5)]"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 w-full flex justify-center items-center">
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