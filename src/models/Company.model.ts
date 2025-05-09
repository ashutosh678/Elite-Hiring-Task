import mongoose, { Schema, Document } from "mongoose";
import { Plan } from "../enum/Plan.enum";

export interface ICompany extends Document {
	name: string;
	plan: string;
	usageCount: number;
	users: mongoose.Types.ObjectId[];
}

const CompanySchema: Schema = new Schema({
	name: { type: String, required: true },
	plan: { type: String, required: true },
	usageCount: { type: Number, default: 0 },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model<ICompany>("Company", CompanySchema);
