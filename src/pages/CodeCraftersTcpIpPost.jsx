import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Github,
  Play,
  Terminal,
} from "lucide-react";
import { Navbar } from "../components";
import { portfolio } from "../data/portfolio";
import {
  agentQuestions,
  articleCodeExamples,
  packetLayers,
  retransmissionSteps,
  roadmap,
  setupSteps,
  sourceSections,
  tcpipFacts,
  tcpStateSteps,
  walkthroughs,
} from "../data/tcpipStack";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const isIPv4 = (value) =>
  /^(\d{1,3}\.){3}\d{1,3}$/.test(value) &&
  value.split(".").every((part) => Number(part) <= 255);

const hexIp = (value) =>
  value
    .split(".")
    .map((part) => Number(part).toString(16).padStart(2, "0"))
    .join(" ");

const scenarios = {
  ping: {
    label: "ICMP ping",
    command: (target) => `ping -c 3 ${target}`,
    path: ["TAP", "Ethernet", "ARP", "IPv4", "ICMP"],
    logs: (target) => [
      `EtherType: 0x0806`,
      target === tcpipFacts.stackIp
        ? `ARP target ${target}: valid request for us`
        : `ARP target ${target}: ignored, stack owns ${tcpipFacts.stackIp}`,
      target === tcpipFacts.stackIp && "Sent ARP reply",
      target === tcpipFacts.stackIp && "Protocol: 1 (ICMP)",
      target === tcpipFacts.stackIp && "ICMP type: 8 -> 0",
      target === tcpipFacts.stackIp && "Sent ICMP echo reply",
    ],
    fields: (target) => [
      ["EtherType", "08 06 then 08 00", "ARP resolves the MAC before IPv4 carries ICMP."],
      ["Target IP", isIPv4(target) ? hexIp(target) : "--", "ARP only succeeds when this is the stack IP."],
      ["ICMP type", target === tcpipFacts.stackIp ? "08 -> 00" : "--", "Echo request becomes echo reply."],
    ],
  },
  udp: {
    label: "UDP echo",
    command: (target, port) => `printf 'hello udp\\n' | nc -u -w 1 ${target} ${port}`,
    path: ["TAP", "Ethernet", "ARP", "IPv4", "UDP"],
    logs: (target, port) => [
      `EtherType: 0x0806`,
      target === tcpipFacts.stackIp
        ? `Protocol: 17 (UDP), dport=${port}`
        : `ARP target ${target}: ignored, stack owns ${tcpipFacts.stackIp}`,
      target === tcpipFacts.stackIp && "UDP payload: hello udp\\n",
      target === tcpipFacts.stackIp && "Sent UDP echo reply: 10 bytes",
    ],
    fields: (_target, port) => [
      ["Protocol", "11", "IPv4 protocol 17 selects UDP."],
      ["Destination port", Number(port).toString(16).padStart(4, "0"), "The UDP handler reads this from the header."],
      ["State", "none", "UDP sends one datagram. No handshake, no retry queue."],
    ],
  },
  tcp: {
    label: "TCP payload",
    command: (target, port) => `printf 'hello tcp\\n' | nc -w 2 ${target} ${port}`,
    path: ["TAP", "Ethernet", "ARP", "IPv4", "TCP", "RTO"],
    logs: (target, port) => [
      `EtherType: 0x0806`,
      target === tcpipFacts.stackIp
        ? `TCP SYN ${tcpipFacts.hostIp}:client -> ${target}:${port}`
        : `ARP target ${target}: ignored, stack owns ${tcpipFacts.stackIp}`,
      target === tcpipFacts.stackIp && "Sent TCP SYN-ACK, state=SYN_RECEIVED",
      target === tcpipFacts.stackIp && "TCP pure ACK received, state=ESTABLISHED",
      target === tcpipFacts.stackIp && "TCP payload: hello tcp\\n",
      target === tcpipFacts.stackIp && `Sent TCP payload: ${tcpipFacts.response}`,
      target === tcpipFacts.stackIp && "Retransmission queued until ACK covers seq_end",
    ],
    fields: (target) => [
      ["Protocol", "06", "IPv4 protocol 6 selects TCP."],
      ["Flags", target === tcpipFacts.stackIp ? "02, 12, 10, 18" : "--", "SYN, SYN-ACK, ACK, then PSH/ACK for payload."],
      ["Sequence state", target === tcpipFacts.stackIp ? "tracked" : "none", "TCP stores SND.UNA, SND.NXT, and RCV.NXT."],
    ],
  },
};

