import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { contacts } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Contact = () => {
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
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Let's Connect
        </h3>
        <p className="text-slate-400 text-sm mb-10 max-w-md mx-auto">
          I'm always open to chatting about embedded systems, cool projects, or co-op opportunities.
        </p>

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

export default SectionWrapper(Contact, 'contact');