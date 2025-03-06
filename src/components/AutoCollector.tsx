"use client";

import { useEffect } from "react";
import { useStore } from "~/lib/store";
import Big from "big.js";

export default function AutoCollector() {
  const calculateAutoProduction = useStore((state) => state.calculateAutoProduction);
  const addHats = useStore((state) => state.addHats);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        interval = setInterval(() => {
          const production = calculateAutoProduction();
          addHats(production.toNumber());
        }, 5000);
      } else {
        clearInterval(interval);
      }
    };

    // Initial setup
    handleVisibilityChange();
    
    // Add visibility change listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [calculateAutoProduction, addHats]);

  return null;
}
