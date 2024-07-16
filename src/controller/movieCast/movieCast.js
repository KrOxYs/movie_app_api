import { Cast, Movie } from "../../Model/association.js";

export const getMovieCast = async (req, res) => {
  const { movie_id } = req.params;
  try {
    const movie = await Movie.findByPk(movie_id, {
      include: Cast,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie.Casts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMovieCast = async (req, res) => {
  const { movie_id } = req.params;
  const { castNames } = req.body;

  try {
    const movie = await Movie.findByPk(movie_id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const cast = await Cast.findAll({ where: { name: castNames } });

    if (cast.length !== castNames.length) {
      return res.status(404).json({ message: "one or more cast not found" });
    }

    await movie.addCasts(cast);
    return res.status(201).json({ message: "Movie cast added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
