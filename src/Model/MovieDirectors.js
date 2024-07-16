import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const MovieDirector = sequelize.define("MovieDirector", {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  director_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

export default MovieDirector;
