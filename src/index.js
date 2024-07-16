import express from "express";
import { sequelize } from "./Model/association.js";
import indexRoutes from "./routes/indexRoutes.js";
import passport from "passport";
import "./middleware/Auth/authMiddleware.js";
import { isSignIn } from "./middleware/Auth/isSignin.js";
import redis from "./config/redisConfig.js";

const app = express();
app.use(indexRoutes);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/protected", isSignIn, (req, res) => {
  const token = req.user;
  console.log(req.user);

  // console.log(token);
  res.send("You are authenticated");
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.log(err);
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
    app.listen(3000, () => console.log("Server is running on port 3000"));
  } catch (err) {
    throw new Error(err);
  }
};
startServer();
