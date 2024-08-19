// models/OrderRequest.js
module.exports = (sequelize, DataTypes) => {
  const OrderRequest = sequelize.define("OrderRequest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cart: {
      type: DataTypes.JSON, // Assuming `cart` is a JSON object or array
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // Add any other necessary fields
  });

  return OrderRequest;
};
