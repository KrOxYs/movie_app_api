import { Sequelize } from "sequelize";
import "dotenv/config";
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, "", {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

export default sequelize;