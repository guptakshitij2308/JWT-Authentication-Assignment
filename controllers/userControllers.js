exports.login = (req, res) => {
  res.status(200).json("Hey login!");
};

exports.signup = (req, res) => {
  res.status(200).json("Hey signup!");
};

exports.getinfo = (req, res) => {
  res.status(200).json("Hey there!");
};

exports.checkBody = (req, res, next) => {
  if (!req.body.password || !req.body.email)
    return res.status(400).json({
      staus: "failed",
      message: "missing name or password",
    });
  next();
};
