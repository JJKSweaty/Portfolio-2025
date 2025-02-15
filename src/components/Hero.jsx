import { motion } from "framer-motion";
import AnimatedName from "./AnimatedName";
import Tilt from "react-parallax-tilt";
import { styles } from "../styles";
import { faceLogo } from "../assets";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} !text-[35px] xl:!text-[40px] text-white flex xl:flex-row sm:flex-col`}>
            Hi, I'm &nbsp; <span className='text-[#68b1f5]'><AnimatedName/></span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-grey-200 xl:block sm:block md:block hidden`}>
            I create fullstack web applications <br className='sm:block hidden' />
            and build AI/ML projects
          </p>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-0 xl:mt-15 sm:mt-25">
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={16}
      scale={1.1}
      transitionSpeed={1500}
      className="relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative w-80 h-80 rounded-full border-4 border-[#072c4e] 
                 overflow-hidden"
                 onScroll={'bg-transparent'}
      >
        <img
          src={faceLogo}
          alt="Your Name"
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </motion.div>
    </Tilt>
  </div>
      

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
      <button className="cursor-pointer bg-blue-900

 px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-pulse">
      <a href="#about">
      <svg
        className="sm:w-10 sm:h-10 xl:w-8 xl:h-8 w-8 h-8"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
      </a>
    </button>
       
      </div>
    </section>
  );
};

export default Hero;