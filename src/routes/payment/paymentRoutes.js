import {
  createSubscription,
  getStatusSubcription,
} from "../../controller/Subscription/subscription.js";
import { isSignIn } from "../../middleware/Auth/isSignin.js";

import express from "express";

const router = express.Router();

router.post("/subscription", isSignIn, createSubscription);
router.get("/subscription/:order_id", isSignIn, getStatusSubcription);

export default router;
