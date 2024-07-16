import { DataTypes } from "sequelize";
import sequelize from "../../config/dbConfig.js";

const Voucher = sequelize.define("Voucher", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expired: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Voucher;
