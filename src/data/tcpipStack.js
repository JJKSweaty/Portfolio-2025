export const tcpipFacts = {
  repoUrl: "https://github.com/JJKSweaty/tcpip-stack",
  localRepo: "C:/Users/johnk/OneDrive/Desktop/tcpip-stack",
  tapDevice: "tap0",
  stackIp: "10.0.0.2",
  hostIp: "10.0.0.1",
  stackMac: "02:00:00:00:00:02",
  response: "stack received",
};

export const packetLayers = [
  {
    id: "tap",
    name: "TAP",
    summary: "Linux gives the C program complete Ethernet frames.",
    detail:
      "src/tap.c opens /dev/net/tun with IFF_TAP and IFF_NO_PI, so reads return raw layer-2 frames without an extra packet-info header.",
    files: ["src/tap.c", "src/main.c"],
  },
  {
    id: "ethernet",
    name: "Ethernet",
    summary: "The outer dispatcher reads MAC addresses and EtherType.",
    detail:
      "src/ethernet.c rejects short frames, prints destination/source MACs, and dispatches 0x0806 to ARP or 0x0800 to IPv4.",
    files: ["src/ethernet.c", "include/ethernet.h"],
  },
  {
    id: "arp",
    name: "ARP",
    summary: "The stack proves that 10.0.0.2 lives at its fake MAC.",
    detail:
      "src/arp.c accepts only Ethernet/IPv4 ARP requests for the stack IP, then writes an ARP reply with 02:00:00:00:00:02.",
    files: ["src/arp.c", "include/arp.h"],
  },
  {
    id: "ipv4",
    name: "IPv4",
    summary: "The IP parser validates header shape before protocol dispatch.",
    detail:
      "src/ipv4.c checks version, IHL, total length, and truncation before routing protocol 1, 6, or 17 to ICMP, TCP, or UDP.",
    files: ["src/ipv4.c", "include/ipv4.h"],
  },
  {
    id: "icmp",
    name: "ICMP",
    summary: "Ping works by mutating an echo request into an echo reply.",
    detail:
      "src/icmp.c swaps Ethernet/IP endpoints, changes type 8 to type 0, and recalculates IPv4 and ICMP checksums.",
    files: ["src/icmp.c", "src/checksum.c"],
  },
  {
    id: "udp",
    name: "UDP",
    summary: "UDP is a stateless echo path.",
    detail:
      "src/udp.c validates length, prints payload bytes, swaps ports, builds a UDP pseudo-header checksum, and echoes the payload.",
    files: ["src/udp.c", "src/checksum.c"],
  },
  {
    id: "tcp",
    name: "TCP",
    summary: "TCP adds connection state, ACK advancement, close, and retry.",
    detail:
      "src/tcp.c owns the one-connection TCB, SYN/SYN-ACK/ACK, payload response, FIN/FIN-ACK, one-segment retransmission queue, RTO backoff, and Karn's rule.",
    files: ["src/tcp.c", "include/tcp.h"],
  },
];

