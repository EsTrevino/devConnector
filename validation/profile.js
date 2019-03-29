const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateProfileInput = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handleLength = 'Handle must be between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.emptyHandle = 'Profile handle required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.emptyStatus = 'Profile status is required';
  }

  if (!Validator.isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.invalidWebsiteURL = 'Invalid url given for website';
    }
  }

  if (!Validator.isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.invalidyoutubeURL = 'Invalid url given for youtube';
    }
  }

  if (!Validator.isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.invalidtwitterURL = 'Invalid url given for twitter';
    }
  }

  if (!Validator.isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.invalidlinkedinURL = 'Invalid url given for linkedin';
    }
  }

  if (!Validator.isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.invalidfacebookURL = 'Invalid url given for facebook';
    }
  }

  if (!Validator.isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.invalidinstagramURL = 'Invalid url given for instagram';
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
