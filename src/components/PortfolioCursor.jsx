import { useEffect } from "react";

const PortfolioCursor = () => {
  useEffect(() => {
    const canUseFinePointer = window.matchMedia?.(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!canUseFinePointer || reduceMotion) return undefined;

    document.documentElement.classList.add("custom-cursor-enabled");

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return null;
};

export default PortfolioCursor;
