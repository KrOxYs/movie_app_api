import { createDirector } from "../controller/directors/directors.js";
import express from "express";

const Router = express.Router();

Router.post("/director", createDirector);

export default Router;
