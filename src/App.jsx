import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Home from "./pages/Home";
import VisionGuidedAutonomousDiskLauncher from "./pages/projects/VisionGuidedAutonomousDiskLauncher";
import ESP32MediaController from "./pages/projects/ESP32MediaController";
import HeartbeatMonitorPCB from "./pages/projects/HeartbeatMonitorPCB";
import { Stars } from "./components/canvas/Stars";
import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <div className='relative z-0 bg-black overflow-hidden'>
        <div className='fixed inset-0 z-0'>
          <Canvas
            camera={{
              position: [0, 0, 1000],
              fov: 75,
              near: 0.1,
              far: 2000
            }}
          >
            <Stars />
          </Canvas>
        </div>
        <div className='relative z-10'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/projects/vision-guided-autonomous-disk-launcher'
              element={<VisionGuidedAutonomousDiskLauncher />}
            />
            <Route
              path='/projects/esp32-media-controller'
              element={<ESP32MediaController />}
            />
            <Route
              path='/projects/heartbeat-monitor-pcb'
              element={<HeartbeatMonitorPCB />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
