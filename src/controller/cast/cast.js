import { Cast, Movie } from "../../Model/association.js";

export const getCast = async (_, res) => {
  try {
    const cast = await Cast.findAll();
    return res.status(200).json(cast);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCastMovieByName = async (req, res) => {
  const { name } = req.params;
  try {
    const cast = await Cast.findOne({
      where: { name },
      include: Movie,
    });
    if (!cast) {
      return res.status(404).json({ message: "Cast Not Found" });
    }
    const movies = cast.Movies;
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: "Cast Not Found" });
  }
};

export const createCast = async (req, res) => {
  const { name } = req.body;
  try {
    const cast = await Cast.create({ name });
    return res.status(201).json(cast);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
