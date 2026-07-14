import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { DitherShader } from "./ui/dither-shader";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const skylineImage = "/images/torontophoto.jpg";

const Hero = () => {
  const { person, socials } = portfolio;

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="site-container hero-shell">
        <div className="hero-composition">
          <div className="hero-copy">
            <h1 id="hero-title">{person.name}</h1>
            <p className="hero-title">{person.title}</p>
            <div className="hero-two-line">
              <p>
                University of Waterloo Electrical Engineering student building
                low-level software for sensing, control, communication, and edge compute.
              </p>
              <p>
                Interested in firmware, embedded systems, embedded Linux, GPU systems,
                and hardware-software integration.
              </p>
            </div>

            <div className="hero-profile-row">
              <div className="hero-image-frame hero-portrait-frame">
                <img
                  src={person.headshot}
                  alt={person.name}
                  width="280"
                  height="280"
                  className="hero-portrait-photo"
                />
              </div>

              <div className="hero-connect">
                <div className="hero-actions">
                  <a className="button button-primary" href="#projects">
                    View Projects
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a className="button button-secondary" href={person.resumePath}>
                    <FileText size={16} aria-hidden="true" />
                    View Resume
                  </a>
                </div>

                <div className="hero-links" aria-label="External profile links">
                  {socials.map((link) => {
                    const Icon = socialIcons[link.label] || ArrowRight;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      >
                        <Icon size={16} aria-hidden="true" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual-system" aria-label="Toronto skyline">
            <div className="hero-image-frame hero-skyline-frame">
              <DitherShader
                src={skylineImage}
                gridSize={1}
                ditherMode="bayer"
                colorMode="color"
                primaryColor="#2e2a27"
                secondaryColor="#fcfbf8"
                threshold={0.46}
                objectFit="cover"
                className="hero-dither-canvas hero-skyline-canvas"
                ariaLabel="Dithered Toronto skyline with the CN Tower"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
