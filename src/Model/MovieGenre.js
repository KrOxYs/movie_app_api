import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const MovieGenre = sequelize.define("MovieGenre", {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  genre_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

export default MovieGenre;
