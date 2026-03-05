"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BalanceVisibilityContext = createContext();

export function BalanceVisibilityProvider({ children }) {
  const [hidden, setHidden] = useState(false);

  // persist
  useEffect(() => {
    const saved = localStorage.getItem("hideBalance");
    if (saved !== null) setHidden(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("hideBalance", JSON.stringify(hidden));
  }, [hidden]);

  const toggle = () => setHidden((prev) => !prev);

  return (
    <BalanceVisibilityContext.Provider value={{ hidden, toggle }}>
      {children}
    </BalanceVisibilityContext.Provider>
  );
}

export function useBalanceVisibility() {
  return useContext(BalanceVisibilityContext);
}
