import express from "express";
import cors from "cors";
import searchRoutes from "./routes/searchRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "YRefine API is running" });
});

app.use("/api", searchRoutes);

export default app;
