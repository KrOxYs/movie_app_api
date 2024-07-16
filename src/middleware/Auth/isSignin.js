import jwt from "jsonwebtoken";
import jwtConfig from "../../config/jwtConfig.js";

export const isSignIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("You must be logged in");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("You must be logged in");
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error("JWT Verification Error: ", err);
    return res.status(401).send("You must be logged in");
  }
};
