import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import {styles} from '../styles';
import {github} from '../assets'
import {projects} from '../constants'
import { fadeIn,textVariant } from '../utils/motion';

const SkillsCarousel = () => {
  return (
    <div className="relative overflow-hidden w-full bg-transparent py-10 mt-20">
      <motion.div
        className="flex space-x-10 min-w-max"
        animate={{ x: ["0%", "-100%"] }} // Moves left
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...technologies, ...technologies].map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-w-[100px]"
          >
            <img
              src={skill.icon}
              alt={skill.title}
              className="w-16 h-16 object-contain"
            />
            <p className="text-white text-sm mt-2">{skill.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Tech = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
       <h2 className={`${styles.sectionHeadText} text-center align-middle justify-center mx-auto underline decoration-dotted decoration-blue-200`}>Technical Skills & Frameworks</h2>
      </motion.div>
      <SkillsCarousel/>
    </>
  );
};

export default SectionWrapper(Tech, "skills");