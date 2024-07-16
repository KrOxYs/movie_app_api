import { Movie, Genre } from "../../Model/association.js";

// get movie genre
export const getMovieGenre = async (req, res) => {
  const { movie_id } = req.params;
  try {
    const movie = await Movie.findByPk(movie_id, {
      include: Genre,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie.Genres);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post movie genre

export const postMovieGenre = async (req, res) => {
  const { movie_id } = req.params;
  const { genreNames } = req.body;

  try {
    const movie = await Movie.findByPk(movie_id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const genre = await Genre.findAll({ where: { name: genreNames } });

    if (genre.length !== genreNames.length) {
      return res.status(404).json({ message: "one or more genre not found" });
    }

    await movie.addGenres(genre);
    return res.status(201).json({ message: "Movie genre added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