export const sourceSections = [
  {
    id: "event-loop",
    title: "1. The event loop: one fd, two jobs",
    files: ["src/main.c", "include/config.h"],
    summary:
      "The program creates tap0, stores the stack IP, then uses select() with a 100 ms timeout. If a frame arrives, it parses it. If no frame arrives, TCP still gets a chance to expire retransmission timers.",
    bullets: [
      "BUFLEN is 1600, enough for ordinary Ethernet frames in this learning stack.",
      "TAP reads go through handle_frame(), so every protocol starts from Ethernet.",
      "tcp_retransmit_check() runs even when no new packet arrives.",
    ],
    code: `timeout.tv_usec = TCP_TIMER_TICK_MS * 1000;
ready = select(tap_fd + 1, &readfds, NULL, NULL, &timeout);

if (ready > 0 && FD_ISSET(tap_fd, &readfds)) {
  nread = read(tap_fd, buf, sizeof(buf));
  handle_frame(tap_fd, buf, nread);
}

tcp_retransmit_check(tap_fd);`,
  },
  {
    id: "tap",
    title: "2. TAP setup: layer 2, not layer 3",
    files: ["src/tap.c"],
    summary:
      "The stack uses TAP instead of TUN because it wants to teach Ethernet too. Linux gives the program full frames including destination MAC, source MAC, and EtherType.",
    bullets: [
      "IFF_TAP means layer-2 frames.",
      "IFF_NO_PI removes the extra Linux packet-info prefix.",
      "The device name is fixed to tap0 for predictable demo commands.",
    ],
    code: `fd = open("/dev/net/tun", O_RDWR);
ifr.ifr_flags = IFF_TAP | IFF_NO_PI;
strncpy(ifr.ifr_name, dev, IFNAMSIZ - 1);
ioctl(fd, TUNSETIFF, &ifr);`,
  },
  {
    id: "ethernet",
    title: "3. Ethernet: the first branch",
    files: ["src/ethernet.c", "include/ethernet.h"],
    summary:
      "Ethernet does not understand ping, UDP, or TCP. It only decides whether the payload is ARP or IPv4, then hands the same buffer to the next parser.",
    bullets: [
      "ETH_P_ARP is 0x0806.",
      "ETH_P_IP is 0x0800.",
      "Short frames are rejected before reading header fields.",
    ],
    code: `eth = (struct eth_hdr *)buf;
ethertype = ntohs(eth->ethertype);

if (ethertype == ETH_P_ARP) {
  handle_arp(tap_fd, buf, nread);
} else if (ethertype == ETH_P_IP) {
  handle_ipv4(tap_fd, buf, nread);
}`,
  },
  {
    id: "arp",
    title: "4. ARP: answering who-has 10.0.0.2",
    files: ["src/arp.c", "include/arp.h"],
    summary:
      "Before any IP traffic can work, Linux needs an Ethernet destination MAC. The stack answers only valid ARP requests for its configured IPv4 address.",
    bullets: [
      "The request must be Ethernet plus IPv4.",
      "The opcode must be ARP request.",
      "The target IP must equal stack_ip.",
    ],
    code: `if (hwtype != ARP_HTYPE_ETHERNET) return false;
if (protype != ARP_PTYPE_IPV4) return false;
if (opcode != ARP_REQUEST) return false;
if (arp_data->dip != stack_ip) return false;

send_arp_reply(tap_fd, eth, arp_data);`,
  },
  {
    id: "ipv4",
    title: "5. IPv4: validate, then dispatch",
    files: ["src/ipv4.c", "include/ipv4.h"],
    summary:
      "The IPv4 parser checks that the header is actually IPv4, that IHL is sane, and that the captured frame contains the declared total length.",
    bullets: [
      "Protocol 1 routes to ICMP.",
      "Protocol 6 routes to TCP.",
      "Protocol 17 routes to UDP.",
    ],
    code: `version = ip->version_ihl >> 4;
ihl = ip->version_ihl & 0x0f;
ip_header_len = ihl * 4;

if (ip->proto == IP_PROTO_ICMP) handle_icmp(...);
else if (ip->proto == IP_PROTO_TCP) handle_tcp(...);
else if (ip->proto == IP_PROTO_UDP) handle_udp(...);`,
  },
  {
    id: "icmp",
    title: "6. ICMP: ping is a small packet rewrite",
    files: ["src/icmp.c", "src/checksum.c"],
    summary:
      "For ping, the stack can reuse the received frame buffer. It swaps endpoints, changes the ICMP type, clears old checksums, and writes new ones.",
    bullets: [
      "Echo request type is 8.",
      "Echo reply type is 0.",
      "Changing any header byte means recalculating the checksum.",
    ],
    code: `memcpy(eth->dmac, eth->smac, 6);
memcpy(eth->smac, stack_mac, 6);

ip->saddr = stack_ip;
ip->daddr = original_src_ip;
icmp->type = ICMP_ECHO_REPLY;

ip->checksum = checksum(ip, ip_header_len);
icmp->checksum = checksum(icmp, icmp_len);`,
  },
  {
    id: "udp",
    title: "7. UDP: datagram in, same bytes out",
    files: ["src/udp.c", "src/checksum.c"],
    summary:
      "UDP has no connection state here. The handler reads ports and length, prints the payload, swaps endpoints, and echoes the payload when the packet is for the stack IP.",
    bullets: [
      "Empty UDP datagrams are accepted but do not trigger an echo reply.",
      "The UDP checksum uses a pseudo-header with IPv4 source, destination, protocol, and UDP length.",
      "There is no retry queue because UDP does not promise delivery.",
    ],
    code: `udp_payload_len = udp_len - sizeof(struct udp_hdr);

if (ip->daddr != stack_ip) return;
if (udp_payload_len == 0) return;

udp->sport = udp->dport;
udp->dport = original_sport;
udp->checksum = udp_checksum(ip, udp, udp_len);`,
  },
  {
    id: "tcp",
    title: "8. TCP: the first real state machine",
    files: ["src/tcp.c", "include/tcp.h"],
    summary:
      "TCP is where the project stops being a packet mirror. The stack tracks one connection, advances receive and send sequence numbers, replies with a hardcoded payload, and closes with FIN/FIN-ACK.",
    bullets: [
      "Incoming SYN creates SYN_RECEIVED and sends SYN-ACK.",
      "A pure ACK moves the connection to ESTABLISHED.",
      "Payload triggers an ACK plus the response payload: stack received.",
    ],
    code: `if ((tcp->flags & TCP_SYN) && !(tcp->flags & TCP_ACK)) {
  send_tcp_syn_ack(tap_fd, eth, ip, tcp, ip_header_len);
} else if (tcp_payload_len > 0 || (tcp->flags & TCP_FIN)) {
  send_tcp_payload(tap_fd, eth, ip, tcp, ip_header_len,
                   seq_advance, TCP_RESPONSE, strlen(TCP_RESPONSE));
} else if ((tcp->flags & TCP_ACK) && tcp_payload_len == 0) {
  tcp_retransmit_on_ack(ntohl(tcp->ack));
}`,
  },
  {
    id: "retransmission",
    title: "9. Retransmission: one queued segment",
    files: ["src/tcp.c", "include/tcp.h"],
    summary:
      "The current TCP retry model is intentionally small: queue one outbound payload segment, retransmit it when RTO expires, double the RTO on timeout, and clear the queue when the ACK covers the segment.",
    bullets: [
      "Initial RTO is 1000 ms.",
      "RTO caps at 60000 ms.",
      "Karn's rule skips RTT samples for retransmitted segments.",
    ],
    code: `if (ack >= tcp_retx.seq_end) {
  if (!tcp_retx.retransmitted) {
    tcp_rto_update(now_ms() - tcp_retx.sent_ms);
  } else {
    printf("Karn: skipped RTT sample");
  }

  tcp_retx.active = false;
}`,
  },
];

