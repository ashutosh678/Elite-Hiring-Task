import mongoose from "mongoose";

const MONGO_URI =
	process.env.MONGO_URI || "mongodb://localhost:27017/elite-hiring-task";

export const connectToDatabase = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as mongoose.ConnectOptions);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
