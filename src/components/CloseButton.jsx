import { useState } from "react";

const CloseButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="relative w-16 h-16 border-none bg-red-200/10 rounded-md transition duration-500 hover:bg-red-600 active:bg-red-900 flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="absolute w-8 h-[1.5px] bg-white rotate-45"></span>
      <span className="absolute w-8 h-[1.5px] bg-white -rotate-45"></span>

      {hovered && (
        <span className="absolute top-[-70%] left-1/2 transform -translate-x-1/2 px-4 py-1 text-xs bg-gray-900 text-teal-200 rounded opacity-0 animate-fade-in">
          Close
        </span>
      )}
    </button>
  );
};

export default CloseButton;
