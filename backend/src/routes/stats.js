const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const { mean } = require('../utils/stats');

const DATA_PATH = path.join(__dirname, '../../data/items.json');

// In-memory cache
let cachedStats = null;
let lastFetched = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds

router.get('/', async (req, res, next) => {
  const now = Date.now();

  // Serve from cache if valid
  if (cachedStats && (now - lastFetched < CACHE_DURATION)) {
    return res.json({ ...cachedStats, cached: true });
  }

  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const items = JSON.parse(raw);

    const prices = items.map(item => item.price);
    const stats = {
      total: items.length,
      averagePrice: mean(prices),
    };

    // Update cache
    cachedStats = stats;
    lastFetched = now;

    res.json({ ...stats, cached: false });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
