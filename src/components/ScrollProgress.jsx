import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const smoothProgress = useSpring(0, {
    stiffness: 180,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      setProgress(window.scrollY / scrollableHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    smoothProgress.set(progress);
  }, [progress, smoothProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-white/[0.06] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-secondary)] to-[var(--theme-primary)] shadow-[0_0_16px_var(--theme-glow)]"
        style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
      />
    </div>
  );
};

export default ScrollProgress;

