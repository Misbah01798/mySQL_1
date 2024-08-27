const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    console.log(customers); // Log the result to ensure it's returning data correctly
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error); // Log the detailed error
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new customer
router.post("/", async (req, res) => {
  try {
    const customerData = req.body;
    console.log('Received data:', customerData); // Logs the received data
    const newCustomer = await Customer.create(customerData);
    res.status(201).json({ acknowledged: true, customer: newCustomer });
  } catch (error) {
    console.error("Error creating customer:", error); // Log the detailed error
    res.status(400).json({
      error: error.message,
      details: error.errors ? error.errors.map(err => err.message) : [],
    });
  }
});

// Delete a specific customer by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Customer.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error); // Log the detailed error
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a specific customer by ID
router.put("/:id", async (req, res) => {
  const customerData = req.body;
  const id = req.params.id;

  try {
    const [updated] = await Customer.update(customerData, { where: { id }, returning: true });
    if (!updated) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const updatedCustomer = await Customer.findOne({ where: { id } });
    console.log(updatedCustomer); // Log the updated customer data
    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error); // Log the detailed error
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
