const express = require('express');
const router = express.Router();
const { Cart } = require('../models');
const { Op } = require('sequelize');

// Get all cart items for a specific user by email
router.get("/carts", async (req, res) => {
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
router.post("/carts", async (req, res) => {
  const item = req.body;
  try {
    const result = await Cart.create(item);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Error adding item to cart" });
  }
});

// Delete an item from the cart by ID
router.delete("/carts/:id", async (req, res) => {
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
router.delete("/clear-cart", async (req, res) => {
  const { userEmail } = req.body;
  try {
    await Cart.destroy({ where: { email: userEmail } });
    res.status(200).send("Cart cleared successfully");
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).send("Internal server error");
  }
});

// Get a specific cart item by ID
router.get("/carts/:id", async (req, res) => {
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
