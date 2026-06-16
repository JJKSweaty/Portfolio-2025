import { useEffect } from "react";
import { Contact, Experience, Hero, Navbar, Works } from "../components";

const Home = () => {
  useEffect(() => {
    document.title = "Jonathan Koshy - Firmware & Embedded Systems Engineer";
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Works />
        <Contact />
      </main>
    </div>
  );
};

export default Home;
