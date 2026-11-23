import { useEffect } from "react";
import { Contact, Experience, Hero, Navbar, Works } from "../components";

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
        <Experience teams />
      </main>
      <Contact />
    </div>
  );
};

export default Home;
