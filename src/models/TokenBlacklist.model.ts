import mongoose, { Schema, Document } from "mongoose";

interface ITokenBlacklist extends Document {
	token: string;
	expiresAt: Date;
}

const TokenBlacklistSchema: Schema = new Schema({
	token: { type: String, required: true, unique: true },
	expiresAt: { type: Date, required: true },
});

export default mongoose.model<ITokenBlacklist>(
	"TokenBlacklist",
	TokenBlacklistSchema
);
