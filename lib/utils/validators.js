export const passwordValidator = (password, password2) => {
  let errors = [];

  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@$%^&*()-=_+{};'\:"|,.<>?]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (password !== password2) {
    errors.push("Passwords do not match.");
  }

  if (!minLength) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!hasUpperCase) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!hasLowerCase) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!hasSpecialChar) {
    errors.push("Password must contain at least one number.");
  }
  if (!hasNumber) {
    errors.push("Password must contain at least one special character.");
  }

  return {
    isValidPassword: errors.length === 0,
    errors: errors,
  };
};
