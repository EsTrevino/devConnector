const Validator = require('validator');
const isEmpty = require('./isEmpty');

// const validatorIsFieldEmpty = (
//   input,
//   string,
//   errorObj,
//   errorKeyName,
//   isEmpty
// ) => {
//   if (!Validator.isEmpty(input)) {
//     errorObj.errorKeyName = string;
//   }
// };

// const checkForEmptyData = (input, isEmpty) => {
//   return (input = !isEmpty(input) ? input : '');
// };

const validateRegisterInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.nameLength = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.emptyName = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.emptyEmail = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.invalidEmail = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.emptyPassword = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.passwordLength = 'Password must be between 6 and 30 characters';
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.emptyPasswordConfirm = 'Password confirm is required';
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirmMatch = 'Passwords must match';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
