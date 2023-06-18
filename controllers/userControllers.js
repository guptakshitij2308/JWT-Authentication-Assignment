const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { getToken } = require("./../middlewares/authMiddleware");

const handleError = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.message == "incorrect email") {
    errors.email = "The email doesn't exists! Please Sign up.";
  }

  if (err.message == "incorrect password") {
    errors.password =
      "Invalid password! Please enter correct password to login";
  }

  if (err.code === 11000) {
    errors.email = "That email is already in use.";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 60 * 60 * 24;

const createToken = (id) => {
  return jwt.sign({ id }, "Authentication Secret", {
    expiresIn: maxAge,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({
      message: "Invalid credentials",
      errors,
    });
  }
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json(user._id);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({
    message: "You have been successfully logged out",
  });
};

exports.getinfo = async (req, res) => {
  const token = getToken(req);

  let id = "";
  jwt.verify(token, "Authentication Secret", (err, decodedToken) => {
    id = decodedToken.id;
  });

  try {
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (err) {
    res.staus(400).json({
      message: "No user found with the corresponding ID",
    });
  }
};
