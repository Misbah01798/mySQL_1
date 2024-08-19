const { FOREIGNKEYS } = require("sequelize/lib/query-types");

// models/Cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
        products_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add any other fields you need for your cart items
  });

  return Cart;
};
