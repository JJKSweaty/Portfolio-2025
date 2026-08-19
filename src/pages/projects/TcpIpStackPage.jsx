import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, Code2, Cpu, Github, Terminal } from "lucide-react";
import { Navbar } from "../../components";
import { portfolio } from "../../data/portfolio";
import {
  packetLayers,
  roadmap,
  walkthroughs,
} from "../../data/tcpipStack";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const repoUrl = "https://github.com/JJKSweaty/tcpip-stack";

const FlowHero = () => (
  <div className="tcp-hero-visual" aria-label="Live packet flow through the stack">
    <div className="tap-device">
      <span>tap0</span>
      <small>/dev/net/tun</small>
    </div>
    <div className="packet-wire" aria-hidden="true">
      <span className="packet-bit packet-bit-one" />
      <span className="packet-bit packet-bit-two" />
      <span className="packet-bit packet-bit-three" />
    </div>
    <div className="packet-stack">
      {["Ethernet", "ARP", "IPv4", "ICMP", "UDP", "TCP"].map((layer) => (
        <div key={layer} className={`stack-chip stack-chip-${layer.toLowerCase()}`}>
          {layer}
        </div>
      ))}
    </div>
    <div className="frame-readout">
      <span>dst 02:00:00:00:00:02</span>
      <span>ethertype 0x0800</span>
      <span>proto TCP</span>
      <span>flags SYN ACK</span>
    </div>
  </div>
);

const PacketPath = ({ path }) => (
  <div className="tcp-path" aria-label={path.join(" to ")}>
    {path.map((layer, index) => (
      <span key={`${layer}-${index}`}>
        {layer}
        {index < path.length - 1 && <ChevronRight aria-hidden="true" />}
      </span>
    ))}
  </div>
);

const TerminalBlock = ({ command, output }) => (
  <div className="tcp-terminal">
    <div className="tcp-terminal-title">
      <Terminal aria-hidden="true" />
      terminal
    </div>
    <pre>{[command, ...output.slice(1)].join("\n")}</pre>
  </div>
);

const CodePair = ({ walkthrough, activeField, setActiveField }) => (
  <div className="code-pair">
    <div>
      <p>{walkthrough.explanation}</p>
      <div className="field-list">
        {walkthrough.fields.map((field) => (
          <button
            key={field.name}
            className={activeField.name === field.name ? "active" : ""}
            type="button"
            onClick={() => setActiveField(field)}
          >
            <span>{field.name}</span>
            <code>{field.bytes}</code>
          </button>
        ))}
      </div>
      <div className="field-detail">
        <strong>{activeField.name}</strong>
        <p>{activeField.detail}</p>
      </div>
    </div>
    <div className="code-callout">
      <div className="code-callout-title">
        <Code2 aria-hidden="true" />
        {walkthrough.codeRefs.join(" + ")}
      </div>
      <pre>{walkthrough.code}</pre>
    </div>
  </div>
);

const PacketInspector = () => {
  const [activeId, setActiveId] = useState("ethernet");
  const activeLayer = packetLayers.find((layer) => layer.id === activeId) ?? packetLayers[0];

  return (
    <section className="tcp-section" id="packet-inspector">
      <div className="section-copy">
        <p className="eyebrow">Packet inspector</p>
        <h2>Click a layer to see what the C code owns</h2>
      </div>
      <div className="inspector-grid">
        <div className="inspector-layers" role="list">
          {packetLayers.map((layer) => (
            <button
              key={layer.id}
              className={activeLayer.id === layer.id ? "active" : ""}
              type="button"
              onClick={() => setActiveId(layer.id)}
            >
              <span>{layer.name}</span>
              <small>{layer.summary}</small>
            </button>
          ))}
        </div>
        <div className="inspector-detail">
          <Badge variant="secondary">{activeLayer.name}</Badge>
          <h3>{activeLayer.summary}</h3>
          <p>{activeLayer.detail}</p>
          <div className="tag-row">
            {activeLayer.files.map((file) => (
              <Badge key={file} variant="outline">
                {file}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WalkthroughCard = ({ walkthrough }) => {
  const [activeField, setActiveField] = useState(walkthrough.fields[0]);

  return (
    <article className="walkthrough-card">
      <div className="walkthrough-header">
        <div>
          <h3>{walkthrough.title}</h3>
          <PacketPath path={walkthrough.packetPath} />
        </div>
        <div className="code-ref-row">
          {walkthrough.codeRefs.map((file) => (
            <code key={file}>{file}</code>
          ))}
        </div>
      </div>
      <TerminalBlock command={walkthrough.command} output={walkthrough.output} />
      <CodePair
        walkthrough={walkthrough}
        activeField={activeField}
        setActiveField={setActiveField}
      />
    </article>
  );
};

const TcpIpStackPage = () => {
  useEffect(() => {
    document.title = `Userspace TCP/IP Stack - ${portfolio.person.name}`;
  }, []);

  return (
    <div className="app-shell tcp-page">
      <Navbar />
      <main id="main-content">
        <section className="tcp-hero">
          <div className="site-container tcp-hero-grid">
            <div className="tcp-hero-copy">
              <Button asChild variant="ghost" className="back-link">
                <Link to="/#projects">
                  <ArrowLeft aria-hidden="true" />
                  Back to projects
                </Link>
              </Button>
              <p className="eyebrow">Userspace networking in C</p>
              <h1>Building a TCP/IP Stack from Raw Ethernet Frames</h1>
              <p>
                A Linux TAP device feeds raw Ethernet frames into C code that
                parses ARP, IPv4, ICMP, UDP, and TCP without using kernel sockets
                for the stack logic.
              </p>
              <div className="tcp-hero-actions">
                <Button asChild>
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog/tcp-ip-stack">
                    <BookOpen aria-hidden="true" />
                    Open tutorial
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="#packet-inspector">
                    <Cpu aria-hidden="true" />
                    Inspect packets
                  </a>
                </Button>
              </div>
            </div>
            <FlowHero />
          </div>
        </section>

        <section className="tcp-section tcp-overview">
          <div className="site-container overview-grid">
            <div className="section-copy">
              <p className="eyebrow">Packet path</p>
              <h2>TAP to protocol handler</h2>
              <p>
                The project is easiest to read as a dispatch chain. TAP supplies
                frames, Ethernet chooses ARP or IPv4, and IPv4 chooses ICMP, UDP,
                or TCP.
              </p>
            </div>
            <PacketPath path={["TAP", "Ethernet", "ARP or IPv4", "ICMP / UDP / TCP"]} />
          </div>
        </section>

        <div className="site-container">
          <PacketInspector />

          <section className="tcp-section" id="walkthroughs">
            <div className="section-copy">
              <p className="eyebrow">Walkthroughs</p>
              <h2>Command, packet, code</h2>
              <p>
                Each scenario pairs the terminal behavior with packet fields and
                the C files that parse or write them.
              </p>
            </div>
            <div className="walkthrough-list">
              {walkthroughs.map((walkthrough) => (
                <WalkthroughCard key={walkthrough.id} walkthrough={walkthrough} />
              ))}
            </div>
          </section>

          <section className="tcp-section roadmap-section">
            <div className="section-copy">
              <p className="eyebrow">Roadmap</p>
              <h2>What this stack does not claim yet</h2>
              <p>
                These limits keep the page honest and make future work obvious.
              </p>
            </div>
            <div className="roadmap-grid">
              {roadmap.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TcpIpStackPage;
