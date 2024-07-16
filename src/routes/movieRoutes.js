import {
  createMovie,
  getMovies,
  updateMovie,
  getMovieID,
  deleteMovie,
} from "../controller/movie/movie.js";
import {
  postMovieGenre,
  getMovieGenre,
} from "../controller/movieGenre/movieGenre.js";
import {
  createMovieCast,
  getMovieCast,
} from "../controller/movieCast/movieCast.js";

import { postMovieDirector } from "../controller/movieDirector/movieDirector.js";
import express from "express";
import { upload } from "../config/uploadConfig.js";
import { isSignIn } from "../middleware/Auth/isSignin.js";
import { checkAdmin } from "../middleware/Auth/isAdmin.js";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movie/:id", isSignIn, getMovieID);
router.get("/movie/:movie_id/genres", isSignIn, checkAdmin, getMovieGenre);
router.get("/movie/:movie_id/casts", isSignIn, checkAdmin, getMovieCast);
router.post(
  "/movie",
  upload.single("thumbnail"),
  isSignIn,
  checkAdmin,
  createMovie
);
router.post("/movie/:movie_id/genres", isSignIn, checkAdmin, postMovieGenre);
router.post("/movie/:movie_id/casts", isSignIn, checkAdmin, createMovieCast);
router.post(
  "/movie/:movie_id/directors",
  isSignIn,
  checkAdmin,
  postMovieDirector
);
router.patch(
  "/movie/:id",
  upload.single("thumbnail"),
  isSignIn,
  checkAdmin,
  updateMovie
);
router.delete("/movie/:id", isSignIn, checkAdmin, deleteMovie);

export default router;
