import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../enum/Role.enum";
import { Plan } from "../enum/Plan.enum";

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: Role;
	plan: Plan;
	companyId: mongoose.Types.ObjectId;
	usageCount: number;
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: Object.values(Role), required: true },
	plan: { type: String, enum: Object.values(Plan), required: true },
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company",
		required: true,
	},
	usageCount: { type: Number, default: 0 },
});

export default mongoose.model<IUser>("User", UserSchema);
