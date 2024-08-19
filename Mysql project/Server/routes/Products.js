const express = require('express');
const router = express.Router();
const { Products } = require('../models');

// Get all products
router.get("/products", async (req, res) => {
  try {
    const result = await Products.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Search for products by name
router.get("/search", async (req, res) => {
  const { term } = req.query;
  if (!term) {
    return res.status(400).json({ error: "Search term is required" });
  }
  try {
    const results = await Products.findAll({
      where: {
        products_name: {
          [Op.like]: `%${term}%`
        }
      }
    });
    res.json(results);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Error searching products" });
  }
});

// Get products by category
router.get("/products/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const result = await Products.findAll({ where: { category } });
    res.json(result);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Error fetching products by category" });
  }
});

// Create a new product
router.post("/products", async (req, res) => {
  const productData = req.body;
  try {
    const result = await Products.create(productData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
});

// Update a product by ID
router.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;
  
  try {
    const result = await Products.update(productData, {
      where: { id: productId }
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete a product by ID
router.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await Products.destroy({ where: { id: productId } });

    if (result === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