export const guideChapters = [
  {
    id: "overview",
    nav: "Overview",
    title: "The stack in one packet path",
    summary:
      "Start here for the mental model: Linux writes raw Ethernet frames to tap0, then the C program chooses ARP or IPv4 and finally ICMP, UDP, or TCP.",
    points: [
      "TAP is used instead of TUN so the guide can show Ethernet headers, not just IP packets.",
      "The stack answers only 10.0.0.2, which keeps every demo packet easy to reason about.",
      "The interactive model below mirrors the source dispatch path without needing root access in the browser.",
    ],
    sourceIds: ["event-loop"],
    walkthroughIds: [],
  },
  {
    id: "setup-tap",
    nav: "Setup/TAP",
    title: "Run Linux traffic through tap0",
    summary:
      "This chapter covers the local workflow, the TAP allocation, and the select() loop that keeps packet input and TCP timers moving.",
    points: [
      "The stack creates tap0 with IFF_TAP and IFF_NO_PI, so reads return raw layer-2 frames.",
      "Normal tools like ping and nc generate real traffic through the virtual device.",
      "select() uses a short timeout so retransmission checks still run when no new frame arrives.",
    ],
    sourceIds: ["event-loop", "tap"],
    walkthroughIds: [],
  },
  {
    id: "ethernet-arp",
    nav: "Ethernet/ARP",
    title: "Resolve a MAC before IP traffic works",
    summary:
      "Ethernet is the first branch. ARP is the first protocol that makes the demos possible because Linux needs a destination MAC for 10.0.0.2.",
    points: [
      "EtherType 0x0806 routes to ARP; 0x0800 routes to IPv4.",
      "ARP replies are sent only for Ethernet/IPv4 requests targeting the stack IP.",
      "The fake stack MAC is stable, so packet traces stay predictable.",
    ],
    sourceIds: ["ethernet", "arp"],
    walkthroughIds: ["arp"],
  },
  {
    id: "ipv4-icmp-udp",
    nav: "IPv4/ICMP/UDP",
    title: "Validate IPv4 before simple protocol handlers",
    summary:
      "IPv4 validates the header shape, total length, and truncation before dispatching ping and UDP echo traffic.",
    points: [
      "IPv4 protocol 1 selects ICMP, 17 selects UDP, and unsupported protocols are only logged.",
      "ICMP ping is a controlled packet rewrite: swap endpoints, change type 8 to type 0, recompute checksums.",
      "UDP stays stateless: validate length, swap ports, checksum, echo the payload.",
    ],
    sourceIds: ["ipv4", "icmp", "udp"],
    walkthroughIds: ["icmp", "udp"],
  },
  {
    id: "tcp-state",
    nav: "TCP State",
    title: "Track enough state to answer one TCP client",
    summary:
      "TCP is where the project stops mirroring packets and starts tracking connection state, sequence numbers, acknowledgments, and close behavior.",
    points: [
      "A SYN creates SYN_RECEIVED, stores peer/local ports, and sends SYN-ACK.",
      "A pure ACK covering SND.NXT moves the connection to ESTABLISHED.",
      "Payload advances RCV.NXT, sends the hardcoded response, and queues that segment for ACK tracking.",
    ],
    sourceIds: ["tcp"],
    walkthroughIds: ["tcp-handshake", "tcp-payload"],
  },
  {
    id: "retransmission-limits",
    nav: "RTO/Limits",
    title: "Retransmit one saved TCP segment",
    summary:
      "The retransmission model is intentionally small: one queued payload segment, one timeout, exponential backoff, ACK clearing, and Karn's rule.",
    points: [
      "The queue stores the outbound frame plus seq_start and seq_end.",
      "Timeout writes the saved frame again and doubles RTO up to the configured cap.",
      "ACKs clear the queue; retransmitted segments skip RTT sampling.",
    ],
    sourceIds: ["retransmission"],
    walkthroughIds: ["tcp-rto"],
  },
];

