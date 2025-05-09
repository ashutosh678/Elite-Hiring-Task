import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import type { ICompany } from "../models/Company.model";
import { AuthenticatedRequest } from "./auth.middleware";

export const usageLimitMiddleware = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const user = await User.findById(req.user?._id).populate<{
			companyId: ICompany;
		}>("companyId");
		if (!user || !user.companyId) {
			res.status(404).json({ message: "User or company not found" });
			return;
		}

		const company = user.companyId;
		const planLimits = {
			Free: 100,
			Pro: 500,
			Enterprise: Infinity,
		};

		const usageLimit = planLimits[company.plan as keyof typeof planLimits];
		if (company.usageCount >= usageLimit) {
			res.status(403).json({ message: "Usage limit exceeded" });
			return;
		}

		next();
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};
