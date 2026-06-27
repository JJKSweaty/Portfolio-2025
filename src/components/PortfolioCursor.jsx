import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const interactiveSelector =
  "a, button, summary, input, textarea, select, [role='button'], [data-cursor='interactive']";

const PortfolioCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.35 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canUseFinePointer = window.matchMedia?.(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!canUseFinePointer || reduceMotion) return undefined;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    const handlePointerMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setActive(Boolean(event.target.closest?.(interactiveSelector)));
    };

    const handlePointerLeave = () => setVisible(false);
    const handlePointerOver = (event) => {
      setActive(Boolean(event.target.closest?.(interactiveSelector)));
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerover", handlePointerOver);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`portfolio-cursor ${active ? "portfolio-cursor-active" : ""}`}
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: active ? 1.14 : 1,
      }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <span className="portfolio-cursor-ring" />
      <span className="portfolio-cursor-core" />
      <span className="portfolio-cursor-spark" />
    </motion.div>
  );
};

export default PortfolioCursor;
