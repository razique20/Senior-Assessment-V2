const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../../data/items.json");

// Utility to read data asynchronously
async function readData() {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

// Utility to write data asynchronously
async function writeData(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET /api/items?q=search&page=1&limit=10
router.get("/", async (req, res, next) => {
  try {
    const data = await readData();
    let results = data;
    const { q, page = 1, limit = 10 } = req.query;

    // Server-side search
    if (q) {
      const query = q.toLowerCase();
      results = results.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    }

    // Pagination logic
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const start = (pageNum - 1) * limitNum;
    const paginatedResults = results.slice(start, start + limitNum);

    res.json({
      total: results.length,
      page: pageNum,
      limit: limitNum,
      items: paginatedResults,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const data = await readData();
    const item = data.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", async (req, res, next) => {
  try {
    const item = req.body;

    // Optional: Validate payload here
    const data = await readData();
    item.id = Date.now(); // Simple ID generation
    data.push(item);

    await writeData(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
