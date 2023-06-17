const express = require("express");

const userRouter = require("./routes/userRoutes");
const app = express();
const User = require("./models/userModel");

app.use(express.json());
app.use("/api/users", userRouter);

// app.get("/signup", signup);

// app.get("/login", login);

// app.get("/getuserinfo", getinfo);

module.exports = app;
