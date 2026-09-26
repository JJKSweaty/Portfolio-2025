import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const Blog = () => (
  <section id="blog" className="portfolio-section site-container writing-section" aria-labelledby="blog-title">
    <Reveal className="section-rule">
      <p className="mono-label section-index">04 / Writing</p>
      <h2 id="blog-title">Notes from figuring it out.</h2>
    </Reveal>
    <Link to="/blog/tcp-ip-stack" className="writing-link">
      <span className="mono-label writing-kind">Interactive guide<br />C · Networking</span>
      <div><h3>Building a TCP/IP stack from scratch</h3><p>From raw Ethernet frames to TCP state, with packet diagrams, terminal demos, and the C behind it.</p></div>
      <ArrowUpRight size={26} aria-hidden="true" />
    </Link>
  </section>
);

export default Blog;
