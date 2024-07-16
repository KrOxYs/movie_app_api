import express from "express";
import bodyParser from "body-parser";
import categoryRoutes from "./categoryRoutes.js";
import movieRoutes from "./movieRoutes.js";
import genreRoutes from "./genreRoutes.js";
import castRoutes from "./castRoutes.js";
import directorRoutes from "./directorRoutes.js";
import authRoutes from "./Auth/authRoutes.js";
import paymentRoutes from "./payment/paymentRoutes.js";
const app = express();
app.use(bodyParser.json());

app.use("/api", categoryRoutes);
app.use("/api", movieRoutes);
app.use("/api", genreRoutes);
app.use("/api", castRoutes);
app.use("/api", directorRoutes);
app.use("/api", authRoutes);
app.use("/api", paymentRoutes);

export default app;
