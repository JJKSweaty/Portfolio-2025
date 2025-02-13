import { useState, useEffect } from "react";

const AnimatedName = () => {
  const name = "Jonathan!";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 500; // Typing speed
    const pauseTime = 2000; // 2s pause after full name appears

    const handleTyping = () => {
      if (!isDeleting && index < name.length) {
        setDisplayedText((prev) => prev + name[index]);
        setIndex(index + 1);
      } else if (!isDeleting && index === name.length) {
        setTimeout(() => setIsDeleting(true), pauseTime); // Pause before deleting
      } else if (isDeleting && index > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      } else {
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  return (
    <h1 className="">
      {displayedText}
    </h1>
  );
};

export default AnimatedName;
