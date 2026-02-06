import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Works,
} from "../components";

const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen relative bg-black/30">
        <Navbar />
        <Hero />
      </div>
      <div className="relative bg-black/30">
        <About />
      </div>
      <div className="relative bg-black/25">
        <Experience />
      </div>
      <div className="relative bg-black/30">
        <Works />
      </div>
      <div className="relative bg-black/20">
        <Contact />
      </div>
    </>
  );
};

export default Home;

