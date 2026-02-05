export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  description?: string;
  image: string | null;
  tags: string[];
  stack: string[];
  impact?: string;
  category: 'embedded' | 'ai-ml' | 'full-stack' | 'hardware';
  links?: {
    github?: string;
    demo?: string;
    writeup?: string;
  };
  media?: {
    type: 'image' | 'video';
    src: string;
    caption?: string;
  }[];
  status?: 'completed' | 'in-progress';
};

export type Experience = {
  org: string;
  role: string;
  start: string; // ISO date
  end?: string; // ISO date or 'Present'
  location?: string;
  highlights: string[];
  stack?: string[];
  links?: {
    site?: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'signtolearn',
    title: 'SignToLearn',
    year: '2024',
    summary: 'AI-powered ASL learning platform with real-time gesture recognition',
    description:
      'Web based AI-powered application designed to recognize ASL hand gestures in real-time. The project uses MediaPipe for hand tracking and TensorFlow for recognizing ASL gestures. This application aims to help users learn ASL in an interactive, engaging way, similar to language learning apps like Duolingo.',
    image: '/images/signtolearn.jpg',
    tags: ['AI/ML', 'Computer Vision', 'Web App'],
    stack: ['React', 'Flask', 'TensorFlow', 'OpenCV', 'MediaPipe', 'Python', 'Tailwind', 'Three.js'],
    impact: 'Live translation with >90% accuracy on core signs',
    category: 'ai-ml',
    links: {
      github: 'https://github.com/JJKSweaty/SignToLearn/',
    },
    status: 'completed',
  },
  {
    slug: 'cuda-mlp-mnist',
    title: 'CUDA MLP for MNIST Classification',
    year: '2024',
    summary: 'Custom CUDA kernels achieving 2× speedup over PyTorch baseline',
    description:
      'Implemented a 2-layer MLP for MNIST digit classification, scaling from PyTorch to custom CUDA kernels to analyze speed and efficiency tradeoffs. Wrote CUDA kernels for matrix operations, activation functions, and loss computation, optimizing memory transfers and GPU utilization. Leveraged cuBLAS routines to reach over 2× faster training than PyTorch baseline while maintaining accuracy across 10,000 samples.',
    image: null,
    tags: ['CUDA', 'Machine Learning', 'GPU Computing'],
    stack: ['CUDA', 'PyTorch', 'cuBLAS', 'C++', 'Python'],
    impact: '2× faster training than PyTorch baseline',
    category: 'ai-ml',
    links: {
      github: 'https://github.com/JJKSweaty/cuda-mlp-mnist',
    },
    status: 'completed',
  },
  {
    slug: 'claude-firmware-assistant',
    title: 'Claude Powered Firmware Assistant',
    year: '2024-2025',
    summary: 'Full-stack AI assistant with RAG and 60% token reduction',
    description:
      'Developed a full-stack Claude-based agent to assist with firmware and embedded tasks, featuring live streaming and secure file upload. Integrated local vector RAG and Supabase session memory to enable multi-turn context recall across chats. Implemented scoped memory, prompt compression, and selective context injection reducing token usage by 60%.',
    image: null,
    tags: ['AI Agent', 'RAG', 'Full-Stack'],
    stack: ['Claude AI', 'RAG', 'Supabase', 'Vector DB', 'WebSockets', 'React', 'Fly.io'],
    impact: '60% token reduction through smart context management',
    category: 'full-stack',
    links: {
      github: 'https://github.com/JJKSweaty/jjkAI',
      demo: 'https://jonathankoshy.com',
    },
    status: 'in-progress',
  },
  {
    slug: 'esp32-media-controller',
    title: 'ESP32 Media Controller',
    year: '2024-2025',
    summary: 'Custom hardware dashboard with touchscreen and WebSocket controls',
    description:
      'Built a custom ESP32-S3 hardware dashboard with a 3.5″ SPI TFT touchscreen and I²C touch controller. Enables real-time media control, system monitoring, and Discord voice management via WebSockets.',
    image: null,
    tags: ['Embedded', 'IoT', 'Hardware'],
    stack: ['ESP32-S3', 'SPI', 'I²C', 'LVGL', 'PlatformIO', 'WebSockets', 'C/C++'],
    impact: 'Sub-50ms input latency; modular LVGL UI',
    category: 'embedded',
    links: {
      github: 'https://github.com/JJKSweaty/ESP32Media',
    },
    status: 'in-progress',
  },
  {
    slug: 'vision-guided-autonomous-disk-launcher',
    title: 'Vision-Guided Autonomous Disk Launcher',
    year: '2025',
    summary: 'Vision-guided embedded system integrating perception, control, and electromechanical actuation.',
    description:
      'Built an autonomous vision-guided launcher that detects, tracks, and engages targets using a Raspberry Pi for perception and an ESP32-S3 for real-time motion and firing control. The system integrates computer vision, closed-loop control, and electromechanical actuation with range validation before firing.',
    image: '/images/panTilt.jpeg',
    tags: ['Embedded', 'Control', 'Perception'],
    stack: ['Raspberry Pi', 'ESP32-S3', 'Serial', 'PID Control', 'TF-Luna LiDAR', 'Servo Actuation', 'BLDC Flywheels'],
    category: 'embedded',
    links: {
      github: 'https://github.com/JJKSweaty/Autonomous-Disk-Launcher',
      writeup: '/projects/vision-guided-autonomous-disk-launcher',
    },
    media: [
      {
        type: 'image',
        src: '/images/panTilt.jpeg',
        caption: 'Pan-tilt mechanism used for target tracking',
      },
      {
        type: 'image',
        src: '/images/flywheel.png',
        caption: 'Dual flywheel disk launch mechanism',
      },
      {
        type: 'video',
        src: '/demos/autonomous-launcher-demo.mp4',
        caption: 'Bench-top demo showing pan-tilt tracking and launch sequencing',
      },
    ],
    status: 'completed',
  },
  {
    slug: 'heartbeat-monitor-pcb',
    title: 'Heartbeat Monitor PCB Design',
    year: '2024',
    summary: 'Custom PCB for BPM and SpO₂ tracking with MAX30102',
    description:
      'Custom PCB designed in KiCad for heartbeat and SpO₂ monitoring using the MAX30102 sensor and USB-C power input. Optimized I²C communication for reliable BPM and oxygen saturation tracking on an Arduino interface.',
    image: null,
    tags: ['PCB Design', 'Hardware', 'Health Tech'],
    stack: ['KiCad', 'MAX30102', 'I²C', 'Arduino', 'USB-C'],
    impact: 'Reliable vital sign monitoring for wearable applications',
    category: 'hardware',
    links: {
      // TODO: Add Heartbeat PCB repo link.
      // github: 'https://github.com/<you>/<repo>',
    },
    status: 'completed',
  },
  {
    slug: 'truvote-secure-voting',
    title: 'TruVote – Secure Digital Voting Platform',
    year: '2025',
    summary: 'Biometric voting system enforcing one-person-one-vote through facial embedding verification',
    description:
      'Designed a secure voting system enforcing one-person-one-vote through biometric identity verification. Implemented face authentication by extracting facial embeddings and matching vectors during vote submission. Built backend authorization logic supporting election setup, ballot casting, auditing, and result verification.',
    image: null,
    tags: ['Full-Stack', 'Computer Vision', 'Security'],
    stack: ['TypeScript', 'React', 'Next.js', 'Flask', 'Supabase', 'Python', 'OpenCV', 'Vercel'],
    impact: 'Biometric verification ensuring tamper-proof one-person-one-vote',
    category: 'full-stack',
    links: {
      github: 'https://github.com/18gen/hack-canada',
    },
    status: 'completed',
  },
  {
    slug: 'second-sight',
    title: 'Second Sight – AI Indoor Object Finder',
    year: '2025',
    summary: 'AI-powered indoor assistant using pan-tilt camera and on-device YOLO vision for hands-free object location',
    description:
      'AI-powered indoor assistant that finds everyday objects using a pan-tilt camera and on-device YOLO vision running on a Raspberry Pi. Scans a room, captures snapshots when target items are detected, and sends results to a web app that explains locations in natural language with voice guidance for hands-free use.',
    image: null,
    tags: ['Embedded', 'AI/ML', 'Computer Vision'],
    stack: ['Raspberry Pi', 'YOLO', 'Python', 'Pan-Tilt', 'Web App', 'Voice UI'],
    impact: 'Hands-free object location with natural language voice guidance',
    category: 'embedded',
    links: {
      github: 'https://github.com/mahadk28/SecondSight',
    },
    status: 'completed',
  },
];

