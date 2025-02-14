import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full card-gradient p-[1px] rounded-[20px] shadow-[3px_35px_120px_-2px_#211e35]  '
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-gradient-to-b from-[#0f172a] to-[#1e293b]


 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <FontAwesomeIcon icon={icon}
          className="text-4xl text-white"
        >
        </FontAwesomeIcon>

        <h3 className='text-[#d0d7dd] text-[20px] font-bold text-center mb-8'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
       I’m an Electrical Engineering student at the University of Waterloo with a strong passion for technology, problem solving, and innovation. My experience spans IT engineering, Machine Learning, and full-stack development, where I’ve worked on making impactful AI projects, creating STM32 and Arduino projects, and building interactive applications. I have expertise in frameworks like React, Flask and three.js allowing me to create dynamic and engaging user experiences. I also enjoy hackathons and am always eager to push my limits, collaborate with others, and build impactful projects under tight deadlines. Outside of engineering, I’m a huge Lakers fan and love catching a good game.


      </motion.p>

      <div className='mt-15 grid grid-cols-1 xl:grid-cols-2 xl:w-[1100px] gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");