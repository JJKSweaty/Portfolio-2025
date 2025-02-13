import { motion } from "framer-motion";
import AnimatedName from "./AnimatedName";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white flex xl:flex-row sm:flex-col`}>
            Hi, I'm &nbsp; <span className='text-[#5aa7ee]'><AnimatedName/></span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white xl:block sm:hidden md:block`}>
            I create fullstack web applications <br className='sm:block hidden' />
            and build AI/ML projects
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
      <button className="cursor-pointer bg-blue-900 px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce">
      <a href="#about">
      <svg
        className="sm:w-10 sm:h-10 xl:w-10 xl:h-10 w-8 h-8"
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