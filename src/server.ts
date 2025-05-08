import express from "express";
import { connectToDatabase } from "./database";
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv";
import companyRoutes from "./routes/company.route";
import toolRoutes from "./routes/tool.routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

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
