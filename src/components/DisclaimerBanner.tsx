import { useState, useEffect } from "react";

const DisclaimerBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide disclaimer
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show disclaimer
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] w-full overflow-hidden bg-black py-2 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="whitespace-nowrap animate-marquee text-white font-normal text-xs">
        Shop on Visibuy — what you see is what you get. Say no to "what you
        order vs what you get".
      </div>

    </div>
  );
};

export default DisclaimerBanner;
