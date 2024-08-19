const express = require('express');
const router = express.Router();
const { Invoice } = require('../models');

// Create a new invoice
router.post("/invoices", async (req, res) => {
  const { email, invoiceData, cart } = req.body;

  try {
    await Invoice.create({ email, invoiceData, cart });
    res.status(200).send("Invoice generated successfully");
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).send("Internal server error");
  }
});

// Get a specific invoice by ID
router.get("/invoices/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Invoice.findOne({ where: { id } });
    if (!result) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get invoice by email
router.get("/invoice/:email", async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is missing or invalid" });
  }

  try {
    const result = await Invoice.findOne({ where: { email } });
    if (!result) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching invoice data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all invoices
router.get("/invoice", async (req, res) => {
  try {
    const result = await Invoice.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