export const walkthroughs = [
  {
    id: "arp",
    title: "ARP: resolve the fake stack MAC",
    packetPath: ["TAP", "Ethernet", "ARP"],
    command: "ping -c 3 10.0.0.2",
    output: [
      "$ ping -c 3 10.0.0.2",
      "EtherType: 0x0806",
      "ARP packet",
      "Target IP: 10.0.0.2",
      "Result: valid ARP request for us",
      "Sent ARP reply",
    ],
    explanation:
      "Ping starts with ARP because the host knows the target IP but not the Ethernet destination MAC. The stack replies only when the ARP target IP equals 10.0.0.2.",
    codeRefs: ["src/ethernet.c", "src/arp.c"],
    fields: [
      {
        name: "EtherType",
        bytes: "08 06",
        detail: "Ethernet dispatches this frame to handle_arp().",
      },
      {
        name: "Opcode",
        bytes: "00 01",
        detail: "Opcode 1 is an ARP request.",
      },
      {
        name: "Target IP",
        bytes: "0a 00 00 02",
        detail: "The stack answers only when this matches STACK_IP.",
      },
    ],
    code: `if (arp_is_valid_request(arp, arp_data)) {
  send_arp_reply(tap_fd, eth, arp_data);
}`,
  },
  {
    id: "icmp",
    title: "ICMP ping: request becomes reply",
    packetPath: ["TAP", "Ethernet", "IPv4", "ICMP"],
    command: "ping -c 3 10.0.0.2",
    output: [
      "$ ping -c 3 10.0.0.2",
      "Protocol: 1 (ICMP)",
      "ICMP type: 8 (echo request)",
      "Echo sequence: 1",
      "Sent ICMP echo reply",
    ],
    explanation:
      "IPv4 protocol 1 selects ICMP. The handler flips type 8 to type 0, swaps addresses, and recalculates checksums.",
    codeRefs: ["src/ipv4.c", "src/icmp.c", "src/checksum.c"],
    fields: [
      {
        name: "IPv4 protocol",
        bytes: "01",
        detail: "Protocol 1 routes to handle_icmp().",
      },
      {
        name: "ICMP type",
        bytes: "08 -> 00",
        detail: "Echo request becomes echo reply.",
      },
      {
        name: "Checksum",
        bytes: "recomputed",
        detail: "Both IPv4 and ICMP checksums are rewritten before send.",
      },
    ],
    code: `icmp->type = ICMP_ECHO_REPLY;
icmp->checksum = 0;
icmp->checksum = checksum(icmp, icmp_len);`,
  },
  {
    id: "udp",
    title: "UDP echo: no connection, no retry",
    packetPath: ["TAP", "Ethernet", "IPv4", "UDP"],
    command: "printf 'hello udp\\n' | nc -u -w 1 10.0.0.2 1337",
    output: [
      "$ printf 'hello udp\\n' | nc -u -w 1 10.0.0.2 1337",
      "Protocol: 17 (UDP)",
      "UDP destination port: 1337",
      "UDP payload: hello udp\\n",
      "Sent UDP echo reply: 10 bytes",
    ],
    explanation:
      "UDP is a datagram. The stack validates length, prints the bytes, swaps source/destination ports, computes the UDP checksum, and sends the same payload back.",
    codeRefs: ["src/ipv4.c", "src/udp.c", "src/checksum.c"],
    fields: [
      {
        name: "Protocol",
        bytes: "11",
        detail: "Hex 0x11 is decimal 17, the IPv4 protocol number for UDP.",
      },
      {
        name: "Destination port",
        bytes: "05 39",
        detail: "0x0539 is port 1337.",
      },
      {
        name: "State",
        bytes: "none",
        detail: "UDP does not create connection or retransmission state.",
      },
    ],
    code: `udp->sport = udp->dport;
udp->dport = original_sport;
udp->checksum = udp_checksum(ip, udp, udp_len);`,
  },
  {
    id: "tcp-handshake",
    title: "TCP handshake: SYN, SYN-ACK, ACK",
    packetPath: ["TAP", "Ethernet", "IPv4", "TCP"],
    command: "printf 'hello tcp\\n' | nc -w 2 10.0.0.2 1337",
    output: [
      "$ printf 'hello tcp\\n' | nc -w 2 10.0.0.2 1337",
      "TCP flags: 0x02 SYN",
      "Sent TCP SYN-ACK",
      "TCP state: SYN_RECEIVED",
      "TCP pure ACK received",
      "TCP state: ESTABLISHED",
    ],
    explanation:
      "The SYN consumes one sequence number. The stack records the peer sequence, sends SYN-ACK with TCP_INITIAL_SEQ, then waits for the third ACK before treating the connection as established.",
    codeRefs: ["src/tcp.c", "include/tcp.h"],
    fields: [
      {
        name: "SYN",
        bytes: "02",
        detail: "Starts connection state.",
      },
      {
        name: "SYN-ACK",
        bytes: "12",
        detail: "SYN plus ACK replies with the stack's initial sequence.",
      },
      {
        name: "ACK",
        bytes: "10",
        detail: "Completes the minimal handshake.",
      },
    ],
    code: `tcp_conn.state = TCP_STATE_SYN_RECEIVED;
tcp_conn.snd_una = TCP_INITIAL_SEQ;
tcp_conn.snd_nxt = TCP_INITIAL_SEQ + 1;
tcp_conn.rcv_nxt = original_seq + 1;`,
  },
  {
    id: "tcp-payload",
    title: "TCP payload: acknowledge bytes and respond",
    packetPath: ["TAP", "Ethernet", "IPv4", "TCP"],
    command: "printf 'hello tcp\\n' | nc -w 2 10.0.0.2 1337",
    output: [
      "$ printf 'hello tcp\\n' | nc -w 2 10.0.0.2 1337",
      "TCP flags: 0x18 PSH ACK",
      "TCP payload: hello tcp\\n",
      "Sent TCP payload: 15 bytes",
      "SND.NXT: 1016",
      "Retransmission queued",
    ],
    explanation:
      "Payload advances RCV.NXT by the received byte count. The stack sends a hardcoded response payload and queues that one outbound segment until an ACK covers it.",
    codeRefs: ["src/tcp.c"],
    fields: [
      {
        name: "PSH, ACK",
        bytes: "18",
        detail: "Application bytes plus acknowledgement.",
      },
      {
        name: "Response",
        bytes: "stack received",
        detail: "The stack sends TCP_RESPONSE after client data.",
      },
      {
        name: "Queued seq",
        bytes: "1001..1016",
        detail: "The response stays in the retransmission queue until ACKed.",
      },
    ],
    code: `tcp_conn.rcv_nxt = original_seq + seq_advance;
tcp_conn.snd_nxt = reply_seq + payload_len;
tcp_retransmit_queue_save((uint8_t *)eth, frame_len,
                          reply_seq, tcp_conn.snd_nxt);`,
  },
  {
    id: "tcp-rto",
    title: "TCP retransmission: timeout, backoff, clear",
    packetPath: ["TAP", "Ethernet", "IPv4", "TCP", "RTO"],
    command: "drop ACKs manually, then run the TCP test",
    output: [
      "$ printf 'hello tcp\\n' | nc -w 2 10.0.0.2 1337",
      "Retransmission queued: seq 1001..1016, RTO 1000 ms",
      "Retransmitted TCP segment seq 1001..1016",
      "RTO backed off to 2000 ms",
      "Karn: skipped RTT sample for retransmitted segment",
      "Retransmission queue cleared",
    ],
    explanation:
      "This is not production TCP. It is a focused teaching model: one queued segment, one RTO timer, exponential backoff, and Karn's rule.",
    codeRefs: ["src/tcp.c", "include/tcp.h"],
    fields: [
      {
        name: "Initial RTO",
        bytes: "1000 ms",
        detail: "TCP_RTO_INITIAL_MS is 1000.",
      },
      {
        name: "Backoff",
        bytes: "x2",
        detail: "Timeout doubles RTO up to TCP_RTO_MAX_MS.",
      },
      {
        name: "Karn",
        bytes: "skip RTT",
        detail: "A retransmitted segment cannot produce a clean RTT sample.",
      },
    ],
    code: `if (elapsed_ms >= tcp_retx.rto_ms) {
  write(tap_fd, tcp_retx.frame, tcp_retx.frame_len);
  tcp_retx.retransmitted = true;
  tcp_retx.rto_ms *= 2;
}`,
  },
];

