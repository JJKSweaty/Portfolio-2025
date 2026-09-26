import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import Reveal from "./Reveal";

const Hero = () => {
  const { person } = portfolio;

  return (
    <section className="intro site-container" aria-labelledby="hero-title">
      <Reveal>
        <div className="intro-topline mono-label">
          <span>Electrical Engineering · University of Waterloo</span>
          <span className="intro-location">Waterloo, Canada</span>
        </div>
        <div className="intro-name-row">
          <h1 id="hero-title">Jonathan<br />Jacob Koshy<span className="name-period">.</span></h1>
          <figure className="intro-portrait">
            <img src={person.headshot} alt="Jonathan Jacob Koshy" width="280" height="280" loading="eager" />
            <figcaption className="mono-label">Hello, I’m Jonathan.</figcaption>
          </figure>
        </div>
      </Reveal>
      <Reveal className="intro-bottom" delay={0.12}>
        <p className="intro-statement">Firmware &amp;<br /><span>Embedded Systems</span></p>
        <div className="intro-description">
          <p>I’m an Electrical Engineering student at the University of Waterloo. I build firmware and hardware for wearable sensors, flight controllers, and VR systems.</p>
          <div className="intro-links">
            <a href="#projects">View Projects <ArrowDown size={16} aria-hidden="true" /></a>
            <a href={person.hardwarePortfolioPath} target="_blank" rel="noopener noreferrer">Hardware Portfolio <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href={person.resumePath} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
