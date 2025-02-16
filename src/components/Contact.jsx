import React from 'react'
import { motion } from 'framer-motion'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import { contacts } from '../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Contact = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
    <h2 className={`${styles.sectionHeadText} text-center align-middle justify-center mx-auto underline decoration-dotted decoration-blue-200`}>Contact</h2>

  </motion.div>
  
  <div className="flex justify-center gap-10 flex-wrap p-6 bg-transparent mt-20 mb-[-10px]">
  {contacts.map((contact, index) => (
  <motion.div variants={fadeIn("right", "spring", index * 0.5, 0.75)}>
    <div
      key={index}
      className="bg-[#1e5a8a] border-2 text-white rounded-xl shadow-lg max-w-xs transform hover:scale-105 transition duration-300 
        xl:w-70 xl:h-60 sm:w-55 sm:h-45 w-50 h-50 flex flex-col items-center justify-center text-center"
    >
  
      <div className="text-6xl py-6 text-blue-100">
        <FontAwesomeIcon icon={contact.icon} />
      </div>


      <a href={contact.info} className="text-lg font-semibold text-white py-2 hover:text-blue-800 transition">
        {contact.name}
      </a>
    </div>
    </motion.div>
  ))}
</div>


   

  
  </>
  )
}

export default  SectionWrapper (Contact,"contact");