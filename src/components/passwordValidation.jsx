export const usePasswordValidation = () => {
  const validatePassword = (password, confirmPassword, showToast) => {
    if (!password || !confirmPassword) {
      showToast?.({ message: "All fields are required", type: "error" });
      return false;
    }

    if (password.length < 8) {
      showToast?.({
        message: "Password must be at least 8 characters",
        type: "error",
      });
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      showToast?.({
        message: "Password must contain an uppercase letter",
        type: "error",
      });
      return false;
    }

    if (!/[a-z]/.test(password)) {
      showToast?.({
        message: "Password must contain a lowercase letter",
        type: "error",
      });
      return false;
    }

    if (!/[0-9]/.test(password)) {
      showToast?.({
        message: "Password must contain a number",
        type: "error",
      });
      return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      showToast?.({
        message: "Password must contain a special character",
        type: "error",
      });
      return false;
    }

    if (password !== confirmPassword) {
      showToast?.({
        message: "Passwords do not match",
        type: "error",
      });
      return false;
    }

    return true;
  };

  return { validatePassword };
};
