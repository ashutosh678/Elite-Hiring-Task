import mongoose, { Schema, Document } from "mongoose";

interface IUsageLog extends Document {
	userId: mongoose.Types.ObjectId;
	toolName: string;
	prompt: string;
	aiResponse: string;
	timestamp: Date;
}

const UsageLogSchema: Schema = new Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	toolName: { type: String, required: true },
	prompt: { type: String, required: true },
	aiResponse: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IUsageLog>("UsageLog", UsageLogSchema);
