import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Hero, Navbar, Tech, Works} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-gradient-to-b from-[#020617] via-[#03142b] to-[#04203e]

y overflow-hidden bg-center bg-no-repeat bg-blend'>
        <div className='w-full h-screen relative bg-gradient-to-b from-[#050a1a] via-[#081e3a] to-[#0c3058]
'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className='relative z-0'>
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
