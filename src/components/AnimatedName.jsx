import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const GlitchText = styled.span`
  position: relative;
  display: inline-block;
  color: #64ffda;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 2px 2px 0px #1df2f0;
  text-align: center;
  width: 100%;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 #E94BE8;
    animation: glitch-1 2s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: 2px 0 #1df2f0;
    animation: glitch-2 3s infinite linear alternate-reverse;
  }

  @media (max-width: 640px) {
    font-size: 2rem;
    text-shadow: 1px 1px 0px #1df2f0;
  }

  @keyframes glitch-1 {
    0% {
      clip-path: inset(20% 0 30% 0);
      transform: translate(-2px, 2px);
    }
    20% {
      clip-path: inset(60% 0 1% 0);
      transform: translate(2px, -2px);
    }
    40% {
      clip-path: inset(43% 0 1% 0);
      transform: translate(-2px, 2px);
    }
    60% {
      clip-path: inset(25% 0 58% 0);
      transform: translate(2px, -2px);
    }
    80% {
      clip-path: inset(54% 0 7% 0);
      transform: translate(-2px, 2px);
    }
    100% {
      clip-path: inset(58% 0 43% 0);
      transform: translate(2px, -2px);
    }
  }

  @keyframes glitch-2 {
    0% {
      clip-path: inset(1% 0 60% 0);
      transform: translate(2px, -2px);
    }
    20% {
      clip-path: inset(30% 0 20% 0);
      transform: translate(-2px, 2px);
    }
    40% {
      clip-path: inset(1% 0 43% 0);
      transform: translate(2px, -2px);
    }
    60% {
      clip-path: inset(58% 0 25% 0);
      transform: translate(-2px, 2px);
    }
    80% {
      clip-path: inset(7% 0 54% 0);
      transform: translate(2px, -2px);
    }
    100% {
      clip-path: inset(43% 0 58% 0);
      transform: translate(-2px, 2px);
    }
  }
`;

const AnimatedName = () => {
  const titles = ["Jonathan", "Electrical Engineer", "Embedded SWE"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const waitingTime = 2000;

    if (isWaiting) {
      const timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, waitingTime);
      return () => clearTimeout(timer);
    }

    const handleTyping = () => {
      if (!isDeleting && displayedText.length < currentTitle.length) {
        setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
      } else if (!isDeleting && displayedText.length === currentTitle.length) {
        setIsWaiting(true);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentTitle.slice(0, displayedText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, isWaiting, currentTitleIndex]);

  return (
    <div className="w-full flex justify-center">
      <GlitchText data-text={displayedText}>{displayedText}</GlitchText>
    </div>
  );
};

export default AnimatedName;
