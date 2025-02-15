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


const Tech = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
       <h2 className={`${styles.sectionHeadText} text-center align-middle justify-center mx-auto underline decoration-dotted decoration-blue-200`}>Technical Skills & Frameworks</h2>
      </motion.div>
    <div className='flex flex-row flex-wrap justify-center gap-10 mt-6'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");