import { DataTypes } from "sequelize";
import sequelize from "../../config/dbConfig.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
  premium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  premium_expired: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;
