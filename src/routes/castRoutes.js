import {
  createCast,
  getCast,
  getCastMovieByName,
} from "../controller/cast/cast.js";
import express from "express";

const Router = express.Router();

Router.get("/casts", getCast);
Router.get("/cast/:name", getCastMovieByName);
Router.post("/cast", createCast);

export default Router;
