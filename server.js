import express from "express";
import cors from "cors";
import "dotenv/config";

import ConnectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

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
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;