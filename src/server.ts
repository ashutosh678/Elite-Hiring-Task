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

// Add more detailed logging
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	console.log("Headers:", req.headers);
	next();
});

// CORS Configuration
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

app.get("/", (req, res) => {
	res.send("Hello World");
});

// Add a test route
app.get("/api/health", (req, res) => {
	console.log("Health check endpoint hit");
	res.json({
		status: "ok",
		timestamp: new Date().toISOString(),
		host: HOST,
		port: PORT,
	});
});

// Use auth routes
app.use("/api/auth", authRoutes);

// Use company routes
app.use("/api/company", companyRoutes);

// Use tool routes
app.use("/api/tool", toolRoutes);

// Error handling middleware
app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error("Error:", err);
		res.status(500).json({ error: err.message });
	}
);

// Start server with error handling
const server = app
	.listen(PORT, HOST, () => {
		console.log(`Server is running on http://${HOST}:${PORT}`);
		console.log("CORS is enabled for all origins");
	})
	.on("error", (err) => {
		console.error("Server failed to start:", err);
	});

// Handle process termination
process.on("SIGTERM", () => {
	console.log("SIGTERM received. Shutting down gracefully...");
	server.close(() => {
		console.log("Server closed");
		process.exit(0);
	});
});
