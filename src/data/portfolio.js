import claudefirmwareai from "../assets/claudefirmwareai.png";
import cudaMlpPreview from "../assets/project-previews/cuda-mlp-preview.png";
import esp32MediaPreview from "../assets/project-previews/esp32-media-preview.jpg";
import faceLogo from "../assets/jonathan-portrait.jpg";
import heartbeatpcb from "../assets/hearbeatsensor pcb.png";
import roboticsPlatformPreview from "../assets/project-previews/robotics-platform-preview.jpg";
import signtolearn from "../assets/signtolearn.png";
import spiPwmPreview from "../assets/project-previews/spi-pwm-preview.png";
import tcpIpStackPreview from "../assets/project-previews/tcp-ip-stack-preview.svg";
import truvote from "../assets/truvote.png";

export const portfolio = {
  person: {
    name: "Jonathan Jacob Koshy",
    initials: "JJK",
    title: "Firmware & Embedded Systems Engineer",
    location: "Waterloo, ON / Montreal, QC",
    email: "johnkoper12@gmail.com",
    resumePath: "/Jonathan_Jacob_Koshy_resume.pdf",
    hardwarePortfolioPath: "/hardware-portfolio.pdf",
    headshot: faceLogo,
    summary:
      "Electrical Engineering student at the University of Waterloo building low-level software for sensing, control, communication, and edge-compute systems.",
    focus:
      "Currently working in embedded firmware and interested in firmware, systems software, embedded Linux, GPU systems, and hardware-software integration.",
    availability: [
      {
        label: "Currently",
        value: "Vehicle firmware at Midnight Sun · Flight software at WARG",
      },
      {
        label: "Seeking",
        value: "Winter 2027 firmware and systems opportunities",
      },
    ],
  },
  navLinks: [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "teams", label: "Design Team" },
    { id: "contact", label: "Contact" },
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/JJKSweaty",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jonathan-jacob-koshy-49b683291/",
    },
    {
      label: "Email",
      href: "mailto:johnkoper12@gmail.com",
    },
  ],
};

// Resume-aligned industry experience; student teams are listed separately below.
export const experiences = [
  {
    company: "Belimo",
    role: "Firmware Development Intern",
    location: "Montreal, QC",
    period: "May – Aug 2026",
    companyUrl: "https://www.belimo.com/",
    domains: ["PIC18", "Embedded C", "Modbus", "ADC"],
    summary: "Worked on memory-constrained sensor firmware: 20% lower memory use, 30% lower keypad latency, and 10% better gas measurement accuracy.",
    details: [
      "Removed dead code and simplified memory-heavy routines to meet PIC18 flash limits.",
      "Diagnosed CAN, UART, and I2C timing and framing faults using oscilloscopes and logic analyzers.",
      "Tuned interrupt timing and debounce windows for faster, stable input detection; filtered ADC samples to suppress sensor noise.",
      "Restored Modbus communication after malformed frames by correcting UART parsing and state recovery.",
      "Validated sensor behavior, fault conditions, edge cases, and PCB operation against UL test cases.",
    ],
  },
  {
    company: "AeroCardia",
    role: "Embedded Software Intern",
    hardwarePage: 3,
    location: "Montreal, QC",
    period: "Sep – Dec 2025",
    companyUrl: "https://www.aerocardia.com/",
    domains: ["ESP32", "FreeRTOS", "BLE OTA", "Altium"],
    summary: "Led core ESP32 firmware for a cardiopulmonary wearable. Reduced dropped biosignal samples by 25% and brought secure firmware updates under one minute.",
    details: [
      "Developed C++ drivers for IMU, PPG, and temperature sensors for synchronized 50 Hz biosignal capture.",
      "Decoupled sensor acquisition from BLE telemetry with FreeRTOS queues and buffered handoff.",
      "Implemented secure BLE OTA with image verification and rollback.",
      "Designed an O2 sensor PCB in Altium with EEPROM-backed calibration that persists across power cycles.",
    ],
  },
  {
    company: "University of Waterloo · ECE",
    role: "Information Technology Intern",
    location: "Waterloo, ON",
    period: "Sep – Dec 2024",
    domains: ["Linux", "Windows", "Networking", "Hardware"],
    summary: "Supported research and teaching infrastructure across Linux and Windows workstations, networking, drivers, and lab hardware.",
    details: [
      "Automated workstation imaging and deployment for course and lab environments.",
      "Troubleshot hardware, driver, networking, and OS failures for faculty, students, and lab systems.",
      "Configured workstation hardware for research and specialized course workloads.",
    ],
  },
];

