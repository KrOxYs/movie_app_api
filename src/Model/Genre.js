import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Genre = sequelize.define("Genre", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default Genre;
