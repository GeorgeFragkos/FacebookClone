exports.validateEmail = (email) => {
  const regexPattern =
    /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,30})(\.[a-z]{2,30})?$/;

  return String(email).toLocaleLowerCase().match(regexPattern);
};

exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};
