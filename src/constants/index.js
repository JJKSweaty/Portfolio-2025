import {
    javascript,
    html,
    css,
    reactjs,
    tailwind,
    git,
    figma,
    carrent,
    jobit,
    tripguide,
    threejs,
    Microsoft_Azure,
    waterloooRocketry,
    waterloo,
    github,
    keras,
    mediapipe,
    opencv,
    python,
    tensorflow,
    cpp,
    flask,
    signtolearn,
    azureChat,
    maxSensor,
  } from "../assets";
  import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
  import { faLaptopCode, faServer,faCloudArrowUp,faGear,faEnvelope} from "@fortawesome/free-solid-svg-icons"; 
  import {faLinkedin,faGithub, faGit} from "@fortawesome/free-brands-svg-icons"; 


  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "skills",
      title: "Skills",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Full Stack Developer",
      icon: faLaptopCode,
    },
    {
      title: "AI/ML Student",
      icon: faCloudArrowUp,
    },
    {
      title: "Embedded Systems",
      icon: faGear,
    },
    {
      title: "IT Engineering",
      icon: faServer,
    },
  ];
  
  const technologies = [
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "Git",
      icon: git,
    },
    {
      name: "Figma",
      icon: figma,
    },
    {
      name: 'Github',
      icon: github,
    },
    {
      name: 'Azure',
      icon: Microsoft_Azure,
    },
    {
      name: 'Cpp',
      icon: cpp,
    },
    {
      name: 'Flask',
      icon: flask,
    },
    {
      name: 'Keras',
      icon: keras,
    },
    {
      name: 'Mediapipe',
      icon: mediapipe,
    },
    {
      name: 'OpenCV',
      icon: opencv,
    },
    {
      name: 'TensorFlow',
      icon: tensorflow,
    },
    {
      name: 'Python',
      icon: python,
    },

  ];
  
  const experiences = [
    {
      title: "AI/Ml Engineer (Azure AI)",
      company_name: "Microsoft We Accelerate",
      icon: Microsoft_Azure,
      iconBg: "white",
      date: "Jan 2024 - Apr 2024",
      points: [
        "Utilized Azure Health Bot service and advanced machine learning algorithms to analyze diverse medical datasets, increasing diagnosis accuracy by 30%. ",
        "Developed a personalized medical guidance system using Azure Health Bot Service, reducing diagnosis time by 20% and improving patient outcomes.",
        "Implemented and optimized data analysis workflows within the Azure Health Bot service, resulting in a 15% increase in overall healthcare efficiency and more accurate patient recommendations.",
      ],
    },
    {
      title: "Electrical Sub Team",
      company_name: "Waterloo Rocketry Design Team",
      icon:waterloooRocketry, 
      iconBg: "#E6DEDD",
      date: "Mar 2024 - Oct 2024",
      points: [
        "Assisted with PCB design using KiCad software, contributing to a 20% improvement in system efficiency.",
        "Conducted in-depth research on propulsion system designs, reducing costs by 15% and enhancing performance.",
        "Analyzed component specifications and performance data, providing insights that led to a 10-20% decrease in project timelines",
      ],
    },
    {
      title: "Information Tech Eningeer",
      company_name: "UW ECE Dept.",
      icon: waterloo,
      iconBg: "black",
      date: "Sep 2024 - Dec 2024",
      points: [
        "Maintained server environments by performing regular upkeep and troubleshooting, resulting in 99% uptime and increased system efficiency.",
        " Built and deployed new computers using Microsoft Deployment Services, automating installation processes through command line scripts for OS, drivers, and applications, reducing setup time by 50%.",
        "Supported graduate students and professors by recommending computer hardware based on their application and software specifications, ensuring optimal performance for specialized use cases.",
      ],
    },
  ];
  

  
  const projects = [
    {
      name: "SignToLearn",
      description:
        "Web based AI-powered application designed to recognize ASL hand gestures in real-time. The project uses MediaPipe for hand tracking and TensorFlow for recognizing ASL gestures. This application aims to help users learn ASL in an interactive, engaging way, similar to language learning apps like Duolingo.",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "Flask",
          color: "green-text-gradient",
        },
        {
          name: "Tailwind",
          color: "pink-text-gradient",
        },
        {
          name: "OpenCV",
          color: "sunset-text",
        },
        {
          name: "Three.Js",
          color: "ocean-text",
        },
        {
          name: "Python",
          color: "gold-text",
        },
        {
          name: "Tensorflow",
          color: "lava-text",
        },
      ],
      image: signtolearn,
      source_code_link: "https://github.com/JJKSweaty/SignToLearn/",
    },
    {
      name: "Medical Chatbot",
      description:
        "Medical chatbot that connects to Azure Health Bot using the Azure Chatbot Service API, allowing users to get symptom-based diagnoses and health information in a user-friendly web app. I also presented the project to stakeholders, demonstrating its capabilities and potential for real-world use.",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "Azure Health Bot",
          color: "green-text-gradient",
        },
        {
          name: "Azure Chatbot Service API",
          color: "pink-text-gradient",
        },
      ],
      image: azureChat,
    },
    {
      name: "Heartbeat Monitor STM32",
      description:
        "Built a heartbeat sensor using an STM32 microcontroller and a MAX32 sensor in C to measure heart rate in real time. The system processed sensor data to display heart rate readings, demonstrating your skills in embedded systems, signal processing, and microcontroller programming.",
      tags: [
        {
          name: "C++",
          color: "blue-text-gradient",
        },
        {
          name: "C",
          color: "green-text-gradient",
        },
        {
          name: "STM32",
          color: "sunset-text",
        },
        {
          name: "Arduino",
          color: "lava-text",
        },
      ],
      image: maxSensor,
      source_code_link: "https://github.com/JJKSweaty/Heartbeat-Monitor-STM32-Using-Arduino-IDE-"
    },
  ];
  const contacts = [
    {
      info:'https://www.linkedin.com/in/jonathan-jacob-koshy-49b683291/?profileId=ACoAAEbBtvcBVjkY-zL8NmlZ2okVDVF7R1r5xwg',
      icon:faLinkedin,
      name:'LinkedIn'
      
    },
    {
      info:'mailto:johnkoper12@gmail.com',
      icon:faEnvelope,
      name:"Email"
    },

    {
      info:'https://github.com/JJKSweaty',
      icon:faGithub,
      name:'Github'
    },
  ];

  
  export { services, technologies, experiences, projects,contacts };