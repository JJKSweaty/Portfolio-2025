import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import {styles} from '../styles';
import {github} from '../assets'
import {SectionWrapper} from '../hoc'
import {projects} from '../constants'
import { fadeIn,textVariant } from '../utils/motion';

const ProjectCard=({index, name ,description,tags,image,source_code_link})=>{
    return(
      <motion.div variants={fadeIn('up','spring',index*0.9)}>
        <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
      </motion.div>
    )

}
const Works = () => {
  return (
   <>
      <motion.div variants={textVariant()}>
       <h2 className={`${styles.sectionHeadText} text-center align-middle justify-center mx-auto underline decoration-dotted decoration-blue-200`}>Projects</h2>
    </motion.div>
    <div className='w-full flex'>
      <motion.p variants={fadeIn('','',0.1,1)} className='mt-3 text-gray-200 text-[17px] max-w-[1100px] leading-[30px]'>
      I’ve worked on some cool projects that let me dive into full-stack dev, embedded systems, and OOP. SignToLearn, my hackathon winning ASL learning app, used Flask, React, OpenCV, Mediapipe. For my heartbeat sensor project, I worked with a MAX32 sensor and an STM32 microcontroller, getting hands-on with embedded systems. I also built an ETF investment tracker in C++ using OOP, focusing on structured programming and financial data management.

      </motion.p>
    </div>
    <div className='mt-20 flex flex-wrap gap-7'>
      {projects.map((project,index)=>(

        <ProjectCard
         key={`project-${index}`}
         index={index}
         {...project}
        />
      ))}

    </div>
   </>
  )
}

export default SectionWrapper(Works,'projects')