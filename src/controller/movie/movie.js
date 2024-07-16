import { Movie } from "../../Model/association.js";
import { containerClient } from "../../config/azureConfig.js";
import { Op } from "sequelize";
import redis from "../../config/redisConfig.js";
export const getMovies = async (req, res) => {
  const { filter, sort, search, page, limit } = req.query;

  // build where clause for filtering and searching
  const where = {};

  // create a unique key for each request
  const cacheKey = `movies:${filter || ""}:${sort || "none"}:${
    search || "none"
  }:page${page}:limit${limit}`;

  try {
    // check if the key exists in the cache
    const cachedMovies = await redis.get(cacheKey);
    if (cachedMovies) {
      return res.status(200).json(JSON.parse(cachedMovies));
    }

    if (filter) {
      where.categoryID = filter;
    }

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    // build order clause for sorting
    const order = [];
    if (sort) {
      const [sortField, setSortOrderField = "ASC"] = sort.split(":"); // Allow user to specify sort order
      order.push([sortField, setSortOrderField.toUpperCase()]);
    }

    // build pagination
    const offset = page ? (page - 1) * limit : 0;

    const { rows: movies, count } = await Movie.findAndCountAll({
      where,
      order,
      offset,
      limit: limit ? parseInt(limit) : undefined,
    });

    const responseData = {
      movies,
      total: count,
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
    };

    // store the data in the cache
    await redis.set(cacheKey, JSON.stringify(responseData), "EX", 3600);

    res.status(200).json({
      movies,
      total: count,
      page,
      totalPage: Math.ceil(count / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMovieID = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    return res.status(200).send(movie);
  } catch (err) {
    throw new Error(err);
  }
};
export const createMovie = async (req, res) => {
  const { title, description, min_age, categoryID, release_year, premium } =
    req.body;

  const thumbnail = req.file;
  try {
    const blobName = `${Date.now()}-${thumbnail.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file buffer with specified length
    await blockBlobClient.uploadData(thumbnail.buffer, {
      blobHTTPHeaders: { blobContentType: thumbnail.mimetype },
      contentLength: thumbnail.size,
    });

    const thumbnailURL = blockBlobClient.url;

    const newMovie = await Movie.create({
      title,
      description,
      min_age,
      thumbnail: thumbnailURL,
      categoryID,
      release_year,
      premium,
    });
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, min_age, categoryID, release_year, premium } =
    req.body;

  const thumbnail = req.file;

  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.title = title;
    movie.description = description;
    movie.min_age = min_age;
    movie.categoryID = categoryID;
    movie.release_year = release_year;
    movie.premium = premium;

    if (thumbnail) {
      if (movie.thumbnail) {
        // delete the old thumbnail
        const blobName = movie.thumbnail.split("/").pop();
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.delete();
      }
      // upload the new thumbnail
      const blobName = `${Date.now()}-${thumbnail.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const uploadOptions = {
        blobHTTPHeaders: { blobContentType: thumbnail.mimetype },
        contentLength: thumbnail.size,
      };

      await blockBlobClient.uploadData(thumbnail.buffer, uploadOptions);

      movie.thumbnail = blockBlobClient.url;
    }
    await movie.save();
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    await movie.destroy();
    res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
