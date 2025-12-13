import React from "react";

import { Navbar } from "../../components";
import { styles } from "../../styles";

const VisionGuidedAutonomousDiskLauncher = () => {
  return (
    <div className="relative bg-black/30 min-h-screen">
      <Navbar />

      <section className={`${styles.padding} max-w-4xl mx-auto relative z-0 pt-28`}>
        <h1 className="text-4xl font-bold text-[var(--theme-primary)] mb-6">
          Vision-Guided Autonomous Disk Launcher
        </h1>

        <div className="mb-8">
          <a
            href="https://github.com/JJKSweaty/Autonomous-Disk-Launcher"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-300 underline underline-offset-4 hover:text-[var(--theme-primary)]"
          >
            GitHub Repository
          </a>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
        <p className="text-slate-300 leading-relaxed">
          Built an autonomous vision-guided launcher that detects, tracks, and engages targets using a Raspberry Pi for
          perception and an ESP32-S3 for real-time motion and firing control. The system integrates computer vision,
          closed-loop control, and electromechanical actuation with range validation before firing.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">System Architecture</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Raspberry Pi runs object detection and computes target offsets</li>
          <li>ESP32-S3 receives target offsets over a lightweight serial protocol</li>
          <li>Bounding box offsets are converted to angular setpoints</li>
          <li>Closed-loop pan and tilt control implemented using custom PID logic</li>
          <li>TF-Luna LiDAR validates distance before allowing firing</li>
          <li>Dual brushless DC motors and flywheels handle disk launch</li>
          <li>Firing sequence is gated on valid tracking and distance confirmation</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Control and Actuation</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Pan-tilt motion driven by servo motors</li>
          <li>PID controller reduces angular error and stabilizes tracking</li>
          <li>Flywheel motors spin up before release</li>
          <li>Launch timing is sequenced to ensure consistent disk velocity</li>
          <li>System separates tracking logic from firing logic for safety</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Hardware Components</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Raspberry Pi (perception)</li>
          <li>ESP32-S3 (real-time control)</li>
          <li>Pan-tilt mechanism</li>
          <li>Dual BLDC motors with flywheels</li>
          <li>TF-Luna LiDAR</li>
          <li>3D-printed structural components</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="rounded-2xl border border-[var(--theme-primary)]/20 bg-slate-950 overflow-hidden">
            <img
              src="/images/panTilt.jpeg"
              alt="Pan-tilt mechanism used for target tracking"
              className="w-full h-56 object-cover"
              loading="lazy"
            />
            <figcaption className="p-3 text-sm text-slate-300">Pan-tilt mechanism used for target tracking</figcaption>
          </figure>

          <figure className="rounded-2xl border border-[var(--theme-primary)]/20 bg-slate-950 overflow-hidden">
            <img
              src="/images/flywheel.png"
              alt="Dual flywheel disk launch mechanism"
              className="w-full h-56 object-cover"
              loading="lazy"
            />
            <figcaption className="p-3 text-sm text-slate-300">Dual flywheel disk launch mechanism</figcaption>
          </figure>
        </div>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Demo Video</h2>
        <p className="text-slate-300 mb-4">
          Short demo showing pan-tilt tracking
        </p>
        <video controls playsInline preload="metadata" muted style={{ width: "100%", borderRadius: 12 }}>
          {/* TODO: Confirm the filename/location if you rename this asset */}
          <source src="/demos/autonomous-launcher-demo.mp4" type="video/mp4" />
        </video>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-3">Key Engineering Takeaways</h2>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Designed a multi-processor embedded system with clear responsibility boundaries</li>
          <li>Implemented closed-loop control for real-time electromechanical systems</li>
          <li>Integrated perception, sensing, and actuation with safety-gated logic</li>
          <li>Gained hands-on experience debugging timing, control, and hardware interactions</li>
        </ul>
      </section>
    </div>
  );
};

export default VisionGuidedAutonomousDiskLauncher;
