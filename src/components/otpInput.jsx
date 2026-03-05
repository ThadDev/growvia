// "use client";

// import { useEffect, useRef } from "react";

// export default function OtpInput({
//   length = 4,
//   value,
//   onChange,
//   status = "idle", // idle | success | error
// }) {
//   const inputsRef = useRef([]);

//   const handleChange = (e, index) => {
//     const val = e.target.value.replace(/\D/, "");

//     if (!val) return;

//     const newValue = value.split("");
//     newValue[index] = val;
//     onChange(newValue.join(""));

//     if (index < length - 1) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       const newValue = value.split("");
//       newValue[index] = "";
//       onChange(newValue.join(""));

//       if (index > 0) {
//         inputsRef.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData("text").slice(0, length);
//     if (!/^\d+$/.test(paste)) return;

//     onChange(paste);
//     inputsRef.current[length - 1]?.focus();
//   };

//   return (
//     <div className="flex justify-center gap-3" onPaste={handlePaste}>
//       {Array.from({ length }).map((_, index) => (
//         <input
//           key={index}
//           ref={(el) => (inputsRef.current[index] = el)}
//           type="text"
//           maxLength={1}
//           value={value[index] || ""}
//           onChange={(e) => handleChange(e, index)}
//           onKeyDown={(e) => handleKeyDown(e, index)}
//           className={`
//             w-12 h-14 text-center text-lg font-semibold rounded-xl border 
//             transition-all duration-200
//             bg-transparent text-text
//             ${
//               status === "success"
//                 ? "border-green-500 ring-2 ring-green-400"
//                 : status === "error"
//                 ? "border-red-500 ring-2 ring-red-400"
//                 : "border-border focus:ring-2 focus:ring-primary"
//             }
//           `}
//         />
//       ))}
//     </div>
//   );
// }
function OTPInput({ value, onChange, success, loading }) {
  return (
    <div className="flex gap-3 justify-center">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => {
            const newValue = value.split("");
            newValue[i] = e.target.value.replace(/\D/, "");
            onChange(newValue.join(""));
          }}
          className={`w-14 h-14 text-center text-xl rounded-xl border
            ${success ? "border-green-500 text-green-500" : "border-surface"}
            ${loading ? "animate-pulse" : ""}
          `}
        />
      ))}
    </div>
  );
}