export const designTeams = [
  {
    company: "Midnight Sun Solar Car Team",
    role: "Vehicle Firmware Member",
    hardwarePage: 4,
    sourceUrl: "https://github.com/uw-midsun/fwxvi",
    image: { src: "/images/hardware/midnight-sun-bench.jpg", alt: "Midnight Sun steering wheel and vehicle controllers during bench integration" },
    location: "Waterloo, ON",
    period: "Aug 2026 – Present",
    domains: ["C", "FOTA", "CAN", "Bootloaders"],
    summary: "Cruise-control safety logic and reliable firmware updates for the solar car’s vehicle controllers.",
    details: [
      "Fixed front-controller safety state-machine faults blocking WaveSculptor CAN setpoint tests.",
      "Built a C FOTA bootloader that stages flash-page writes and verifies the whole image before copying it into the application region.",
      "Added CRC32 validation, sequencing, and ACK retries to reject corrupted or out-of-order firmware before flash writes.",
      "Built reusable UART/CAN update transport with ISR-fed circular buffers, separating FOTA logic from vehicle bus I/O.",
      "Work is at the bench-integration and setpoint-test stage. CRC32 checks detect accidental corruption; they do not authenticate the sender.",
    ],
  },
  {
    company: "Waterloo Aerial Robotics",
    role: "Embedded Flight Software Member",
    hardwarePage: 5,
    sourceUrl: "https://github.com/UWARG/efs-zeropilot-4.0",
    image: { src: "/images/hardware/uwarg-controller.jpg", alt: "ZeroPilot flight-controller hardware on the bench" },
    location: "Waterloo, ON",
    period: "Dec 2024 – Present",
    companyUrl: "https://www.uwarg.com/",
    domains: ["STM32H7", "PID", "ZeroPilot", "LTE"],
    summary: "Flight-control firmware for ZeroPilot: motor mixing, attitude stabilization, and modem integration. Reduced flight oscillation by 20% and motor-command jitter by 30%.",
    details: [
      "Implemented roll/yaw motor mixing on STM32H7 to reduce cross-axis coupling in fixed-wing control modes.",
      "Diagnosed attitude-loop instability and retuned PID gains during stabilization tests.",
      "Corrected control-loop timing and actuator scaling to reduce motor-command jitter.",
      "Built a Quectel EG915Q LTE driver with a UART AT-command state machine for modem control and Raspberry Pi integration.",
    ],
  },
  {
    company: "UWASIC",
    role: "ASIC Digital Member",
    location: "Waterloo, ON",
    period: "Jan 2026 – Present",
    companyUrl: "https://uwasic.com/",
    domains: ["Verilog", "SPI", "PWM", "Cocotb"],
    summary: "Designed and verified an SPI-controlled PWM peripheral for Tiny Tapeout-style ASIC integration.",
    details: [
      "Implemented synchronized Mode 0 SPI input handling, bit counting, address validation, and memory-mapped register writes.",
      "Verified edge detection, clock-domain crossing, and PWM timing with Cocotb, Icarus Verilog, and GTKWave.",
    ],
  },
  {
    company: "Electrium Mobility",
    role: "Embedded Software Intern",
    location: "Waterloo, ON",
    period: "May – Sep 2025",
    companyUrl: "https://electriummobility.com/",
    domains: ["ESP32", "BLE", "VESC", "UART"],
    summary: "ESP32 vehicle dashboard firmware connecting VESC telemetry, event-driven BLE, and embedded display updates.",
    details: [
      "Designed modular firmware paths for live telemetry, controls, and display updates.",
      "Integrated motor and battery state into the dashboard while handling rapid state changes and noisy sensor updates.",
    ],
  },
];

