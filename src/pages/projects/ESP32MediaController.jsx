import React from "react";

import { Navbar } from "../../components";
import { styles } from "../../styles";

const ESP32MediaController = () => {
  return (
    <div className="relative bg-black/30 min-h-screen">
      <Navbar />

      <section className={`${styles.padding} max-w-4xl mx-auto relative z-0 pt-28`}>
        <h1 className="text-4xl font-bold text-[var(--theme-primary)] mb-6">
          ESP32 Wifi Media Controller
        </h1>

        <div className="mb-8 flex items-center gap-4">
          <a
            href="https://github.com/JJKSweaty/ESP32Media"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-300 underline underline-offset-4 hover:text-[var(--theme-primary)]"
          >
            GitHub Repository
          </a>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
        <p className="text-slate-300 leading-relaxed">
          Designed and built a real-time embedded dashboard on an ESP32 with a 480×320 touchscreen display.
          The system runs a multitasking FreeRTOS environment and communicates with a Python backend over
          Wi-Fi to visualize system metrics, control media playback, and display live Discord call data.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Embedded Architecture</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Implemented a multi-task FreeRTOS design separating UI rendering, socket communication, system monitoring, and serial debugging</li>
          <li>Pinned LVGL rendering to a dedicated core to maintain responsive touch interaction under high update rates</li>
          <li>Used static allocation and bounded queues to avoid heap fragmentation and stack overflow</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">UI and Graphics Pipeline</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Built a dark-themed, modular UI using LVGL 9.4 with XML-based layouts and reusable global styles</li>
          <li>Implemented base64 JPEG decoding into RGB565 buffers for direct rendering with minimal memory overhead</li>
          <li>Added animated progress bars, media transitions, and dynamic widgets optimized for a 480×320 display</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Backend Communication and Protocol</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Designed a bidirectional TCP socket protocol using newline-delimited JSON for robustness and extensibility</li>
          <li>Implemented buffered message queues to batch updates and prevent UI thread blocking</li>
          <li>Added UART fallback for debugging and recovery when Wi-Fi bandwidth was constrained</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">System Monitoring and Media Control</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Displayed live CPU usage, memory utilization, idle percentage, and top processes collected via a Python backend</li>
          <li>Enabled touchscreen control of Spotify and YouTube playback including play, pause, seek, and queue navigation</li>
          <li>Integrated Discord voice metadata including active users, mute state, and profile images</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Engineering Challenges</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Resolved LCD color inversion and rendering artifacts through display calibration and pixel format correction</li>
          <li>Reduced UI latency by throttling snapshot updates and applying differential screen refreshes</li>
          <li>Optimized JPEG decode paths to reuse buffers and minimize dynamic allocation</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Key Engineering Takeaways</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Designed a robust multi-core FreeRTOS architecture with clear task separation</li>
          <li>Implemented efficient graphics pipelines on resource-constrained hardware</li>
          <li>Built a reliable bidirectional communication protocol over Wi-Fi</li>
          <li>Gained experience debugging real-time embedded systems with tight timing constraints</li>
        </ul>
      </section>
    </div>
  );
};

export default ESP32MediaController;
