const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const itemsRouter = require("./routes/items");
const statsRouter = require("./routes/stats");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" })); // Prevent large payloads
app.use(morgan("dev"));

// Routes
app.use("/api/items", itemsRouter);
app.use("/api/stats", statsRouter);

// Catch-all for unknown routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(port, () =>
  console.log(`✅ Backend running on http://localhost:${port}`)
);
