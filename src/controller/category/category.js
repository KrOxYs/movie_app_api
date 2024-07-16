// import express from "express";
import { Category } from "../../Model/association.js";
import { Movie } from "../../Model/association.js";
// const router = express.Router();

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMovieByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findAll({ where: { categoryID: id } });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).send(movie);
  } catch (err) {
    throw new Error(err);
  }
};
