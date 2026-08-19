import { useEffect } from "react";
import { Blog, Contact, Experience, Hero, Navbar, Works } from "../components";

const Home = () => {
  useEffect(() => {
    document.title = "Jonathan Jacob Koshy - Firmware & Embedded Systems Engineer";
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Experience />
        <Works />
        <Blog />
        <Contact />
      </main>
    </div>
  );
};

export default Home;
