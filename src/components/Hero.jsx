import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolio } from "../data/portfolio";

const Hero = () => (
  <section className="intro site-container" aria-labelledby="hero-title">
    <div className="intro-copy">
      <p className="intro-field">Firmware &amp; embedded systems</p>
      <h1 id="hero-title">Jonathan<br />Jacob Koshy</h1>
      <p className="intro-bio">I study electrical engineering at the University of Waterloo. I build firmware for wearable sensors, flight controllers, and a VR headset of my own.</p>
      <div className="intro-links">
        <a href={portfolio.person.resumePath} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={15} aria-hidden="true" /></a>
        <a href={portfolio.person.hardwarePortfolioPath} target="_blank" rel="noopener noreferrer">Hardware portfolio <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </div>
    <Link to="/projects/custom-vr-headset" className="intro-project" aria-label="View the jjkVR headset project">
      <figure>
        <img src="/images/headsetphotovr.jpg" alt="Light from the display seen through the twin lenses of my headset prototype" fetchpriority="high" />
        <figcaption><span><strong>jjkVR</strong> <span>Custom VR headset</span></span><ArrowUpRight size={17} aria-hidden="true" /></figcaption>
      </figure>
    </Link>
  </section>
);

export default Hero;
