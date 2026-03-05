"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  let timeoutId;

  const showToast = ({
    message,
    type = "info", // default type
    duration = 3000,
  }) => {
    clearTimeout(timeoutId);

    setToast({
      id: Date.now(),
      message,
      type,
    });

    timeoutId = setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
      default:
        return "bg-primary";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className="fixed top-[6em] right-6 z-50">
          <div
            className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition
              ${getToastStyles(toast.type)}
            `}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
