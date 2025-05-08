import mongoose, { Schema, Document } from "mongoose";
import { Plan } from "../enum/Plan.enum";

interface ICompany extends Document {
	name: string;
	plan: Plan;
	usageLimit: number;
}

const CompanySchema: Schema = new Schema({
	name: { type: String, required: true },
	plan: { type: String, enum: Object.values(Plan), required: true },
	usageLimit: { type: Number, required: true },
});

export default mongoose.model<ICompany>("Company", CompanySchema);
