const express = require('express');
const router = express.Router();
const { Order } = require('../models'); // Ensure you're importing the Order model correctly

// Create a new order
router.post('/', async (req, res) => {
  const { cart, email, name, date, address, status } = req.body;

  try {
    // Validate cart data
    if (!Array.isArray(cart)) {
      throw new Error("Cart data must be an array");
    }

    // Create the order in the database
    const order = await Order.create({
      cart,
      email,
      name,
      date,
      address,
      status,
    });

    console.log("Inserted order ID:", order.id);
    res.json({ acknowledged: true, insertedId: order.id });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Error saving data" });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll(); // Order.findAll should work if Order is a valid Sequelize model
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findByPk(id); // Using findByPk to find by primary key
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/email/:email", async (req, res) => {  // Updated path to avoid conflict with ID route
  const email = req.params.email;

  try {
    const result = await Order.findOne({ where: { email } });
    if (!result) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching order by email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
