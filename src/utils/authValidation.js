
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email address is required.";
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return "Enter a valid email address.";
  }

  return "";
};

export const validateFullName = (fullName) => {
  const name = fullName.trim();

  if (!name) {
    return "Full name is required.";
  }

  if (name.length < 2) {
    return "Full name must contain at least 2 characters.";
  }

  if (name.length > 60) {
    return "Full name must not exceed 60 characters.";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Include at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Include at least one lowercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Include at least one number.";
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Include at least one special character.";
  }

  return "";
};

export const validateConfirmPassword = (
  password,
  confirmPassword
) => {
  if (!confirmPassword) {
    return "Please confirm your password.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
};

export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      label: "",
      score: 0,
      color: "bg-gray-200",
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      label: "Weak",
      score,
      color: "bg-red-500",
    };
  }

  if (score <= 4) {
    return {
      label: "Medium",
      score,
      color: "bg-yellow-500",
    };
  }

  return {
    label: "Strong",
    score,
    color: "bg-green-500",
  };
};
