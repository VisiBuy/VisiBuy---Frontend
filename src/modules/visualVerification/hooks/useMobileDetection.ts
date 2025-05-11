import { useState, useEffect } from "react";


export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to update mobile state based on window width
    const updateMobile = () => setIsMobile(window.innerWidth <= 768);

    // Initial check on component mount
    updateMobile();

    // Add event listener on resize
    window.addEventListener("resize", updateMobile);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  return isMobile;
};

export default useMobileDetection;
