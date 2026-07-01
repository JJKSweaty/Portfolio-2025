import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Github } from "lucide-react";
import { getProjectBySlug } from "../data/portfolio";
import { Button } from "@/components/ui/button";

const tcpProject = getProjectBySlug("userspace-tcp-ip-stack");

const Blog = () => {
  if (!tcpProject) return null;

  const github = tcpProject.links.find((link) => link.label === "GitHub");

  return (
    <section id="blog" className="section-block blog-section" aria-labelledby="blog-title">
      <div className="site-container">
        <div className="section-heading blog-heading">
          <div>
            <p className="eyebrow">Blog</p>
            <h2 id="blog-title">Networking notes built from real code</h2>
            <p>
              A portfolio-hosted tutorial you can submit anywhere that accepts external learning resources.
            </p>
          </div>
        </div>

        <article className="blog-feature">
          <div className="blog-feature-copy">
            <BookOpen aria-hidden="true" />
            <p className="project-story-label">Interactive tutorial</p>
            <h3>{tcpProject.title}</h3>
            <p>
              Walk through TAP, Ethernet, ARP, IPv4, ICMP, UDP, TCP state, and
              retransmission with packet diagrams, terminal demos, and C snippets.
            </p>
            <div className="blog-feature-actions">
              <Button asChild>
                <Link to="/blog/tcp-ip-stack">
                  Read guide
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              {github && (
                <Button asChild variant="outline">
                  <a href={github.href} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden="true" />
                    Source
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div className="blog-feature-media">
            <img src={tcpProject.image.src} alt={tcpProject.image.alt} loading="lazy" />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Blog;
