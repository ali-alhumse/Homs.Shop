const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const authValidator = {
  validateLogin({ email, password }) {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    return { valid: Object.keys(errors).length === 0, errors };
  },

  validateRegister({ firstName, lastName, email, password, confirmPassword, agreeTerms }) {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    return { valid: Object.keys(errors).length === 0, errors };
  },
};

export default authValidator;
