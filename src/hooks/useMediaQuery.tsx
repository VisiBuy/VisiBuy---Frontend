import { useEffect, useState } from "react";

export function useMediaQuery(width:number) {
    const [matches, setMatches] = useState(false);
  
    useEffect(() => {
      const updateMatch = () => setMatches(window.innerWidth >= width);
      updateMatch();
      
      window.addEventListener('resize', updateMatch);
      return () => window.removeEventListener('resize', updateMatch);
    }, [width]);
  
    return matches;
  }