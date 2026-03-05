export default function PasswordRequirements({ password }) {
  const rules = [
    { label: "8 characters", valid: password.length >= 8 },
    { label: "uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "lowercase letter", valid: /[a-z]/.test(password) },
    { label: "number", valid: /[0-9]/.test(password) },
    {
      label: "special character",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <div className="space-y-2 grid grid-cols-3 justify-center align-center mt-2 text-xs">
      {rules.map((rule, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              rule.valid ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <span
            className={`${
              rule.valid ? "text-green-500" : "text-text"
            }`}
          >
            {rule.label}
          </span>
        </div>
      ))}
    </div>
  );
}