export const projects = [
  {
    "slug": "badge-market",
    "title": "Badge Market",
    "subtitle": "Offline multiplayer firmware for Hack the North badges",
    "year": "2026",
    "category": "Embedded Firmware",
    "status": "Hack the North 2026",
    "featured": false,
    "hardwarePage": 7,
    "role": "Built native C++ firmware, board drivers, DMA display rendering, ESP-NOW synchronization, and persistent saves.",
    "summary": "An offline multiplayer trading game running on ESP32-C3 badges. One badge hosts the market while nearby players trade fictional currency over ESP-NOW.",
    "tags": [
      "ESP32-C3",
      "C++17",
      "ESP-IDF",
      "ESP-NOW",
      "DMA",
      "NVS"
    ],
    "image": {
      "src": "/images/hardware/badge-market.jpg",
      "alt": "Badge Market buy and sell screen running on a Hack the North badge",
      "fit": "contain"
    },
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/JJKSweaty/badge-market"
      },
      {
        "label": "Verification Notes",
        "href": "https://github.com/JJKSweaty/badge-market/blob/main/firmware/VERIFICATION.md"
      },
      {
        "label": "Video",
        "href": "https://youtu.be/2Qrzvv-iPmM"
      }
    ],
    "media": [
      {
        "type": "image",
        "src": "/images/hardware/badge-market-screens.jpg",
        "alt": "Badge Market home, trading, and MEMEWORD puzzle screens",
        "caption": "Market home, buy/sell controls, and puzzle input on physical badges.",
        "fit": "contain"
      },
      {
        "type": "youtube",
        "src": "https://youtu.be/2Qrzvv-iPmM",
        "caption": "Badge Market demo"
      }
    ],
    "caseStudy": {
      "overview": "Badge Market is a shared game for Hack the North badges. Nearby players earn fictional currency, launch coins, and trade without a phone or internet connection during play. I moved the game from a stock-runtime Lua app to native C++ firmware.",
      "problem": "The badges needed consistent shared state over an unreliable radio link, responsive display updates within a small RAM budget, and saves that survive restarts.",
      "ownership": "I implemented the board drivers, display renderer, ESP-NOW transport, trade synchronization, and persistent saves.",
      "architecture": [
        "Guest input",
        "ESP-NOW request",
        "Host commits trade",
        "Chunked snapshot",
        "Validated guest state",
        "SPI display"
      ],
      "components": [
        "ESP32-C3 badges running ESP-IDF and C++17",
        "ESP-NOW transport with a 16-packet receive queue",
        "320 × 240 RGB565 SPI display",
        "Two 5 KiB DMA stripe buffers",
        "Dual-slot NVS persistence for host and solo modes"
      ],
      "engineering": [
        "Only the host commits trades. Guests retry using the same sequence number and payload so a lost reply does not apply a trade twice.",
        "Snapshots travel in 200-byte chunks with revision, length, offset, and CRC checks. Partial snapshots never become visible state.",
        "Two 5 KiB DMA buffers replace a 153,600-byte full framebuffer. Eight-row stripe hashes limit SPI transfers to changed regions.",
        "Saving writes the older of two NVS slots, commits it, and reads it back. Checkpoints occur at gameplay-safe points."
      ],
      "results": [
        "Built native firmware for offline badge-to-badge play, including a market, trading controls, and MEMEWORD input.",
        "Reduced display RAM requirements with stripe rendering and prevented duplicate credits during request retries."
      ],
      "limitations": [
        "Trading depends on the host remaining nearby; there is no host migration.",
        "Unexpected power loss can roll back changes since the most recent checkpoint.",
        "Moved or removed graphics must invalidate affected display stripes."
      ]
    }
  },
  {
    slug: "userspace-tcp-ip-stack",
    title: "Userspace TCP/IP Stack",
    subtitle: "Raw Ethernet frames to ARP, IPv4, ICMP, UDP, and TCP",
    year: "2026",
    category: "Systems Software",
    featured: true,
    role: "Built an educational C networking stack around a Linux TAP device, packet parsing, checksums, TCP state, and terminal-driven demos.",
    summary:
      "C userspace TCP/IP stack that reads raw Ethernet frames from a TAP device and implements the packet path without kernel sockets for stack logic.",
    decisions: [
      "Kept the packet path explicit: TAP -> Ethernet -> ARP or IPv4 -> ICMP / UDP / TCP.",
      "Paired terminal demos with packet fields so the stack is understandable from bytes to C structs.",
      "Documented current limits instead of implying production TCP behavior.",
    ],
    tags: ["C", "Linux TAP", "Ethernet", "ARP", "IPv4", "TCP"],
    image: {
      src: tcpIpStackPreview,
      alt: "Userspace TCP/IP stack packet path visualization",
      fit: "contain",
      position: "center",
    },
    links: [{ label: "GitHub", href: "https://github.com/JJKSweaty/tcpip-stack" }],
    caseStudy: {
      label: "View Project",
      href: "/projects/userspace-tcp-ip-stack",
      overview:
        "Project overview, packet flow, and implementation details for a userspace TCP/IP stack written in C.",
      engineering: [
        "Linux TAP device supplies raw Ethernet frames.",
        "Ethernet dispatches ARP or IPv4, then IPv4 dispatches ICMP, UDP, or TCP.",
      ],
      results: ["Built an explorable project page around packet flow, terminal demos, and source-file callouts."],
    },
  },
  {
    slug: "remembr",
    title: "remembR",
    subtitle: "Edge AI dementia companion",
    year: "2026",
    category: "Edge Computing",
    status: "HackCanada 2026 Winner",
    featured: true,
    hardwarePage: 6,
    role: "Built the edge-compute perception and hardware-software architecture for object finding, persistent memory, and pan-tilt scanning.",
    summary:
      "An edge AI companion that remembers where objects were last seen. Raspberry Pi 5 and Hailo-8L run detection locally, with pan-and-tilt room scanning.",
    showcaseNote: "1080p · 30fps detection / HackCanada winner",
    decisions: [
      "Used a bounded detection queue and discarded the oldest batch when full to keep observations current.",
      "Kept timestamped object records in JSON so recent history survives restarts.",
      "Drove pan-tilt servos with a PCA9685 controller to scan beyond the current camera view.",
    ],
    tags: ["Raspberry Pi 5", "Hailo-8L", "YOLOv8s", "Python", "PCA9685", "FastAPI"],
    image: {
      src: "/images/hardware/remembr-bench.jpg",
      alt: "remembR Raspberry Pi, pan-tilt camera, and controller wiring on the bench",
      fit: "cover",
    },
    media: [
      { type: "image", src: "/images/hardware/remembr-bench.jpg", alt: "remembR bench setup", caption: "Pi, pan-tilt camera, and controller wiring.", fit: "contain" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/JJKSweaty/remembR" },
      { label: "Devpost (Ember)", href: "https://devpost.com/software/ember-n8m3yk" },
    ],
    caseStudy: {
      "overview": "remembR is an edge AI memory-aid prototype that helps locate misplaced objects. A Raspberry Pi 5 and Hailo-8L process camera detections locally and return last-seen information to a phone interface.",
      "problem": "Object search needs recent observations and useful history. Inference, camera motion, and phone queries must share limited processing time without building a backlog of stale detections.",
      "ownership": "I built the Pi/Hailo inference pipeline, persistent object memory, and pan-tilt camera hardware.",
      "architecture": [
        "Camera",
        "Hailo-8L inference",
        "Bounded detection queue",
        "Object memory",
        "FastAPI / WebSockets",
        "Phone interface"
      ],
      "components": [
        "Raspberry Pi 5 and Hailo-8L accelerator",
        "YOLOv8s inference with GStreamer callbacks",
        "PCA9685 PWM controller and pan-tilt servos",
        "JSON object records with timestamps",
        "FastAPI and WebSockets over Tailscale"
      ],
      "engineering": [
        "A callback queues detection metadata and an optional frame; a worker filters detections and updates object records.",
        "The queue discards its oldest batch when full. Empty batches also reach the worker so absence updates the temporal filter.",
        "A three-hits-in-five-frames rule reduces detection flicker at the cost of a short confirmation delay.",
        "Hardware PWM maintains servo pulses while the Pi processes frames. Scanning expands coverage but requires camera settling time."
      ],
      "results": [
        "Recognized as a winner at HackCanada 2026.",
        "Built a 1080p, 30 fps detection pipeline with persistent last-seen records and pan-tilt object search."
      ],
      "limitations": [
        "Records are grouped by class label, so two objects of the same class are not reliably distinguished.",
        "Location descriptions refer to the camera image, not mapped room coordinates.",
        "Wallet queries use the model’s handbag class as a proxy, which limits recognition accuracy."
      ]
    },
  },
  {
    slug: "cuda-mlp-mnist",
    title: "CUDA MLP / GPU Performance Engineering",
    subtitle: "Custom CUDA kernels for neural-network training",
    year: "2024",
    category: "GPU Systems",
    featured: false,
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
    featured: true,
    hardwarePage: 8,
    role: "Designed the ESP32 firmware, LVGL touchscreen interface, Wi-Fi event pipeline, and PC telemetry bridge.",
    summary:
      "A dedicated touchscreen for PC telemetry, music, and Discord. A queued TCP/JSON protocol keeps media commands and live updates moving over Wi-Fi.",
    showcaseNote: "LVGL touchscreen / Bidirectional TCP + JSON",
    decisions: [
      "Separated the PC telemetry service from the ESP32 UI so each side owns a clear responsibility.",
      "Used event-driven message handling to keep touch interaction responsive under frequent updates.",
      "Rendered RGB565 artwork alongside media metadata on the ESP32 touchscreen.",
    ],
    tags: ["ESP32", "LVGL", "FreeRTOS", "Wi-Fi", "TCP / JSON", "SPI"],
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
        "Newline-delimited JSON over TCP",
        "ESP32 event pipeline",
        "LVGL interface",
        "Touch input",
        "Media commands",
      ],
      components: [
        "ESP32 controller",
        "320 × 240 SPI display with XPT2046 touch controller",
        "LVGL interface",
        "Python telemetry service",
        "Queued TCP/JSON protocol for telemetry and media commands",
        "3D-printed screen mount",
      ],
      engineering: [
        "A lower-priority FreeRTOS task parses network data while the main loop services LVGL. A one-element overwrite queue keeps only the newest pending snapshot.",
        "Newline-delimited JSON provides TCP message boundaries. Touch commands use a separate bounded queue so the UI does not wait for socket writes.",
        "Decoded 80 × 80 RGB565 artwork into one reusable 12,800-byte buffer, outside the snapshot queue. Artwork is skipped when heap is low.",
        "Created a physical mounting workflow with downloadable CAD artifacts.",
      ],
      validation: [
        "Tested media command flows against the host computer service.",
        "Validated telemetry update rates while interacting with the touchscreen.",
        "Corrected display byte order and inversion settings, then mapped raw touch readings into screen coordinates.",
      ],
      limitations: [
        "Outbound commands can be dropped when the queue fills. Application-level acknowledgements would be needed to confirm delivery.",
        "Base64 artwork adds bandwidth overhead: 17,068 characters before JSON framing.",
      ],
      results: [
        "Produced a working embedded controller demo with media controls, telemetry, and visual feedback.",
        "Built reusable firmware and UI patterns for future ESP32 touchscreen systems.",
      ],
    },
  },
  {
    slug: "custom-vr-headset",
    title: "jjkVR",
    subtitle: "Custom PCB, firmware, shell CAD, and SteamVR integration",
    year: "2026",
    category: "Hardware Systems",
    featured: true,
    hardwarePage: 2,
    role: "Built the tracking firmware, custom PCB, and SteamVR integration for a 2K, 120 Hz open-source headset.",
    summary:
      "A custom VR headset with STM32 sensor fusion, USB HID tracking, a two-layer PCB, and SteamVR integration. The current prototype supports 4DoF seated tracking.",
    showcaseNote: "4DoF seated prototype / 2K · 120 Hz display",
    decisions: [
      "Calibrated IMU bias at startup and used FastIMU quaternion fusion for stable orientation.",
      "Mapped coordinates in firmware and sent a fixed 64-byte HID report, avoiding a second axis conversion in the PC driver.",
      "Used TF-Luna LiDAR range baselining for bounded forward tracking in seated movement.",
    ],
    tags: ["C", "STM32F411", "ICM20948", "USB HID", "OpenVR", "KiCad"],
    image: {
      src: "/images/headsetphotovr.jpg",
      alt: "Custom VR headset prototype shell",
      fit: "cover",
      position: "center",
    },
    featuredMedia: [
      {
        src: "/assets/vrproject/vr_custom_pcb.png",
        alt: "Custom jjkVR tracking PCB",
        fit: "contain",
        position: "center",
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/JJKSweaty/jjkVR" }],
    media: [
      { type: "image", src: "/images/headsetphotovr.jpg", alt: "jjkVR headset prototype", caption: "Headset prototype with the display illuminated." },
      { type: "image", src: "/assets/vrproject/vr_custom_pcb.png", alt: "Two-layer jjkVR tracking PCB", caption: "Custom STM32F411 tracking PCB.", fit: "contain" },
    ],
    cad: {
      thumbnail: "/assets/vrproject/model_thumb.svg",
      files: [
        { label: "Download body STL", href: "/assets/vrproject/body.stl" },
        { label: "Download eyes panel STL", href: "/assets/vrproject/eyes_panel.stl" },
        { label: "Download front panel STL", href: "/assets/vrproject/front_panel.stl" },
        { label: "Download screen panel STL", href: "/assets/vrproject/screen_panel.stl" },
        { label: "Download foam support STL", href: "/assets/vrproject/foam_support.stl" },
        { label: "Download screws BOM", href: "/assets/vrproject/screws_BOM.xlsx" },
      ],
    },
    caseStudy: {
      overview:
        "jjkVR is an open-source 2K, 120 Hz headset combining STM32 tracking firmware, custom electronics, a printed enclosure, and PC-side SteamVR integration.",
      problem:
        "The tracking stack needed stable orientation, a consistent coordinate system, and bounded forward movement without accumulating inertial drift.",
      ownership:
        "I built the STM32 tracking stack, USB HID pose transport, OpenVR coordinate mapping, LiDAR-assisted forward tracking, and two-layer KiCad PCB.",
      architecture: ["ICM20948 + TF-Luna", "STM32F411 fusion", "USB HID", "OpenVR coordinates", "SteamVR"],
      components: [
        "STM32F411 MCU and ICM20948 IMU",
        "TF-Luna LiDAR for bounded forward tracking",
        "2K, 120 Hz headset display",
        "Two-layer KiCad PCB with USB-C and regulated power",
        "3D-printed shell and mounting parts",
      ],
      engineering: [
        "Combined startup IMU bias calibration with FastIMU quaternion fusion on STM32F411.",
        "Scheduled IMU reads every 5 ms and 64-byte HID reports every 10 ms. The report carries orientation, optional position, validity flags, and sensor status.",
        "Parsed checksummed TF-Luna UART frames and gated range correction on heading alignment, since turning toward a different surface can change distance without head translation.",
        "Designed USB-C, fused 5 V display power, 3.3 V regulation, IMU filtering, and test points. The PC drives video independently of the MCU’s pose reports.",
      ],
      limitations: [
        "Tracking has three rotational axes and one experimental forward-translation axis. Lateral and vertical position remain fixed.",
        "Forward tracking uses a stationary range baseline and depends on heading alignment. Full 6DoF requires an external positional reference and is planned for V2.",
      ],
      references: [
        { label: "Relativty driver reference", href: "https://github.com/relativty/Relativty" },
        { label: "HadesVR reference", href: "https://github.com/UkonnRa/HadesVR" },
      ],
      results: [
        "Built a custom tracking stack spanning sensor fusion, USB HID, and SteamVR integration.",
        "Added bounded forward tracking alongside orientation tracking for seated movement.",
        "Designed the custom PCB and printable headset enclosure.",
      ],
    },
  },
  {
    slug: "vision-guided-autonomous-disk-launcher",
    title: "Vision-Guided Robotics Platform",
    subtitle: "Perception, tracking, actuation, and safety interlocks",
    year: "2025",
    category: "Robotics",
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
  "custom-vr-headset",
  "esp32-media-controller",
  "remembr",
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
