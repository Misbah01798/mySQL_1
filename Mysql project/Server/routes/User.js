const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { Op } = require('sequelize');

// Create a new user
router.post("/", async (req, res) => {
  const newUser = req.body;

  try {
    const alreadyUser = await User.findOne({ where: { email: newUser.email } });

    if (alreadyUser) {
      return res.send({ message: "User already exists" });
    }

    const result = await User.create({ ...newUser, timestamp: Date.now() });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Get user by email
router.get("/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const result = await User.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Update user by email
router.put("/update/:email", async (req, res) => {
  const email = req.params.email;
  const user = req.body;

  try {
    const result = await User.update(
      { ...user, timestamp: Date.now() },
      { where: { email } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

// Check if a user is an admin by email
router.get("/admin/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ admin: false });
    }
    const admin = user.role.trim().toLowerCase() === "admin";
    res.json({ admin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ error: "Error checking admin status" });
  }
});

// Promote a user to admin by ID
router.patch("/admin/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await User.update(
      { role: "admin" },
      { where: { id } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User promoted to admin successfully" });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    res.status(500).json({ error: "Error promoting user to admin" });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await User.destroy({ where: { id } });

    if (result === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
