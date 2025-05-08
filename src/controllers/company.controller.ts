import { Request, Response } from "express";
import Company from "../models/Company.model";
import { Plan } from "../enum/Plan.enum";

export const createCompany = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name, plan } = req.body;

	try {
		const usageLimits = {
			[Plan.Free]: 100,
			[Plan.Pro]: 500,
			[Plan.Enterprise]: Infinity,
		};

		const usageLimit = usageLimits[plan as Plan];
		const company = new Company({ name, plan, usageLimit });
		await company.save();

		res.status(201).json({ message: "Company created successfully", company });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
};
