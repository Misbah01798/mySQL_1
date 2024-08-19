const express = require('express');
const router = express.Router();
const { News } = require('../models');

// Get all news
router.get("/", async (req, res) => {
  try {
    const result = await News.findAll();
    console.log(result); // Log the result to ensure it's returning data correctly
    res.json(result);
  } catch (error) {
    console.error("Error fetching news:", error); // Log the detailed error
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newsData = req.body;
    const newNews = await News.create(newsData);
    res.json({ acknowledged: true, news: newNews });
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a specific news item by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await News.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error); // Log the detailed error
    res.status(500).json({ error: "Internal server error" });
  }
});


// Update a specific news item by ID
router.put("/:id", async (req, res) => {
  const newsData = req.body;
  const id = req.params.id;

  try {
    const [updated] = await News.update(newsData, { where: { id }, returning: true });
    if (!updated) {
      return res.status(404).json({ message: "News not found" });
    }
    const updatedNews = await News.findOne({ where: { id } });
    console.log(updatedNews); // Log the updated news data
    res.json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error); // Log the detailed error
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
