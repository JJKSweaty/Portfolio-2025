import {
  Contact,
  Experience,
  Hero,
  Navbar,
  Works,
} from "../components";

const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen relative">
        <Navbar />
        <Hero />
      </div>
      <div className="relative">
        <Experience />
      </div>
      <div className="relative">
        <Works />
      </div>
      <div className="relative">
        <Contact />
      </div>
    </>
  );
};

export default Home;

