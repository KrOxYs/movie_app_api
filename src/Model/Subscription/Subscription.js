import { DataTypes } from "sequelize";
import sequelize from "../../config/dbConfig.js";

const Subscription = sequelize.define("Subscription", {
  order_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0,
    },
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  },
  payment_type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [["qris", "gopay", "cstore"]],
    },
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  transaction_status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  qr_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
      notEmpty: false,
    },
  },
  cstore_code: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: false,
    },
  },
  created_at: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Subscription;
