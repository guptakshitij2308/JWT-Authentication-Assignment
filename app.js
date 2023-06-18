const express = require("express");

const userRouter = require("./routes/userRoutes");
const app = express();
// const User = require("./models/userModel");

app.use(express.json());
app.use("/api/users", userRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Invalid Request ; Can't find ${req.originalUrl}`, 404));
// });

module.exports = app;
