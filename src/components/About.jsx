import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import CyberCard from './CyberCard';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('hardware');

  const softwareSkills = [
    {
      title: "FRONTEND",
      subtitle: "Tailwind CSS, Next.js",
      highlight: "React.Js"
    },
    {
      title: "BACKEND",
      subtitle: "C/C++, Java",
      highlight: "Python"
    },
    {
      title: "TOOLS",
      subtitle: "Git, CUDA",
      highlight: "PyTorch"
    }
  ];

  const hardwareSkills = [
    {
      title: "MCU",
      subtitle: "STM32, Arduino",
      highlight: "ESP32"
    },
    {
      title: "SOFTWARE",
      subtitle: "Altium , ESP-IDF",
      highlight: "STM32CubeIDE"
    },
    {
      title: "PROTOCOLS",
      subtitle: "I2C, UART, BLE",
      highlight: "SPI"
    },
    {
      title: "TOOLS",
      subtitle: "Oscilloscope",
      highlight: "Multimeter"
    }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-4xl font-bold text-[var(--theme-primary)] text-center mb-8">Skills & Frameworks</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-white text-[17px] max-w-3xl leading-[30px] text-center mx-auto'
      >
        A collection of technologies and frameworks I've mastered through my projects and experiences.
        Each skill represents a tool in my arsenal for building innovative solutions.
      </motion.p>

      <div className="mt-12 flex justify-center gap-4">
        <button
          onClick={() => handleTabChange('hardware')}
          className={`px-6 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'hardware'
              ? 'bg-[var(--theme-primary)] text-black'
              : 'text-white hover:bg-[var(--theme-primary)]/10'
          }`}
        >
          Hardware
        </button>
        <button
          onClick={() => handleTabChange('software')}
          className={`px-6 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'software'
              ? 'bg-[var(--theme-primary)] text-black'
              : 'text-white hover:bg-[var(--theme-primary)]/10'
          }`}
        >
          Software
        </button>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {(activeTab === 'software' ? softwareSkills : hardwareSkills).map((skill, index) => (
          <CyberCard
            key={index}
            title={skill.title}
            subtitle={skill.subtitle}
            highlight={skill.highlight}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Skills, "skills");