export const tcpStateSteps = [
  {
    state: "CLOSED",
    event: "No connection yet",
    detail: "The static tcp_conn starts here.",
  },
  {
    state: "SYN_RECEIVED",
    event: "Receive SYN, send SYN-ACK",
    detail: "The stack records peer/local ports plus initial sequence state.",
  },
  {
    state: "ESTABLISHED",
    event: "Receive third ACK",
    detail: "A pure ACK covering SND.NXT completes the handshake.",
  },
  {
    state: "LAST_ACK",
    event: "Receive FIN, send FIN-ACK",
    detail: "FIN consumes one sequence number, so ACK advances by one.",
  },
  {
    state: "CLOSED",
    event: "Peer ACKs our FIN",
    detail: "The minimal connection is reset for the next demo.",
  },
];

export const retransmissionSteps = [
  {
    label: "Queue",
    detail: "After sending TCP_RESPONSE, copy the outbound frame and remember seq_start and seq_end.",
  },
  {
    label: "Wait",
    detail: "select() wakes every TCP_TIMER_TICK_MS so the RTO check can run without new packets.",
  },
  {
    label: "Retransmit",
    detail: "If elapsed time exceeds RTO, write the saved frame again and mark it retransmitted.",
  },
  {
    label: "Back off",
    detail: "Double RTO until TCP_RTO_MAX_MS.",
  },
  {
    label: "Clear",
    detail: "When ACK >= seq_end, clear the queue; skip RTT update if the segment was retransmitted.",
  },
];

