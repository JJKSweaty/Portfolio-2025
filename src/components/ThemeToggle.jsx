import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const themeColors = {
  arctic:   { name: 'Arctic',   color: '#94a3b8' },
  lavender: { name: 'Lavender', color: '#a78bfa' },
  ember:    { name: 'Ember',    color: '#fb923c' },
  ocean:    { name: 'Ocean',    color: '#38bdf8' },
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
        aria-label="Change theme"
      >
        <div
          className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20 transition-colors"
          style={{ backgroundColor: themeColors[theme]?.color }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 p-2 rounded-xl bg-black/90 backdrop-blur-xl border border-white/[0.08] shadow-xl z-50"
          >
            <div className="flex gap-2">
              {Object.entries(themeColors).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => { setTheme(key); setIsOpen(false); }}
                  className="group relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
                  aria-label={`Switch to ${value.name} theme`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-all ${
                      theme === key ? "ring-2 ring-white scale-110" : "ring-1 ring-white/20 group-hover:ring-white/40"
                    }`}
                    style={{ backgroundColor: value.color }}
                  />
                  {/* tooltip */}
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] text-slate-300 bg-black/90 border border-white/[0.06] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {value.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;