import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Home from "./pages/Home";
import VisionGuidedAutonomousDiskLauncher from "./pages/projects/VisionGuidedAutonomousDiskLauncher";
import ESP32MediaController from "./pages/projects/ESP32MediaController";
import HeartbeatMonitorPCB from "./pages/projects/HeartbeatMonitorPCB";
import { Stars } from "./components/canvas/Stars";
import { ScrollProgress } from "./components";
import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative z-0 min-h-screen bg-[#070809] overflow-hidden">
          <ScrollProgress />

          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(148,163,184,0.08),transparent_38%),radial-gradient(circle_at_50%_95%,rgba(99,102,120,0.08),transparent_42%),linear-gradient(180deg,#070809_0%,#090a0c_50%,#070809_100%)]" />
            <div className="absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]" />
          </div>

          <div className="fixed inset-0 z-0 opacity-60">
            <Canvas
              camera={{
                position: [0, 0, 1000],
                fov: 75,
                near: 0.1,
                far: 2000,
              }}
            >
              <Stars />
            </Canvas>
          </div>

          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/projects/vision-guided-autonomous-disk-launcher"
                element={<VisionGuidedAutonomousDiskLauncher />}
              />
              <Route
                path="/projects/esp32-media-controller"
                element={<ESP32MediaController />}
              />
              <Route
                path="/projects/heartbeat-monitor-pcb"
                element={<HeartbeatMonitorPCB />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
