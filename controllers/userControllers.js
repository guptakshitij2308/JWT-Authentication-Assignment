const User = require("../models/userModel");

const handleError = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.status(200).json("Hey login!");
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

exports.getinfo = (req, res) => {
  res.status(200).json("Hey there!");
};

// exports.checkBody = (req, res, next) => {
//   if (!req.body.password || !req.body.email)
//     return res.status(400).json({
//       staus: "failed",
//       message: "missing name or password",
//     });
//   next();
// };
