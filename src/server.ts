import express from "express";
import { connectToDatabase } from "./database";
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv";
import companyRoutes from "./routes/company.route";
import toolRoutes from "./routes/tool.routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
	origin: "*", // In production, replace with your actual frontend domain
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	maxAge: 86400, // 24 hours
};

// Middleware
app.use(cors(corsOptions));
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
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
