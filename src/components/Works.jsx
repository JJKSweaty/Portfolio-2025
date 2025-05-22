import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMicrochip } from '@fortawesome/free-solid-svg-icons';

const StyledGlitchButton = styled.a`
  button {
    padding: 10px 50px;
    font-size: 20px;
    border: 1px solid #64ffda;
    border-radius: 5px;
    color: #64ffda;
    background-color: transparent;
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
  }

  button:hover {
    background-color: rgba(100, 255, 218, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.2);
  }
`;

const ProjectCard = ({ index, name, description, tags, image, source_code_link, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full h-full flex justify-center"
    >
      <div className="group relative min-h-[360px] w-full max-w-[320px]">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-500/10 h-full">
          <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
          <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
          
          <div className="relative p-4 flex flex-col h-full">
            <div className="flex flex-col items-center text-center">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-2">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                <FontAwesomeIcon 
                  icon={type === 'hardware' ? faMicrochip : faCode} 
                  className="text-xl text-white"
                />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">{name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Project</span>
                {source_code_link && (
                  <a
                    href={source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/save flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 transition-colors hover:bg-slate-800"
                  >
                    <img
                      src={github}
                      alt="source code"
                      className="h-4 w-4 text-slate-400 transition-colors group-hover/save:text-emerald-500"
                    />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-2 flex flex-wrap justify-center gap-1.5 min-h-[50px]">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className={`inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-500 ${tag.color}`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            <div className="mt-2 flex-grow">
              <p className="text-xs leading-relaxed text-slate-400 text-center mb-0">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [activeTab, setActiveTab] = useState('software');

  const softwareProjects = projects.filter(project => project.type === 'software');
  const hardwareProjects = projects.filter(project => project.type === 'hardware');

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-4xl font-bold text-[#64ffda] text-center mb-8">Projects</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 text-white text-[17px] max-w-[1100px] leading-[30px]'
        >
         I've tackled a range of software and hardware challenges across full-stack, embedded systems and some hardware design. I built an ESP32 Media Controller with Flask for music playback and Discord voice controls, developed SignToLearn (React, Flask, OpenCV, MediaPipe) achieving 90% real-time ASL recognition, and created FaceAuthVote secure voting dashboard using OpenCV face authentication with embeddings stored in Supabase. On the hardware side, I engineered an STM32-based motor tester using SPI and PWM, and designed a heartbeat monitor PCB in KiCad with the MAX30102 sensor.
        </motion.p>
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('software')}
          className={`px-6 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'software'
              ? 'bg-[#64ffda] text-black'
              : 'text-white hover:bg-[#64ffda]/10'
          }`}
        >
          Software
        </button>
        <button
          onClick={() => setActiveTab('hardware')}
          className={`px-6 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'hardware'
              ? 'bg-[#64ffda] text-black'
              : 'text-white hover:bg-[#64ffda]/10'
          }`}
        >
          Hardware
        </button>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-8">
        <AnimatePresence mode="wait">
          {activeTab === 'software' ? (
            <motion.div
              key="software"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4"
            >
              {softwareProjects.map((project, index) => (
                <ProjectCard key={index} index={index} {...project} type="software" />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="hardware"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4"
            >
              {hardwareProjects.map((project, index) => (
                <ProjectCard key={index} index={index} {...project} type="hardware" />
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: hardwareProjects.length * 0.1 }}
                className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-8"
              >
                <a
                  href="/hardware-portfolio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-[#64ffda] text-[#64ffda] rounded-md \
                         hover:bg-[#64ffda] hover:text-black transition-all duration-300\n                         shadow-[0_0_15px_rgba(100,255,218,0.3)] hover:shadow-[0_0_25px_rgba(100,255,218,0.5)]"
                >
                  View Hardware Portfolio
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'projects');