import express from "express";
import { connectToDatabase } from "./database";
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv";
import companyRoutes from "./routes/company.route";
import toolRoutes from "./routes/tool.routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "0.0.0.0";

// CORS Configuration
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

// Add request logging
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
	next();
});

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

app.get("/", (req, res) => {
	res.send("Hello World");
});

// Use auth routes
app.use("/auth", authRoutes);

// Use company routes
app.use("/company", companyRoutes);

// Use tool routes
app.use("/tool", toolRoutes);

// Start server
app.listen(PORT, HOST, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
	console.log("CORS is enabled for all origins");
});
