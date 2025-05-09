import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: string;
	companyId: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company",
		required: true,
	},
});

export default mongoose.model<IUser>("User", UserSchema);
