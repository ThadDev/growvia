import { useEffect, useState } from "react";

export default function Toast({ message, duration }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 10; // update every 10ms
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div
      className={`fixed top-[6em] right-6 ${
        ["required", "empty","robot"].some((word) => message.includes(word))
          ? "bg-red-600"
          : "bg-green-600"
      } backdrop-blur-md shadow-lg rounded-md px-4 py-3 w-72 z-50 overflow-hidden`}
    >
      <p className="text-white">{message}</p>
      {/* Animated progress bar */}
      <div
        className="h-1 bg-primary rounded-md"
        style={{ width: `${progress}%`, transition: "width 0.01s linear" }}
      ></div>
    </div>
  );
}