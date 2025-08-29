import { useState, useEffect } from "react";

export const colorSchemes = [
  {
    bg: "from-blue-400 via-blue-500 to-blue-600",
    bubbles: "bg-blue-300",
    headerColor: "blue-500/30",
  },
  {
    bg: "from-green-400 via-green-500 to-green-600",
    bubbles: "bg-green-300",
    headerColor: "green-500/30",
  },
  {
    bg: "from-yellow-400 via-yellow-500 to-yellow-600",
    bubbles: "bg-yellow-300",
    headerColor: "yellow-500/30",
  },
];

export const useColorCycle = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colorSchemes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    currentColorIndex,
    currentScheme: colorSchemes[currentColorIndex],
  };
};
