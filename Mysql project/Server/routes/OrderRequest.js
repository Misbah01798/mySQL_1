const express = require('express');
const router = express.Router();
const { OrderRequest } = require('../models');

// Place a new order request
router.post("/", async (req, res) => {
  const { cart, userEmail } = req.body;
  
  try {
    await OrderRequest.create({ cart, userEmail });
    res.status(200).send("Order placed successfully");
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send("Internal server error");
  }
});

// Get all order requests
router.get("/", async (req, res) => {
  try {
    const result = await OrderRequest.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error fetching order requests:", error);
    res.status(500).json({ error: "Error fetching order requests" });
  }
});

// Get a specific order request by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await OrderRequest.findOne({ where: { id } });
    if (!result) {
      return res.status(404).json({ message: "Order request not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching order request:", error);
    res.status(500).json({ error: "Error fetching order request" });
  }
});

module.exports = router;
