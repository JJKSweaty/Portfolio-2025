import claudefirmwareai from "../assets/claudefirmwareai.png";
import cudaMlpPreview from "../assets/project-previews/cuda-mlp-preview.png";
import esp32MediaPreview from "../assets/project-previews/esp32-media-preview.jpg";
import faceLogo from "../assets/jonathanFace.png";
import heartbeatpcb from "../assets/hearbeatsensor pcb.png";
import roboticsPlatformPreview from "../assets/project-previews/robotics-platform-preview.jpg";
import signtolearn from "../assets/signtolearn.png";
import spiPwmPreview from "../assets/project-previews/spi-pwm-preview.png";
import truvote from "../assets/truvote.png";

export const portfolio = {
  person: {
    name: "Jonathan Koshy",
    initials: "JJK",
    title: "Firmware & Embedded Systems Engineer",
    location: "Waterloo, ON / Montreal, QC",
    email: "johnkoper12@gmail.com",
    resumePath: "/resumeJonathanEmbedded.pdf",
    headshot: faceLogo,
    summary:
      "Electrical Engineering student at the University of Waterloo building low-level software for sensing, control, communication, and edge-compute systems.",
    focus:
      "Currently working in embedded firmware and interested in firmware, systems software, embedded Linux, GPU systems, and hardware-software integration.",
    availability: [
      {
        label: "Currently",
        value: "Embedded Systems Intern at Belimo",
      },
      {
        label: "Seeking",
        value: "Winter 2027 firmware and systems opportunities",
      },
    ],
  },
  navLinks: [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/JJKSweaty",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jonathan-jacob-koshy-49b683291/?profileId=ACoAAEbBtvcBVjkY-zL8NmlZ2okVDVF7R1r5xwg",
    },
    {
      label: "Email",
      href: "mailto:johnkoper12@gmail.com",
    },
  ],
};

export const experiences = [
  {
    company: "Belimo",
    role: "Embedded Systems Intern",
    location: "Montreal, QC",
    period: "May 2026 - Aug 2026",
    companyUrl: "https://www.belimo.com/",
    domains: ["Firmware", "Controls", "BACnet", "Validation"],
    summary:
      "Developing bare-metal Embedded C firmware for memory-constrained HVAC sensor and actuator controllers. Work spans interrupt timing, state-machine debugging, ADC filtering, communication validation, and hardware/firmware verification.",
    details: [
      "Debugging controller behavior across CAN, UART, I2C, and BACnet-facing system tests.",
      "Validating sensor reads, actuator commands, debouncing behavior, and timing-sensitive routines on real hardware.",
      "Working in constrained firmware environments where global state, binary flags, and deterministic control paths matter.",
    ],
  },
  {
    company: "AeroCardia",
    role: "Embedded Systems Intern",
    location: "Montreal, QC",
    period: "Sep 2025 - Dec 2025",
    domains: ["FreeRTOS", "Sensors", "BLE", "PCB"],
    summary:
      "Built firmware and hardware for a biosensor platform with PPG, IMU, temperature, and related sensing. Contributed across sensor drivers, FreeRTOS streaming, BLE telemetry, secure OTA updates, PCB work, and signal-chain validation.",
    details: [
      "Implemented streaming firmware architecture for real-time acquisition and mobile/dashboard integration.",
      "Worked across firmware, hardware, mobile, dashboard, and product stakeholders to turn prototype requirements into testable system behavior.",
      "Supported filtering, calibration, and signal-quality improvements for wearable biomedical measurements.",
    ],
  },
  {
    company: "UWARG",
    role: "Embedded Flight Systems",
    location: "Waterloo, ON",
    period: "Apr 2025 - Present",
    companyUrl: "https://www.uwarg.com/",
    domains: ["Flight Control", "PID", "Motor Test", "Validation"],
    summary:
      "Developing flight-control firmware and hardware test tooling for UAV systems. Work includes roll-yaw mixing, PID attitude stabilization groundwork, motor and ESC testing, simulation, and hardware validation.",
    details: [
      "Implemented motor passthrough and control logic for repeatable actuator testing.",
      "Mapped sensor and control data into firmware paths with safety checks for flight-system validation.",
      "Collaborated with mechanical, electrical, and autonomy contributors on integration and test plans.",
    ],
  },
  {
    company: "Electrium Mobility",
    role: "Firmware Member",
    location: "Waterloo, ON",
    period: "May 2025 - Sep 2025",
    domains: ["ESP32", "BLE", "VESC", "Embedded UI"],
    summary:
      "Built ESP32 firmware for vehicle dashboard and controller integration. Work included event-driven BLE communication, VESC telemetry over UART, and embedded display flows for motor and battery state.",
    details: [
      "Designed modular firmware paths for live telemetry, controls, and display updates.",
      "Improved control responsiveness under rapid state changes and noisy sensor updates.",
      "Integrated embedded UI behavior with underlying vehicle telemetry and communication constraints.",
    ],
  },
  {
    company: "UWASIC",
    role: "ASIC Digital Member",
    location: "Waterloo, ON",
    period: "Jan 2026 - Present",
    domains: ["Verilog", "SPI", "PWM", "Cocotb"],
    summary:
      "Designed RTL for an SPI-controlled PWM peripheral using Mode 0 SPI transactions and memory-mapped registers. Verified edge detection, clock-domain crossing, register behavior, and PWM timing with Cocotb, Icarus Verilog, and GTKWave.",
    details: [
      "Implemented synchronized SPI input handling, bit counting, address validation, and register writes.",
      "Validated duty-cycle and frequency behavior against expected timing under simulation.",
      "Prepared the peripheral for Tiny Tapeout-style ASIC integration and review.",
    ],
  },
  {
    company: "University of Waterloo ECE Department",
    role: "Information Technology Intern",
    location: "Waterloo, ON",
    period: "Sep 2024 - Dec 2024",
    domains: ["Linux", "Windows", "Networking", "Hardware"],
    summary:
      "Supported research and lab infrastructure across Linux and Windows systems, drivers, workstation hardware, networking failures, and PCIe configuration issues.",
    details: [
      "Automated workstation imaging and deployment paths for course and lab environments.",
      "Troubleshot hardware, driver, networking, and OS failures for faculty, students, and lab systems.",
      "Recommended and configured workstation hardware for research and specialized course workloads.",
    ],
  },
];

