import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Director = sequelize.define("Director", {
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

export default Director;
