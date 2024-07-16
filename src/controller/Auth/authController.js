import jwtConfig from "../../config/jwtConfig.js";
import jwt from "jsonwebtoken";
import { User } from "../../Model/association.js";
import transporter from "../../config/nodemailerConfig.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// in memory storage for verification code
const verificationCodes = new Map();

export const register = async (req, res) => {
  const { fullname, email, password, photo } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).send("Please fill all fields");
  }

  const code = uuidv4().replace(/-/g, ""); // Generate UUID and remove hyphens
  const numericCode = code.substr(0, 6);
  verificationCodes.set(email, numericCode);

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      photo,
      role: "admin",
      premium_expired: "",
      verived: false,
    });

    await transporter.sendMail({
      from: "mohammadbaiqi@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Your verification code is ${numericCode}`,
    });

    return res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const verify = async (req, res) => {
  const email = req.user.email;

  const { verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res
      .status(400)
      .send({ message: "Email and verification code are required" });
  }

  const storedCode = verificationCodes.get(email);
  if (!storedCode || storedCode !== verificationCode) {
    return res
      .status(400)
      .send({ message: "Invalid or expired verification code" });
  }

  try {
    // Update user's verified status
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    user.verived = true;
    await user.save();

    verificationCodes.delete(email); // Remove the code after successful verification

    return res.status(200).send({ message: "Email verified successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password)
    return res.status(400).send({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).send({ message: "User does not exist" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).send({ message: "Invalid password" });

    const token = jwt.sign({ email: user.email }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
