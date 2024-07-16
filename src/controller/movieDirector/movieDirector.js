import { Movie, Director } from "../../Model/association.js";

export const getMovieDirector = async (req, res) => {
  const { movie_id } = req.params;
  try {
    const movie = await Movie.findByPk(movie_id, {
      include: Director,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie.Directors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const postMovieDirector = async (req, res) => {
  const { movie_id } = req.params;
  const { directorNames } = req.body;

  try {
    const movie = await Movie.findByPk(movie_id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const director = await Director.findAll({ where: { name: directorNames } });

    console.log(director);

    if (director.length !== directorNames.length) {
      return res
        .status(404)
        .json({ message: "one or more director not found" });
    }
    await movie.addDirectors(director);
    return res
      .status(201)
      .json({ message: "Movie director added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
