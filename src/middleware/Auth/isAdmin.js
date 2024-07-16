// middleware/Auth/checkAdmin.js
import { User } from "../../Model/association.js";
export const checkAdmin = async (req, res, next) => {
  const user = req.user;

  const findUser = await User.findOne({ where: { email: user.email } });

  if (findUser.role === "admin") {
    return next();
  } else {
    return res.status(403).send({ message: "Access denied. Admins only." });
  }
};
