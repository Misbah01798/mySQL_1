// models/Invoice.js
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceData: {
      type: DataTypes.JSON, // Assuming `invoiceData` is a JSON object or array
      allowNull: false,
    },
    cart: {
      type: DataTypes.JSON, // Assuming `cart` is a JSON object or array
      allowNull: true,      // Optional, depending on your use case
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Invoice;
};
