const jwt = require("jsonwebtoken");

const getToken = (req) => {
  const cookieHeaderIndex = req.rawHeaders.findIndex(
    (header) => header.toLowerCase() === "cookie"
  );

  if (cookieHeaderIndex !== -1) {
    const cookieHeader = req.rawHeaders[cookieHeaderIndex + 1];
    const jwtCookieMatch = cookieHeader.match(/jwt=([^;]+)/);

    if (jwtCookieMatch) {
      token = jwtCookieMatch[1];
      return token;
    } else return "";
  }
};

const requireAuth = (req, res, next) => {
  const token = getToken(req);

  if (token) {
    jwt.verify(token, "Authentication Secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        console.log("Invalid jwt token");
        res.status(400).json({
          message: "JWT token is either invalid or has expired! Please login",
        });
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    console.log("Token not found");
    res
      .status(400)
      .json({ message: "Token not found! Please login or sign up" });
  }
};

module.exports = { requireAuth, getToken };
