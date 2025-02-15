import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import {color, motion} from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css'
import { experiences } from "../constants";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { text } from "@fortawesome/fontawesome-svg-core";


const ExperienceCard = ({experience}) =>(
  <VerticalTimelineElement contentStyle={{ backgroundColor: '#1e5a8a', color: '#fff' }}
  contentArrowStyle={{borderRight:'7px solid #232631'}}
  date={experience.date}
  iconStyle={{background:experience.iconBg}}
  icon={
    <div className="flex justify-center items-center w-full h-full">
      <img
        src={experience.icon}
        alt={experience.compant_name}
        className="w-[60%] h-[60%] object-contain"

      ></img>

    </div>
  }
  >
    <div>
      <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
      <p className="text-gray-300 font-semibold"
      style={{margin:0}}
      >{experience.company_name}</p>
    </div>

    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point,index)=>(
        <li
        key={`experience-point-${index}`}
        className="text-white text-[14px] pl-1 tracking-wider"
        >
          {point}


        </li>

      ))}

    </ul>
  </VerticalTimelineElement>
)


const Experience = () => {
  return (
   <>
    <motion.div variants={textVariant()}>
       <h2 className={`${styles.sectionHeadText} text-center align-middle justify-center mx-auto underline decoration-dotted decoration-blue-200`}>Experience</h2>
    </motion.div>
    <div className="mt-20 flex flex-col">
      <VerticalTimeline>
        {experiences.map((experience,index)=> (
          <ExperienceCard key={index} experience={experience}/>
        ))}
      </VerticalTimeline>

    </div>
   </>
  )
}

export default SectionWrapper(Experience,'work')