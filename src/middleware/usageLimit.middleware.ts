import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";
import User from "../models/User.model";

export const checkUsageLimit = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const userId = req.user?._id;
	if (!userId) {
		res.status(400).json({ message: "User ID is required" });
		return;
	}

	const user = await User.findById(userId);
	if (!user) {
		res.status(404).json({ message: "User not found" });
		return;
	}

	const planLimits = {
		free: 100,
		pro: 500,
		enterprise: Infinity,
	};

	const usageLimit = planLimits[user.plan as keyof typeof planLimits];
	if (user.usageCount >= usageLimit) {
		res.status(403).json({ message: "Usage limit exceeded for your plan" });
		return;
	}

	next();
};