export const projects = [
  {
    slug: "remembr",
    title: "remembR",
    subtitle: "Edge AI dementia companion",
    year: "2025",
    category: "Edge Computing",
    status: "HackCanada winner",
    featured: false,
    role: "Built the edge-compute perception and hardware-software architecture for object finding, memory support, and medication verification.",
    summary:
      "Raspberry Pi 5 and Hailo-8L assisted perception system using YOLOv8, OpenCV, persistent object memory, and FastAPI/WebSocket communication.",
    decisions: [
      "Kept inference and object memory local to the edge device for responsive object search.",
      "Used a companion interface for task flow and found-item feedback instead of making the device itself the main UI.",
      "Separated medication barcode/QR verification from general object detection so safety-critical reminders can be validated explicitly.",
    ],
    tags: ["Raspberry Pi 5", "Hailo-8L", "YOLOv8", "OpenCV", "FastAPI", "WebSocket"],
    image: {
      src: "/images/emberapp.jpg",
      alt: "remembR companion app interface",
      fit: "contain",
    },
    links: [
      { label: "GitHub", href: "https://github.com/JJKSweaty/remembR" },
      { label: "Devpost", href: "https://devpost.com/software/ember-n8m3yk" },
    ],
    caseStudy: {
      overview:
        "remembR is an assistive edge-computing system for dementia support. It combines local perception, persistent object memory, medication verification, and a companion interface so the user can find important items and follow reminders without sending every interaction to a remote service.",
      problem:
        "People with memory loss often need help locating objects and verifying routine tasks. The system needed to respond quickly, work around real room conditions, and make the hardware/software boundary clear enough to debug under hackathon constraints.",
      ownership:
        "I focused on the embedded and edge-compute system architecture: perception pipeline, device communication, object memory flow, and hardware-software integration.",
      architecture: [
        "Camera",
        "Raspberry Pi 5",
        "Hailo-8L inference",
        "Detection memory",
        "FastAPI/WebSocket",
        "Mobile interface",
      ],
      components: [
        "Raspberry Pi 5 edge host",
        "Hailo-8L accelerator",
        "Camera input",
        "YOLOv8/OpenCV perception stack",
        "FastAPI backend and WebSocket messaging",
        "Companion application for reminders and object feedback",
      ],
      engineering: [
        "Balanced local inference against companion-app interaction so the system stays responsive.",
        "Structured object memory separately from one-off detections to support repeated object queries.",
        "Kept verification flows explicit for medication barcode and QR interactions.",
      ],
      validation: [
        "Tested object-finding behavior with real camera frames and companion-app feedback loops.",
        "Validated communication between edge host and interface through WebSocket events.",
        "Checked reminder and verification flows against expected task states.",
      ],
      results: [
        "Produced a working assistive prototype recognized as a HackCanada winner.",
        "Demonstrated an edge-first architecture that combines perception, memory, and task reminders.",
      ],
    },
  },
  {
    slug: "cuda-mlp-mnist",
    title: "CUDA MLP / GPU Performance Engineering",
    subtitle: "Custom CUDA kernels for neural-network training",
    year: "2024",
    category: "GPU Systems",
    status: "Completed",
    featured: true,
    role: "Implemented and benchmarked GPU kernels while comparing custom CUDA paths against a PyTorch baseline.",
    summary:
      "Two-layer MNIST MLP focused on memory movement, kernel execution, cuBLAS SGEMM, profiling, and benchmark methodology.",
    decisions: [
      "Used a PyTorch implementation as the correctness and performance baseline.",
      "Moved hot matrix operations to custom CUDA kernels and cuBLAS where appropriate.",
      "Benchmarked end-to-end training behavior instead of only isolated micro-kernels.",
    ],
    tags: ["CUDA", "cuBLAS", "C++", "PyTorch"],
    image: {
      src: cudaMlpPreview,
      alt: "MNIST CUDA MLP project screenshot",
      fit: "contain",
      position: "center",
    },
    links: [{ label: "GitHub", href: "https://github.com/JJKSweaty/MNIST" }],
    caseStudy: {
      overview:
        "This project explores GPU performance engineering by implementing a two-layer MLP for MNIST with custom CUDA kernels and cuBLAS-backed matrix operations.",
      problem:
        "The goal was to understand where GPU acceleration helps, where framework overhead hides costs, and how memory movement shapes real training performance.",
      ownership:
        "I implemented the training path, CUDA kernels, cuBLAS integration, PyTorch comparison, and benchmarking workflow.",
      architecture: [
        "MNIST batch",
        "Host preprocessing",
        "Device buffers",
        "CUDA kernels",
        "cuBLAS SGEMM",
        "Metrics",
      ],
      components: [
        "C++/CUDA training loop",
        "Custom activation and loss kernels",
        "cuBLAS matrix multiplication",
        "PyTorch baseline",
        "Timing and profiling scripts",
      ],
      engineering: [
        "Compared custom kernels against framework execution rather than assuming manual CUDA is always faster.",
        "Focused on transfer overhead, device allocation, kernel launch cost, and SGEMM throughput.",
        "Kept the model small enough to make bottlenecks visible during iteration.",
      ],
      validation: [
        "Compared output behavior against the PyTorch baseline.",
        "Measured training time across repeated runs to avoid one-off timing conclusions.",
        "Validated accuracy and loss trends on MNIST samples.",
      ],
      results: [
        "Built a working CUDA training path and benchmarked it against the PyTorch implementation.",
        "Identified the performance tradeoffs between custom kernels, cuBLAS, and framework-managed execution.",
      ],
    },
  },
  {
    slug: "esp32-media-controller",
    title: "ESP32 Wi-Fi Media Controller",
    subtitle: "Touchscreen embedded UI and telemetry controller",
    year: "2025",
    category: "Embedded UI",
    status: "In progress",
    featured: true,
    role: "Designed the ESP32 firmware, LVGL touchscreen interface, Wi-Fi event pipeline, and PC telemetry bridge.",
    summary:
      "ESP32-S3 device with LVGL UI for media controls, system telemetry, artwork rendering, and Discord status over a Wi-Fi communication pipeline.",
    decisions: [
      "Separated the PC telemetry service from the ESP32 UI so each side owns a clear responsibility.",
      "Used event-driven message handling to keep touch interaction responsive under frequent updates.",
      "Rendered media metadata and artwork with bounded buffers to respect embedded memory limits.",
    ],
    tags: ["ESP32-S3", "LVGL", "FreeRTOS", "Wi-Fi", "WebSockets", "SPI"],
    image: {
      src: esp32MediaPreview,
      alt: "ESP32 media controller demo thumbnail",
      fit: "cover",
      position: "58% 42%",
    },
    media: [
      {
        type: "youtube",
        src: "https://youtu.be/r_K0236xxg4",
        caption: "ESP32 media controller demo video",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/JJKSweaty/ESP32Media" },
      { label: "Video", href: "https://youtu.be/r_K0236xxg4" },
    ],
    cad: {
      files: [
        {
          label: "Download STL",
          href: "/assets/esp32-media/cad/JJKscreenmount.STL",
        },
        {
          label: "Download SolidWorks part",
          href: "/assets/esp32-media/cad/JJKscreenmount.SLDPRT",
        },
      ],
      thumbnail: "/assets/esp32-media/cad/model_thumb.svg",
    },
    caseStudy: {
      overview:
        "The ESP32 Wi-Fi Media Controller is a custom touchscreen hardware dashboard for media controls, system statistics, artwork, and live communication status.",
      problem:
        "A small embedded dashboard has to feel responsive while receiving frequent telemetry, decoding artwork, and handling touch input on limited memory and CPU budget.",
      ownership:
        "I owned the embedded firmware structure, LVGL interface, communication protocol, display behavior, and hardware mounting workflow.",
      architecture: [
        "Computer telemetry service",
        "Wi-Fi API",
        "ESP32 event pipeline",
        "LVGL interface",
        "Touch input",
        "Media commands",
      ],
      components: [
        "ESP32-S3 controller",
        "480x320 SPI touchscreen",
        "LVGL interface",
        "Python telemetry service",
        "WebSocket or socket communication",
        "3D-printed screen mount",
      ],
      engineering: [
        "Separated UI rendering, communication, and input handling so network updates do not block touch response.",
        "Used compact rendering paths for metadata and artwork on memory-constrained hardware.",
        "Created a physical mounting workflow with downloadable CAD artifacts.",
      ],
      validation: [
        "Tested media command flows against the host computer service.",
        "Validated telemetry update rates while interacting with the touchscreen.",
        "Debugged display behavior, touch input, and Wi-Fi message handling on real hardware.",
      ],
      results: [
        "Produced a working embedded controller demo with media controls, telemetry, and visual feedback.",
        "Built reusable firmware and UI patterns for future ESP32 touchscreen systems.",
      ],
    },
  },
  {
    slug: "vision-guided-autonomous-disk-launcher",
    title: "Vision-Guided Robotics Platform",
    subtitle: "Perception, tracking, actuation, and safety interlocks",
    year: "2025",
    category: "Robotics",
    status: "Completed",
    featured: true,
    role: "Built the perception-to-control integration across Raspberry Pi vision, ESP32 actuation, PID tracking, LiDAR validation, and safety-gated sequencing.",
    summary:
      "Raspberry Pi perception and ESP32-S3 real-time actuation platform with PID tracking, LiDAR range validation, and interlocked electromechanical control.",
    decisions: [
      "Split perception and actuation across Raspberry Pi and ESP32-S3 to keep real-time control deterministic.",
      "Converted visual target offsets into pan/tilt setpoints through PID tracking.",
      "Gated actuation on tracking and LiDAR validation so sequencing is explicit and testable.",
    ],
    tags: ["Raspberry Pi", "ESP32-S3", "PID", "LiDAR", "Serial", "Control"],
    image: {
      src: roboticsPlatformPreview,
      alt: "Pan-tilt mechanism used for target tracking",
      fit: "cover",
    },
    media: [
      {
        type: "image",
        src: "/images/panTilt.jpeg",
        alt: "Pan-tilt mechanism used for target tracking",
        caption: "Pan-tilt mechanism used for target tracking",
      },
      {
        type: "image",
        src: "/images/flywheel.png",
        alt: "Dual flywheel actuation mechanism",
        caption: "Dual flywheel actuation mechanism",
      },
      {
        type: "video",
        src: "/demos/autonomous-launcher-demo.mp4",
        caption: "Bench demo showing tracking and sequencing behavior",
      },
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JJKSweaty/Autonomous-Disk-Launcher",
      },
      {
        label: "Demo",
        href: "/demos/autonomous-launcher-demo.mp4",
      },
    ],
    caseStudy: {
      overview:
        "This project is a vision-guided robotics and control platform that connects camera perception, real-time microcontroller actuation, range validation, and safety-gated sequencing.",
      problem:
        "The system needed to translate noisy visual target measurements into stable physical motion while keeping actuation decisions separate from perception confidence and range validation.",
      ownership:
        "I built the embedded control path, perception-control interface, PID tracking behavior, LiDAR validation, and hardware integration.",
      architecture: [
        "Camera",
        "Raspberry Pi perception",
        "Serial protocol",
        "ESP32-S3 control",
        "PID pan/tilt",
        "LiDAR interlock",
        "Actuation",
      ],
      components: [
        "Raspberry Pi perception host",
        "ESP32-S3 real-time controller",
        "Pan-tilt servo mechanism",
        "TF-Luna LiDAR",
        "Brushless motor/flywheel assembly",
        "3D-printed mechanical components",
      ],
      engineering: [
        "Defined a clean serial boundary between target perception and actuation control.",
        "Used PID tracking to reduce angular error before enabling any actuation sequence.",
        "Added LiDAR range checks and explicit gating to make safety behavior observable during tests.",
      ],
      validation: [
        "Bench-tested pan/tilt tracking and target offset response.",
        "Validated LiDAR readings against expected distance bands before sequencing.",
        "Tested perception, serial messaging, and control behavior together on the integrated platform.",
      ],
      results: [
        "Built a working mechatronic prototype with perception-driven tracking and interlocked actuation.",
        "Gained practical experience debugging timing, control stability, and hardware interactions.",
      ],
    },
  },
  {
    slug: "heartbeat-monitor-pcb",
    title: "Heartbeat Monitor PCB",
    subtitle: "Biomedical sensing board",
    year: "2024",
    category: "Hardware",
    status: "Completed",
    featured: false,
    role: "Designed the KiCad PCB and firmware integration around MAX30102 sensing and STM32/Arduino data handling.",
    summary:
      "Custom PCB for BPM and SpO2 tracking using a MAX30102 sensor, USB-C power input, I2C communication, and embedded display output.",
    decisions: [
      "Kept the board compact while preserving sensor placement and decoupling for signal quality.",
      "Used I2C pull-ups and firmware-side checks to keep sensor reads stable.",
      "Designed around accessible STM32/Arduino tooling for quick firmware iteration.",
    ],
    tags: ["KiCad", "MAX30102", "I2C", "STM32", "USB-C"],
    image: {
      src: heartbeatpcb,
      alt: "Heartbeat monitor PCB render",
      fit: "contain",
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JJKSweaty/Heartbeat-Monitor-STM32-Using-Arduino-IDE-",
      },
    ],
    caseStudy: {
      overview:
        "A compact biomedical sensing board built around the MAX30102 for heart-rate and oxygen-saturation experiments.",
      problem:
        "The board needed reliable I2C communication, clean power delivery, and sensor placement suitable for repeatable readings.",
      ownership:
        "I designed the schematic, PCB layout, and microcontroller integration path.",
      architecture: ["USB-C power", "MAX30102 sensor", "I2C bus", "STM32 firmware", "Display output"],
      components: ["MAX30102", "STM32", "USB-C input", "I2C pull-ups", "KiCad PCB"],
      engineering: [
        "Placed decoupling and routing around the optical sensor to reduce avoidable noise.",
        "Validated I2C sensor communication and firmware-side readings.",
        "Kept the board manufacturable and easy to inspect during bring-up.",
      ],
      validation: [
        "Checked sensor reads through firmware logs and display output.",
        "Reviewed board layout for connectivity, power, and basic manufacturability.",
      ],
      results: [
        "Produced a working PCB design for wearable-style heart-rate and SpO2 sensing experiments.",
      ],
    },
  },
  {
    slug: "spi-controlled-pwm-peripheral",
    title: "SPI Controlled PWM Peripheral",
    subtitle: "Tiny Tapeout-style digital peripheral",
    year: "2026",
    category: "Computer Architecture",
    status: "Verified RTL",
    featured: true,
    role: "Designed and verified the SPI-to-PWM RTL path with memory-mapped registers, CDC handling, and Cocotb tests.",
    summary:
      "Verilog SPI-to-PWM ASIC peripheral with Mode 0 transaction decoding, register writes, clock-domain crossing, and verified PWM timing.",
    decisions: [
      "Used memory-mapped control registers for predictable software-facing behavior.",
      "Added synchronized edge detection and bit counting for SPI input robustness.",
      "Verified timing and register behavior with Cocotb and waveform inspection.",
    ],
    tags: ["Verilog", "SPI", "PWM", "CDC", "Cocotb", "GTKWave"],
    image: {
      src: spiPwmPreview,
      alt: "SPI controlled PWM peripheral layout",
      fit: "contain",
      position: "center top",
    },
    links: [
      {
        label: "GDS viewer",
        href: "https://gds-viewer.tinytapeout.com/?process=SKY130&model=https%3A%2F%2Fjjksweaty.github.io%2Fonboarding-start%2F%2Ftinytapeout.gds",
      },
    ],
  },
  {
    slug: "signtolearn",
    title: "SignToLearn",
    subtitle: "Real-time ASL gesture recognition",
    year: "2024",
    category: "Computer Vision",
    status: "Completed",
    featured: false,
    role: "Built the real-time hand-tracking and model-backed recognition flow for ASL learning.",
    summary:
      "Interactive ASL learning application using MediaPipe hand tracking, TensorFlow recognition, Flask APIs, and a React interface.",
    decisions: [
      "Used MediaPipe landmarks as the compact input representation for gesture recognition.",
      "Separated inference service and web interface to keep the UI responsive.",
      "Focused feedback around real-time practice instead of static flashcards.",
    ],
    tags: ["React", "Flask", "TensorFlow", "OpenCV", "MediaPipe"],
    image: {
      src: signtolearn,
      alt: "SignToLearn application screenshot",
      fit: "contain",
    },
    links: [{ label: "GitHub", href: "https://github.com/JJKSweaty/SignToLearn/" }],
  },
  {
    slug: "claude-firmware-assistant",
    title: "Claude Firmware Assistant",
    subtitle: "RAG assistant for firmware workflows",
    year: "2025",
    category: "AI Tooling",
    status: "In progress",
    featured: false,
    role: "Built a firmware-focused assistant with scoped memory, RAG, streaming, and context compression.",
    summary:
      "AI agent for firmware tasks using RAG, Supabase session memory, secure upload, and prompt compression to reduce context size.",
    decisions: [
      "Scoped memory by session so prior context can help without polluting unrelated work.",
      "Used selective context injection to reduce token usage.",
      "Designed streaming responses for practical debugging and development workflows.",
    ],
    tags: ["Claude AI", "RAG", "Supabase", "Node.js", "React"],
    image: {
      src: claudefirmwareai,
      alt: "Claude firmware assistant screenshot",
      fit: "contain",
    },
    links: [{ label: "GitHub", href: "https://github.com/JJKSweaty/jjkAI" }],
  },
  {
    slug: "truvote",
    title: "TruVote",
    subtitle: "Biometric voting platform",
    year: "2025",
    category: "Full Stack",
    status: "Completed",
    featured: false,
    role: "Implemented face-authentication and backend voting flows for one-person-one-vote validation.",
    summary:
      "Secure voting platform using facial embeddings, Flask, OpenCV, Supabase, and a Next.js interface.",
    decisions: [
      "Used facial embeddings for identity checks at ballot submission.",
      "Separated election setup, vote casting, auditing, and result verification flows.",
      "Kept backend authorization logic explicit for easier review.",
    ],
    tags: ["Next.js", "Flask", "OpenCV", "Supabase"],
    image: {
      src: truvote,
      alt: "TruVote application screenshot",
      fit: "contain",
    },
    links: [{ label: "GitHub", href: "https://github.com/18gen/hack-canada" }],
  },
];

const featuredProjectOrder = [
  "spi-controlled-pwm-peripheral",
  "cuda-mlp-mnist",
  "esp32-media-controller",
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => {
    const aIndex = featuredProjectOrder.indexOf(a.slug);
    const bIndex = featuredProjectOrder.indexOf(b.slug);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
export const archiveProjects = projects.filter((project) => !project.featured);

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);
