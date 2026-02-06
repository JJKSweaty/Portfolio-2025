import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { contacts } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const email = useMemo(() => {
    const match = contacts.find((item) => item.info.startsWith("mailto:"));
    return match ? match.info.replace("mailto:", "") : "johnkoper12@gmail.com";
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-2">
          Get In Touch
        </p>
        <h3 className="display-font text-3xl sm:text-4xl font-semibold text-white mb-3">
          Let&apos;s Connect
        </h3>
        <p className="text-slate-400 text-sm mb-10 max-w-md mx-auto">
          I am always open to chats about embedded systems, interesting builds,
          and co-op opportunities.
        </p>

        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Open to opportunities
          </span>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] text-slate-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <FontAwesomeIcon icon={faCopy} className="text-[10px]" />
            {copied ? "Email copied" : "Copy email"}
          </button>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {contacts.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.info}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-medium
                         text-slate-300 border border-white/[0.06] bg-white/[0.02]
                         hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 hover:bg-[var(--theme-primary)]/[0.05]
                         transition-all duration-200"
            >
              <FontAwesomeIcon icon={contact.icon} className="text-base" />
              {contact.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
