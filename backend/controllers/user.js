const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "invalid email address" });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ message: "Email address already exists" });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "First name must between 3 and 30 characters." });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "last name must between 3 and 30 characters." });
    }

    if (!validateLength(password, 6, 30)) {
      return res
        .status(400)
        .json({ message: "password at least 6 characters" });
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    let = tempUsername = first_name + last_name;
    let newUserName = await validateUsername(tempUsername);
    const user = await new User({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
      username: newUserName,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user.id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register success! please activate your email to start",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "this email is already activated" });
    }
    await User.findByIdAndUpdate(user.id, { verified: true });
    return res
      .status(200)
      .json({ message: "Account has been successfully activated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email/password" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Invalid email/password" });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
