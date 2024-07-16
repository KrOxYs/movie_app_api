import express from "express";
import {
  getCategory,
  createCategory,
  getMovieByCategory,
} from "../controller/category/category.js";
const router = express.Router();

router.get("/category", getCategory);
router.get("/category/movie/:id", getMovieByCategory);
router.post("/category", createCategory);

export default router;
