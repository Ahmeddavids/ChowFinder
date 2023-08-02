const validator = require('validator');

const validateEmailAndPhone = (email, phoneNumber, fullName) => {
  const errors = [];

  if (email && !validator.isEmail(email)) {
    errors.push('Invalid Email Format');
  }

  if (phoneNumber && (!validator.isNumeric(phoneNumber) || !validator.isLength(phoneNumber, { min: 11, max: 11 }))) {
    errors.push('Invalid Number Format');
  }

  if (fullName && !validator.matches(fullName, /^[A-Za-z ]+$/)) {
    errors.push('Invalid Name Format. Only letters and spaces are allowed.');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      message: errors.join(', ')
    };
  }

  return {
    isValid: true
  };
};

module.exports = validateEmailAndPhone;
