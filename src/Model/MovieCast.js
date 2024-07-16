import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const MovieCast = sequelize.define("MovieCast", {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cast_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

export default MovieCast;
