import { useState, useEffect, useRef } from "react";

// Custom hook to detect clicks outside of a referenced element
export const useOutsideClick = (initialState: boolean = false) => {
  const [isClickedOutside, setIsClickedOutside] =
    useState<boolean>(initialState);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the referenced element
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsClickedOutside(true);
      } else {
        setIsClickedOutside(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isClickedOutside, elementRef };
};