export const experiences: Experience[] = [
  {
    org: 'UWARG (UW Aerial Robotics Group)',
    role: 'Embedded Flight Systems Engineer',
    start: '2025-01-01',
    end: 'Present',
    location: 'Waterloo, ON',
    highlights: [
      'Implemented motor passthrough and PID groundwork for roll control in autonomous flight systems',
      'Integrated sensor fusion and mode switching logic with safety guards for reliable UAV operation',
      'Collaborated with cross-functional team on firmware architecture and testing protocols',
    ],
    stack: ['STM32', 'C/C++', 'PID Control', 'Sensor Fusion', 'Embedded Systems'],
    links: {
      site: 'https://www.uwarg.com/',
    },
  },
  {
    org: 'Waterloo Rocketry',
    role: 'PCB Designer',
    start: '2024-01-01',
    end: '2024-12-31',
    location: 'Waterloo, ON',
    highlights: [
      'Designed KiCad PCBs for rocket avionics systems; improved system efficiency by 20%',
      'Established comprehensive DRC rules and manufacturing-ready footprints for team projects',
      'Collaborated with mechanical and software teams to ensure integration and reliability',
    ],
    stack: ['KiCad', 'PCB Design', 'Schematic Capture', 'Manufacturing DFM'],
    links: {
      site: 'https://www.waterloorocketry.com/',
    },
  },
  {
    org: 'RISG Lab (Research Institute for Software and Graphics)',
    role: 'IT & Hardware Support Specialist',
    start: '2024-01-01',
    end: '2025-01-01',
    location: 'University of Waterloo',
    highlights: [
      'Deployed Windows/Linux/Mac images and automated network configurations for research lab infrastructure',
      'Supported faculty and graduate researchers with hardware troubleshooting and system maintenance',
      'Maintained uptime of critical research computing infrastructure',
    ],
    stack: ['IT Support', 'Windows', 'Linux', 'macOS', 'Networking'],
    links: {},
  },
];
