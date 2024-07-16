import express from "express";
import {
  getGenre,
  createGenre,
  getGenreMovieByName,
} from "../controller/genre/genre.js";
const router = express.Router();

router.get("/genre", getGenre);
router.get("/genre/:name", getGenreMovieByName);
router.post("/genre", createGenre);

export default router;
