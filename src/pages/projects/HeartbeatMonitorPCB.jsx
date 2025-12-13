import React from "react";

import { Navbar } from "../../components";
import { styles } from "../../styles";

const HeartbeatMonitorPCB = () => {
  return (
    <div className="relative bg-black/30 min-h-screen">
      <Navbar />

      <section className={`${styles.padding} max-w-4xl mx-auto relative z-0 pt-28`}>
        <h1 className="text-4xl font-bold text-[var(--theme-primary)] mb-6">
          Heartbeat Monitor PCB Design
        </h1>

        <div className="mb-8 flex items-center gap-4">
          <a
            href="https://github.com/JJKSweaty/Heartbeat-Monitor-STM32-Using-Arduino-IDE-"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-300 underline underline-offset-4 hover:text-[var(--theme-primary)]"
          >
            GitHub Repository
          </a>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
        <p className="text-slate-300 leading-relaxed">
          Designed a custom PCB around the MAX30102 for heart rate and oxygen saturation sensing.
          The board interfaces with an STM32 microcontroller via I²C to compute and display live BPM and SpO₂ readings.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Hardware Design</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Designed schematic and PCB layout in KiCad with USB-C power input</li>
          <li>Implemented I²C communication between MAX30102 sensor and microcontroller</li>
          <li>Optimized component placement and decoupling to reduce noise and improve signal quality</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Firmware</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Developed firmware using Arduino IDE targeting STM32</li>
          <li>Computed BPM and SpO₂ values from raw sensor data</li>
          <li>Displayed live readings on an attached display interface</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Key Engineering Takeaways</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Designed a compact, low-noise PCB for biomedical signal acquisition</li>
          <li>Implemented reliable I²C communication with proper pull-ups and decoupling</li>
          <li>Gained experience with sensor integration and analog signal conditioning</li>
        </ul>
      </section>
    </div>
  );
};

export default HeartbeatMonitorPCB;
