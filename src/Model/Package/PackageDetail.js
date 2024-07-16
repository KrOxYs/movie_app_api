import { DataTypes } from "sequelize";
import sequelize from "../../config/dbConfig.js";

const PackageDetail = sequelize.define("PackageDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default PackageDetail;
