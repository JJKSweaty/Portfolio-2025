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
    claudefirmwareai,
    mnst,
    heartbeatpcb,
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
      description: "Real-time ASL gesture recognition app with 90%+ accuracy using MediaPipe and TensorFlow.",
      type: "software",
      category: "ai-ml",
      tags: [
        { name: "React" },
        { name: "Flask" },
        { name: "TensorFlow" },
        { name: "OpenCV" },
        { name: "MediaPipe" },
      ],
      image: signtolearn,
      source_code_link: "https://github.com/JJKSweaty/SignToLearn/",
    },
    {
      name: "CUDA MLP — MNIST",
      description: "Custom CUDA kernels for a 2-layer MLP achieving 2× faster training than PyTorch baseline.",
      type: "software",
      category: "ai-ml",
      tags: [
        { name: "CUDA" },
        { name: "PyTorch" },
        { name: "cuBLAS" },
        { name: "C++" },
      ],
      image: mnst,
      source_code_link: "https://github.com/JJKSweaty/MNIST"
    },
    {
      name: "Claude Firmware Assistant",
      description: "AI agent with RAG and session memory for firmware tasks — 60% token reduction via smart context.",
      type: "software",
      category: "ai-ml",
      tags: [
        { name: "Claude AI" },
        { name: "RAG" },
        { name: "Supabase" },
        { name: "Node.js" },
      ],
      image: claudefirmwareai,
      source_code_link: "https://github.com/JJKSweaty/jjkAI"
    },
    {
      name: "TruVote",
      description: "Biometric voting platform enforcing one-person-one-vote via facial embedding verification.",
      type: "software",
      category: "full-stack",
      tags: [
        { name: "Next.js" },
        { name: "Flask" },
        { name: "OpenCV" },
        { name: "Supabase" },
      ],
      image: truvote,
      source_code_link: "https://github.com/18gen/hack-canada"
    },
    {
      name: "Second Sight",
      description: "AI indoor assistant using on-device YOLO and pan-tilt camera to locate objects with voice guidance.",
      type: "hardware",
      category: "embedded",
      tags: [
        { name: "Raspberry Pi" },
        { name: "YOLO" },
        { name: "Pan-Tilt" },
        { name: "Voice UI" },
      ],
      image: null,
      source_code_link: "https://github.com/mahadk28/SecondSight"
    },
    {
      name: "Autonomous Disk Launcher",
      description: "Vision-guided launcher with PID tracking, LiDAR range-gating, and dual-flywheel actuation.",
      type: "hardware",
      category: "embedded",
      route: "/projects/vision-guided-autonomous-disk-launcher",
      demoVideoMp4: "/demos/autonomous-launcher-demo.mp4",
      tags: [
        { name: "Raspberry Pi" },
        { name: "ESP32-S3" },
        { name: "PID" },
        { name: "LiDAR" },
      ],
      image: "/images/panTilt.jpeg",
      source_code_link: "https://github.com/JJKSweaty/Autonomous-Disk-Launcher",
    },
    {
      name: "Heartbeat Monitor PCB",
      description: "Custom KiCad PCB for BPM and SpO₂ tracking with MAX30102 sensor and USB-C power.",
      type: "hardware",
      category: "hardware",
      route: "/projects/heartbeat-monitor-pcb",
      tags: [
        { name: "KiCad" },
        { name: "MAX30102" },
        { name: "I²C" },
        { name: "PCB Design" },
      ],
      image: heartbeatpcb,
      source_code_link: "https://github.com/JJKSweaty/Heartbeat-Monitor-STM32-Using-Arduino-IDE-",
    },
    {
      name: "ESP32 Media Controller",
      description: "Touchscreen hardware dashboard for media control, system stats, and Discord via WebSockets.",
      type: "hardware",
      category: "embedded",
      featured: true,
      demoVideo: "https://youtu.be/r_K0236xxg4",
      route: "/projects/esp32-media-controller",
      tags: [
        { name: "ESP32-S3" },
        { name: "LVGL" },
        { name: "WebSockets" },
        { name: "SPI" },
      ],
      image: null,
      source_code_link: "https://github.com/JJKSweaty/ESP32Media"
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