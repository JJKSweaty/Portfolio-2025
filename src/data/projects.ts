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
    slug: 'motor-tester',
    title: 'STM32 Motor Tester',
    year: '2024',
    summary: 'SPI-based motor controller for UWARG flight systems',
    description:
      'Developed a motor tester for UWARG using an STM32 microcontroller. Implemented SPI-based ADC reading of potentiometer values and mapped those readings to PWM signals to control motor speed and direction for both servo and continuous-rotation motors.',
    image: null,
    tags: ['Embedded', 'Firmware', 'Aerospace'],
    stack: ['STM32', 'SPI', 'PWM', 'ADC', 'C/C++', 'Embedded Systems'],
    impact: 'Enabled precise motor characterization for flight control',
    category: 'embedded',
    links: {
      github: 'https://github.com/JJKSweaty/embedded-bootcamp',
    },
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
    links: {},
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
