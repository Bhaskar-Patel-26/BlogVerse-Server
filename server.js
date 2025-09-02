import express from "express";
import cors from "cors";
import "dotenv/config";

import ConnectDB from "./configs/db.js";

const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
ConnectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;