const PacketPath = ({ path, className = "" }) => (
  <div className={`craft-path ${className}`} aria-label={path.join(" to ")}>
    {path.map((layer) => (
      <span key={layer}>{layer}</span>
    ))}
  </div>
);

const TerminalDemo = () => {
  const [target, setTarget] = useState(tcpipFacts.stackIp);
  const [port, setPort] = useState(1337);
  const [protocol, setProtocol] = useState("tcp");
  const scenario = scenarios[protocol];
  const demoPort = Math.min(65535, Math.max(1, Number(port) || 1337));
  const valid = isIPv4(target);
  const logs = valid ? scenario.logs(target, demoPort).filter(Boolean) : ["invalid IPv4 address"];

  return (
    <div className="craft-demo">
      <div className="craft-controls">
        <label>
          Target IP
          <input value={target} onChange={(event) => setTarget(event.target.value)} />
        </label>
        <label>
          Port
          <input
            min="1"
            max="65535"
            type="number"
            value={port}
            onChange={(event) => setPort(event.target.value)}
          />
        </label>
        <label>
          Traffic
          <select value={protocol} onChange={(event) => setProtocol(event.target.value)}>
            {Object.entries(scenarios).map(([id, item]) => (
              <option key={id} value={id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <PacketPath path={scenario.path} />

      <div className="craft-terminal">
        <div>
          <Terminal aria-hidden="true" />
          terminal model
        </div>
        <pre>{`$ ${valid ? scenario.command(target, demoPort) : scenario.command(tcpipFacts.stackIp, demoPort)}
${logs.join("\n")}`}</pre>
      </div>

      <div className="craft-field-grid">
        {(valid ? scenario.fields(target, demoPort) : [["Target IP", target, "Enter a valid IPv4 address."]]).map(
          ([name, bytes, detail]) => (
            <div key={name}>
              <code>{bytes}</code>
              <strong>{name}</strong>
              <p>{detail}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const CodeBlock = ({ example }) => (
  <figure className="craft-code">
    <figcaption>
      <span>{example.title}</span>
      <code>{example.file}</code>
    </figcaption>
    <pre>{example.code}</pre>
  </figure>
);

const SourceSection = ({ section }) => (
  <article className="craft-source-card" id={section.id}>
    <div className="craft-source-copy">
      <div className="tag-row">
        {section.files.map((file) => (
          <Badge key={file} variant="outline">
            {file}
          </Badge>
        ))}
      </div>
      <h3>{section.title}</h3>
      <p>{section.summary}</p>
      <ul>
        {section.bullets.map((item) => (
          <li key={item}>
            <CheckCircle2 aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
    <CodeBlock example={{ title: section.title, file: section.files.join(" + "), code: section.code }} />
  </article>
);

const LayerInspector = () => {
  const [activeId, setActiveId] = useState(packetLayers[0].id);
  const active = packetLayers.find((layer) => layer.id === activeId) || packetLayers[0];

  return (
    <div className="craft-layer-grid">
      <div className="craft-layer-list" role="list">
        {packetLayers.map((layer) => (
          <button
            key={layer.id}
            className={active.id === layer.id ? "active" : ""}
            type="button"
            onClick={() => setActiveId(layer.id)}
          >
            <span>{layer.name}</span>
            <small>{layer.summary}</small>
          </button>
        ))}
      </div>
      <div className="craft-layer-detail">
        <Badge variant="secondary">{active.name}</Badge>
        <h3>{active.summary}</h3>
        <p>{active.detail}</p>
        <div className="tag-row">
          {active.files.map((file) => (
            <Badge key={file} variant="outline">
              {file}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const StateMachine = () => (
  <div className="craft-state-flow">
    {tcpStateSteps.map((step, index) => (
      <div key={`${step.state}-${index}`}>
        <code>{step.state}</code>
        <strong>{step.event}</strong>
        <p>{step.detail}</p>
      </div>
    ))}
  </div>
);

const RetransmissionFlow = () => (
  <div className="craft-retx-flow">
    {retransmissionSteps.map((step, index) => (
      <div key={step.label}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{step.label}</strong>
        <p>{step.detail}</p>
      </div>
    ))}
  </div>
);

const Walkthrough = ({ item }) => {
  const [field, setField] = useState(item.fields[0]);

  return (
    <article className="craft-walkthrough">
      <div className="craft-walkthrough-head">
        <div>
          <h3>{item.title}</h3>
          <p>{item.explanation}</p>
          <PacketPath path={item.packetPath} />
        </div>
        <div className="tag-row">
          {item.codeRefs.map((ref) => (
            <Badge key={ref} variant="outline">
              {ref}
            </Badge>
          ))}
        </div>
      </div>
      <div className="craft-terminal">
        <div>
          <Terminal aria-hidden="true" />
          expected log
        </div>
        <pre>{item.output.join("\n")}</pre>
      </div>
      <div className="craft-field-code">
        <div className="craft-field-tabs">
          {item.fields.map((candidate) => (
            <button
              key={candidate.name}
              className={field.name === candidate.name ? "active" : ""}
              type="button"
              onClick={() => setField(candidate)}
            >
              <span>{candidate.name}</span>
              <code>{candidate.bytes}</code>
            </button>
          ))}
        </div>
        <div className="craft-field-detail">
          <strong>{field.name}</strong>
          <p>{field.detail}</p>
        </div>
        <CodeBlock example={{ title: item.title, file: item.codeRefs.join(" + "), code: item.code }} />
      </div>
    </article>
  );
};

const CodeCraftersTcpIpPost = () => {
  useEffect(() => {
    document.title = `CodeCrafters TCP/IP Stack Guide - ${portfolio.person.name}`;
  }, []);

  const keyFiles = useMemo(
    () => [...new Set(sourceSections.flatMap((section) => section.files))],
    []
  );

  return (
    <div className="app-shell craft-page">
      <Navbar />
      <main>
        <article className="craft-article">
          <header className="craft-hero">
            <Button asChild variant="ghost" className="back-link">
              <Link to="/#projects">
                <ArrowLeft aria-hidden="true" />
                Back to portfolio
              </Link>
            </Button>
            <p className="eyebrow">CodeCrafters tutorial</p>
            <h1>Build a TCP/IP stack from raw Ethernet frames</h1>
            <p>
              A source-grounded guide to the C userspace stack: TAP setup,
              Ethernet dispatch, ARP, IPv4, ICMP ping, UDP echo, TCP state, and
              one-segment retransmission.
            </p>
            <div className="craft-actions">
              <Button asChild>
                <a href={tcpipFacts.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" />
                  Source code
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#playground">
                  <Play aria-hidden="true" />
                  Try packet demo
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#source-walkthrough">
                  <BookOpen aria-hidden="true" />
                  Read code path
                </a>
              </Button>
            </div>
          </header>

          <section className="craft-section craft-intro">
            <h2>The whole project in one path</h2>
            <p>
              Linux sends frames through <code>{tcpipFacts.tapDevice}</code>.
              The C program parses those bytes directly instead of using kernel
              TCP or UDP sockets for the stack behavior.
            </p>
            <PacketPath
              className="craft-path-large"
              path={["TAP", "Ethernet", "ARP or IPv4", "ICMP / UDP / TCP"]}
            />
            <div className="craft-facts">
              <span>Stack IP: {tcpipFacts.stackIp}</span>
              <span>Host IP: {tcpipFacts.hostIp}</span>
              <span>Stack MAC: {tcpipFacts.stackMac}</span>
            </div>
          </section>

          <section className="craft-section">
            <h2>Run it locally</h2>
            <p>
              These commands exercise real Linux traffic against the userspace C
              stack.
            </p>
            <div className="craft-steps">
              {setupSteps.map((step, index) => (
                <section key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <pre>{step.command}</pre>
                </section>
              ))}
            </div>
          </section>

          <section className="craft-section" id="playground">
            <h2>Interactive packet demo</h2>
            <p>
              Change the target IP or protocol and watch where the packet path
              stops. The stack answers only <code>{tcpipFacts.stackIp}</code>.
            </p>
            <TerminalDemo />
          </section>

          <section className="craft-section">
            <h2>Layer inspector</h2>
            <p>
              Each protocol layer has one job. Click through the stack to see
              which source files own each decision.
            </p>
            <LayerInspector />
          </section>

          <section className="craft-section" id="source-walkthrough">
            <h2>Source walkthrough</h2>
            <p>
              The implementation is intentionally readable: one packet path,
              small protocol handlers, and explicit state where TCP needs it.
            </p>
            <div className="craft-source-list">
              {sourceSections.map((section) => (
                <SourceSection key={section.id} section={section} />
              ))}
            </div>
          </section>

          <section className="craft-section">
            <h2>TCP state machine</h2>
            <p>
              The current stack supports one connection. That keeps the state
              visible enough for a learning project.
            </p>
            <StateMachine />
          </section>

          <section className="craft-section">
            <h2>Retransmission model</h2>
            <p>
              The RTO logic is deliberately narrow: one saved segment and a
              timer. That is enough to teach ACK coverage, timeout, backoff, and
              Karn&apos;s rule without hiding the mechanics.
            </p>
            <RetransmissionFlow />
          </section>

          <section className="craft-section">
            <h2>Command, packet, code walkthroughs</h2>
            <p>
              These are the demos a reader can reproduce while watching the
              stack logs.
            </p>
            <div className="craft-walkthrough-list">
              {walkthroughs.map((item) => (
                <Walkthrough key={item.id} item={item} />
              ))}
            </div>
          </section>

          <section className="craft-section">
            <h2>Core snippets to read first</h2>
            <div className="craft-code-grid">
              {articleCodeExamples.map((example) => (
                <CodeBlock key={example.title} example={example} />
              ))}
            </div>
          </section>

          <section className="craft-section">
            <h2>Files this guide is built from</h2>
            <p>
              Future updates should start in <code>src/data/tcpipStack.js</code>
              so the portfolio overview, blog, and agent prompts stay aligned.
            </p>
            <div className="tag-row">
              {keyFiles.map((file) => (
                <Badge key={file} variant="outline">
                  {file}
                </Badge>
              ))}
            </div>
          </section>

          <section className="craft-section">
            <h2>Current limits</h2>
            <p>
              This is an educational stack, not production networking. The
              limits are part of the tutorial.
            </p>
            <div className="craft-limits">
              {roadmap.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          <section className="craft-section">
            <h2>Questions the portfolio agent can answer</h2>
            <div className="craft-agent-list">
              {agentQuestions.map((item) => (
                <div key={item.question}>
                  <strong>{item.question}</strong>
                  <p>{item.answer}</p>
                  <div className="tag-row">
                    {item.refs.map((ref) => (
                      <Badge key={ref} variant="outline">
                        {ref}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="craft-footer">
            <Button asChild variant="outline">
              <Link to="/#projects">
                <ArrowLeft aria-hidden="true" />
                Back to portfolio
              </Link>
            </Button>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default CodeCraftersTcpIpPost;
