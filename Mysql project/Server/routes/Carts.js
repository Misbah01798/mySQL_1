const express = require('express');
const router = express.Router();
const { Cart } = require('../models');
const { Op } = require('sequelize');

// Get all cart items for a specific user by email
router.get("/", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.send([]);
  }
  try {
    const result = await Cart.findAll({ where: { email } });
    res.json(result);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Error fetching cart items" });
  }
});

// Add a new item to the cart
router.post("/", async (req, res) => {
  try {
    const result = await Cart.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Error adding item to cart" });
  }
});


// Delete an item from the cart by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Cart.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Error deleting cart item" });
  }
});
// Clear all items from a user's cart
router.delete("/", async (req, res) => {
  const { userEmail } = req.body;
  console.log('Received request to clear cart for email:', userEmail);
  try {
    const deletedItems = await Cart.destroy({ where: { email: userEmail } });
    if (deletedItems > 0) {
      console.log('Deleted items count:', deletedItems);
      res.status(200).json({ message: "Cart cleared successfully" });
    } else {
      res.status(404).json({ message: "No items found in cart" });
    }
  } catch (error) {
  if (error instanceof Sequelize.ValidationError) {
    console.error("Validation error:", error);
    return res.status(400).json({ message: "Validation error", details: error.errors });
  } else if (error instanceof Sequelize.DatabaseError) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Database error" });
  } else {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
});

// Get a specific cart item by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Cart.findOne({ where: { id } });
    if (!result) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching cart item:", error);
    res.status(500).json({ error: "Error fetching cart item" });
  }
});

module.exports = router;
