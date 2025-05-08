import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import TokenBlacklist from "../models/TokenBlacklist.model";
import dotenv from "dotenv";

dotenv.config();

export interface AuthenticatedRequest extends Request {
	user?: { _id: string } & JwtPayload;
}

const secretKey = process.env.JWT_SECRET_KEY || "your_secret_key";

export const authenticateJWT = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token = req.header("Authorization")?.split(" ")[1];

	console.log("Token:", token);

	if (!token) {
		res.status(401).json({ message: "Access token is missing or invalid" });
		return;
	}

	const blacklistedToken = await TokenBlacklist.findOne({ token });
	if (blacklistedToken) {
		res.status(403).json({ message: "Token is blacklisted" });
		return;
	}

	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			console.error("JWT Verification Error:", err);
			res.status(403).json({ message: "Token is not valid" });
			return;
		}
		req.user = decoded as { _id: string } & JwtPayload;
		next();
	});
};
