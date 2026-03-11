import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VisionGuidedAutonomousDiskLauncher from "./pages/projects/VisionGuidedAutonomousDiskLauncher";
import ESP32MediaController from "./pages/projects/ESP32MediaController";
import HeartbeatMonitorPCB from "./pages/projects/HeartbeatMonitorPCB";
import { ScrollProgress } from "./components";
import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative z-0 min-h-screen bg-[var(--theme-bg)] overflow-x-hidden">
          <ScrollProgress />

          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_2%,rgba(140,160,182,0.12),transparent_35%),radial-gradient(circle_at_82%_20%,rgba(111,128,148,0.09),transparent_42%),linear-gradient(180deg,#070b11_0%,#090d14_52%,#070b11_100%)]" />
            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
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
