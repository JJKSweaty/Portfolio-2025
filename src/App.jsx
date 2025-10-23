import { BrowserRouter } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { About, Contact, Experience, Hero, Navbar, Works } from "./components";
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
          <div className='w-full h-screen relative bg-black/30'>
            <Navbar />
            <Hero />
          </div>
          <div className='relative bg-black/30'>
            <About />
          </div>
          <div className='relative bg-black/30'>
            <Experience />
          </div>
          <div className='relative bg-black/30'>
            <Works />
          </div>
          <div className='relative bg-black/30'>
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
