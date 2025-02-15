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
  } from "../assets";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faLaptopCode, faServer,faCloudArrowUp,faGear} from "@fortawesome/free-solid-svg-icons";

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
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: 'github',
      icon: github,
    },
    {
      name: 'Azure',
      icon: Microsoft_Azure,
    },
    {
      name: 'cpp',
      icon: cpp,
    },
    {
      name: 'flask',
      icon: flask,
    },
    {
      name: 'keras',
      icon: keras,
    },
    {
      name: 'mediapipe',
      icon: mediapipe,
    },
    {
      name: 'opencv',
      icon: opencv,
    },
    {
      name: 'tensorflow',
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
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "SignToLearn",
      description:
        "Web-based AI-powered application designed to recognize ASL hand gestures in real-time. The project uses MediaPipe for hand tracking and TensorFlow for recognizing ASL gestures. This application aims to help users learn ASL in an interactive, engaging way, similar to language learning apps like Duolingo.",
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
      name: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };