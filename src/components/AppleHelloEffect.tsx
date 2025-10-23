import { motion } from "framer-motion";
import React from "react";

interface AppleHelloJonathanEffectProps {
  speed?: number;
  onAnimationComplete?: () => void;
  className?: string;
}

export const AppleHelloJonathanEffect: React.FC<
  AppleHelloJonathanEffectProps
> = ({
  speed = 1,
  onAnimationComplete,
  className = "",
}) => {
  // Adjust duration based on speed multiplier
  const duration = 3 / speed;

  return (
    <motion.svg
      width="100%"
      viewBox="0 0 600 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Jonathan handwritten animation"
      className={className}
    >
      {/* Each letter is drawn in sequence */}
      <motion.path
        d="M50 150 C60 100 80 100 90 150"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut" }}
      />
      <motion.path
        d="M110 150 L110 110"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut", delay: duration * 0.3 }}
      />
      <motion.path
        d="M130 150 C135 120 155 120 160 150"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut", delay: duration * 0.6 }}
      />
      <motion.path
        d="M180 150 L180 100 L200 100"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut", delay: duration * 0.9 }}
      />
      <motion.path
        d="M230 150 C240 120 260 120 270 150"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut", delay: duration * 1.2 }}
      />
      <motion.path
        d="M300 150 L300 100 L330 150"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut", delay: duration * 1.5 }}
      />
      <motion.path
        d="M360 100 C350 150 390 150 380 100"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration,
          ease: "easeInOut",
          delay: duration * 1.8,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
};

export default AppleHelloJonathanEffect;
