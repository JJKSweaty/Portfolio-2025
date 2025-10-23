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
    truvote,
  } from "../assets";
  import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
  import { faLaptopCode, faServer,faCloudArrowUp,faGear,faEnvelope} from "@fortawesome/free-solid-svg-icons"; 
  import {faLinkedin,faGithub, faGit} from "@fortawesome/free-brands-svg-icons"; 


  export const navLinks = [
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
      title: "Information Tech Engineer",
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
      type: "software",
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
      name: "Motor Tester",
      description: "Developed a motor tester for UWARG using an STM32 microcontroller. Implemented SPI-based ADC reading of potentiometer values and mapped those readings to PWM signals to control motor speed and direction for both servo and continuous-rotation motors.",
      type: "hardware",
      tags: [
        { name: "STM32", color: "blue-text-gradient" },
        { name: "SPI", color: "green-text-gradient" },
        { name: "PWM", color: "pink-text-gradient" },
        { name: "ADC", color: "sunset-text" },
        { name: "Embedded", color: "ocean-text" },
        { name: "C/C++", color: "gold-text" }
      ],
      image: null,
      source_code_link: "https://github.com/JJKSweaty/embedded-bootcamp"
    },
    {
      name: "CUDA MLP for MNIST Classification",
      description: "Implemented a 2-layer MLP for MNIST digit classification, scaling from PyTorch to custom CUDA kernels to analyze speed and efficiency tradeoffs. Wrote CUDA kernels for matrix operations, activation functions, and loss computation, optimizing memory transfers and GPU utilization. Leveraged cuBLAS routines to reach over 2× faster training than PyTorch baseline while maintaining accuracy across 10,000 samples.",
      type: "software",
      tags: [
        { name: "CUDA", color: "blue-text-gradient" },
        { name: "PyTorch", color: "green-text-gradient" },
        { name: "cuBLAS", color: "pink-text-gradient" },
        { name: "GPU Computing", color: "sunset-text" },
        { name: "Machine Learning", color: "ocean-text" },
        { name: "C++", color: "gold-text" },
        { name: "Performance Optimization", color: "lava-text" },
      ],
      image: null,
      source_code_link: "https://github.com/JJKSweaty/MNIST"
    },
    {
      name: "Claude Powered Firmware Assistant",
      description: "Developed a full-stack Claude-based agent to assist with firmware and embedded tasks, featuring live streaming and secure file upload. Integrated local vector RAG and Supabase session memory to enable multi-turn context recall across chats. Implemented scoped memory, prompt compression, and selective context injection reducing token usage by 60%.",
      type: "software",
      tags: [
        { name: "Claude AI", color: "blue-text-gradient" },
        { name: "RAG", color: "pink-text-gradient" },
        { name: "Supabase", color: "sunset-text" },
        { name: "Vector DB", color: "ocean-text" },
        { name: "Fastify", color: "green-text-gradient" },
        { name: "Node.js", color: "gold-text" }
        

      ],
      image: null,
      source_code_link: "https://github.com/JJKSweaty/jjkAI"
    },
    {
      name: "Heartbeat Monitor PCB Design",
      description: "Custom PCB designed in KiCad for heartbeat and SpO₂ monitoring using the MAX30102 sensor and USB-C power input. Optimized I²C communication for reliable BPM and oxygen saturation tracking on an Arduino interface.",
      type: "hardware",
      tags: [
        { name: "KiCad", color: "blue-text-gradient" },
        { name: "MAX30102", color: "green-text-gradient" },
        { name: "PCB Design", color: "pink-text-gradient" },
        { name: "I²C", color: "sunset-text" },
        { name: "Arduino", color: "ocean-text" },
        { name: "USB-C", color: "gold-text" }
      ],
      image: null,
    },
    {
      name: "ESP32 Media Controller",
      description: "Built a custom ESP32-S3 hardware dashboard with a 3.5″ SPI TFT touchscreen and I²C touch controller. Enables real-time media control, system monitoring, and Discord voice management via WebSockets.",
      type: "hardware",
      tags: [
        { name: "ESP32-S3", color: "blue-text-gradient" },
        { name: "SPI", color: "green-text-gradient" },
        { name: "I²C", color: "pink-text-gradient" },
        { name: "LVGL", color: "sunset-text" },
        { name: "PlatformIO", color: "ocean-text" },
        { name: "WebSockets", color: "gold-text" }
      ],
      image: null,
      source_code_link: "https://github.com/JJKSweaty/esp32-media-controller"
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