export const setupSteps = [
  {
    title: "Build the stack",
    body: "Compile the C program from the tcpip-stack repo.",
    command: `git clone https://github.com/JJKSweaty/tcpip-stack
cd tcpip-stack
make`,
  },
  {
    title: "Run the userspace stack",
    body: "Start the program first. It creates tap0 and waits for raw frames.",
    command: `sudo ./tcpip-stack`,
  },
  {
    title: "Configure TAP from a second terminal",
    body: "Give Linux the host-side IP, bring tap0 up, and flush stale ARP entries.",
    command: `sudo ip link set tap0 up
sudo ip addr add 10.0.0.1/24 dev tap0
sudo ip neigh flush dev tap0`,
  },
  {
    title: "Send real traffic",
    body: "Use normal Linux tools. They talk to your C stack through Ethernet frames.",
    command: `ping -c 3 10.0.0.2
printf 'hello udp\\n' | nc -u -w 1 10.0.0.2 1337
printf 'hello tcp\\n' | nc -w 2 10.0.0.2 1337`,
  },
];

export const articleCodeExamples = [
  {
    title: "Ethernet chooses ARP or IPv4",
    file: "src/ethernet.c",
    code: `if (ethertype == ETH_P_ARP) {
  handle_arp(tap_fd, buf, nread);
} else if (ethertype == ETH_P_IP) {
  handle_ipv4(tap_fd, buf, nread);
}`,
  },
  {
    title: "IPv4 chooses ICMP, TCP, or UDP",
    file: "src/ipv4.c",
    code: `if (ip->proto == IP_PROTO_ICMP) {
  handle_icmp(tap_fd, eth, ip, ip_header_len, total_len);
} else if (ip->proto == IP_PROTO_TCP) {
  handle_tcp(tap_fd, eth, ip, ip_header_len, total_len);
} else if (ip->proto == IP_PROTO_UDP) {
  handle_udp(tap_fd, eth, ip, ip_header_len, total_len);
}`,
  },
  {
    title: "TCP payload is queued for retry",
    file: "src/tcp.c",
    code: `tcp_conn.snd_nxt = reply_seq + payload_len;

tcp_retransmit_queue_save((uint8_t *)eth, frame_len,
                          reply_seq, tcp_conn.snd_nxt);`,
  },
];

export const roadmap = [
  "Multiple simultaneous TCP connections",
  "TCP options",
  "TCP receive window management",
  "Out-of-order TCP segments",
  "Real socket API integration",
  "UDP sockets or port binding",
  "Fragmentation and reassembly",
  "IPv6",
  "Automated packet-level tests",
];
