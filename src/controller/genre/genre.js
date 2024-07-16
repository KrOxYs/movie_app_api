import { Genre } from "../../Model/association.js";
import { Movie } from "../../Model/association.js";

export const getGenre = async (_, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGenreMovieByName = async (req, res) => {
  const { name } = req.params;
  try {
    const movie = await Genre.findOne({
      where: { name },
      include: Movie,
    });
    if (!movie) {
      return res.status(404).json({ message: "Genre Not Found" });
    }
    const movies = movie.Movies;
    // console.log(movie);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Genre Not Found" });
  }
};

export const createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const newGenre = await Genre.create({ name });
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
