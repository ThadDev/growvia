// context/UserContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const KycContext = createContext(null);

export const KycProvider = ({ children }) => {
  const [kyc, setKyc] = useState(null);

  return (
    <KycContext.Provider value={{ kyc, setKyc }}>
      {children}
    </KycContext.Provider>
  );
};

const InvContext = createContext(null);

export const InvProvider = ({ children }) => {
  const [inv, setInv] = useState(null);

  return (
    <InvContext.Provider value={{ inv, setInv }}>
      {children}
    </InvContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
export const useKyc = () => useContext(KycContext);
export const useInv = () => useContext(InvContext);
