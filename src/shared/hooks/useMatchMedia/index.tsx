import { useEffect, useMemo, useState } from "react";

export const useMatchMedia = (query: string) => {
  const mql = useMemo(() => {
    return window.matchMedia(query);
  }, [query]);

  const [matches, setMatches] = useState(mql.matches);

  useEffect(() => {
    setMatches(mql.matches);
    const handle = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, [mql]);

  return { matches, mql };
};
