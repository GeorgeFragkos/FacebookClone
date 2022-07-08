const User = require("../models/User");

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

exports.validateUsername = async (username) => {
  let flag = false;

  do {
    let usernameAlreadyExists = await User.findOne({ username });
    if (usernameAlreadyExists) {
      //change username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      flag = true;
    } else {
      flag = false;
    }
  } while (flag);
  return username;
};
