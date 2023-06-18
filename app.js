const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use(cookieParser());

app.all("*", (req, res, next) => {
  res.status(404).json({
    message: `Invalid Request ; Can't find ${req.originalUrl}`,
  });
});

module.exports = app;
