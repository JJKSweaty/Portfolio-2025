import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import {styles} from '../styles';
import {github} from '../assets'
import {SectionWrapper} from '../hoc'
import {projects} from '../constants'
import { fadeIn,textVariant } from '../utils/motion';

const Works = () => {
  return (
   <>
      <motion.div variants={textVariant()}>
       <h2 className={`${styles.sectionHeadText} text-center align-middle justify-center mx-auto underline decoration-dotted decoration-amber-300`}>Projects</h2>
    </motion.div>
   </>
  )
}

export default SectionWrapper(Works,'')