import express from "express";
import cors from "cors";
import helmet from "helmet";
import statsRouter from "./routes/stats";
import customerStoriesRouter from "./routes/customerStories";
import demoRequestRouter from "./routes/demoRequest";
import contentRouter from "./routes/content";
import authRouter from "./routes/authRoute";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/stats", statsRouter);
app.use("/api/customer-stories", customerStoriesRouter);
app.use("/api/demo-request", demoRequestRouter);
app.use("/api/content", contentRouter);
app.use("/api/auth", authRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Thndr API server running on port ${PORT}`);
});

export default app;
