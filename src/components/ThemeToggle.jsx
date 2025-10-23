import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { useTheme, themes } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeColors = {
    'cyber-green': { name: 'Cyber Green', color: '#64ffda' },
    'neon-purple': { name: 'Neon Purple', color: '#a855f7' },
    'sunset-orange': { name: 'Sunset Orange', color: '#f97316' },
    'ocean-blue': { name: 'Ocean Blue', color: '#0ea5e9' },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-all duration-300 hover:bg-[var(--theme-accent)]"
        style={{ color: 'var(--theme-primary)' }}
      >
        <FontAwesomeIcon icon={faPalette} className="text-xl" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 p-3 rounded-xl bg-black/95 backdrop-blur-sm border border-[var(--theme-primary)]/20 shadow-xl z-50 min-w-[200px]"
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--theme-primary)' }}>
              Choose Theme
            </p>
            <div className="space-y-2">
              {Object.entries(themeColors).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                    theme === key
                      ? 'bg-[var(--theme-accent)] border border-[var(--theme-primary)]'
                      : 'hover:bg-[var(--theme-accent)] border border-transparent'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: value.color }}
                  />
                  <span className="text-white text-sm">{value.name}</span>
                  {theme === key && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ backgroundColor: value.color }}
                    />
                  )}
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
