// routes/customers.js
const express = require('express');
const router = express.Router();
const { Customer } = require('../models'); // Import the Customer model

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Customer.destroy({ where: { id } });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a customer by ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Customer.update(req.body, { where: { id } });
    if (updated) {
      const updatedCustomer = await Customer.findOne({ where: { id } });
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
