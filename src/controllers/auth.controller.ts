import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.model";
import Company from "../models/Company.model";
import TokenBlacklist from "../models/TokenBlacklist.model";
import dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY || "your_jwt_secret_key";

export const signup = async (req: Request, res: Response): Promise<void> => {
	const { name, email, password, role, companyId } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			email,
			password: hashedPassword,
			role,
			companyId,
		});
		await user.save();

		const company = await Company.findById(companyId);
		if (company) {
			company.users.push(user._id as Types.ObjectId);
			await company.save();
		} else {
			res.status(404).json({ message: "Company not found" });
			return;
		}

		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(401).json({ message: "Invalid email or password" });
			return;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			res.status(401).json({ message: "Invalid email or password" });
			return;
		}

		const token = jwt.sign({ _id: user._id, role: user.role }, secretKey, {
			expiresIn: "1h",
		});
		res.json({ user, token });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};

export const logout = async (req: Request, res: Response): Promise<void> => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (token) {
		const decoded = jwt.decode(token) as { exp: number };
		const expiresAt = new Date(decoded.exp * 1000);

		const blacklistedToken = new TokenBlacklist({ token, expiresAt });
		await blacklistedToken.save();
	}

	res.json({
		message: "Logged out successfully. Please clear your token from storage.",
	});
};
