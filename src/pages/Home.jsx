import React from "react";

import { About, Contact, Experience, Hero, Navbar, Works } from "../components";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen relative bg-black/30">
        <Navbar />
        <Hero />
      </div>
      <div className="relative bg-black/30">
        <About />
      </div>
      <div className="relative bg-black/30">
        <Experience />
      </div>
      <div className="relative bg-black/30">
        <Works />
      </div>
      <div className="relative bg-black/30">
        <Contact />
      </div>
    </>
  );
};

export default Home;
