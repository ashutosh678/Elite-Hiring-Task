import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { GoogleGeminiService } from "../services/googleGemini.service";
import User from "../models/User.model";
import UsageLog from "../models/UsageLog.model";
import { Plan } from "../enum/Plan.enum";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { HuggingFaceSummarizerService } from "../services/huggingFaceSummarizer.service";

const googleGeminiService = new GoogleGeminiService();
const huggingFaceSummarizerService = new HuggingFaceSummarizerService();
export const useTool = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	const { toolName, prompt } = req.body;

	try {
		logger.info("Received request to use tool:", toolName);

		if (!req.user || !req.user._id) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const user = await User.findById(req.user._id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const usageLimits = {
			[Plan.Free]: 100,
			[Plan.Pro]: 500,
			[Plan.Enterprise]: Infinity,
		};

		const currentUsage = await UsageLog.countDocuments({
			userId: req.user._id,
		});
		if (currentUsage >= usageLimits[user.plan]) {
			res.status(403).json({ message: "Usage limit exceeded" });
			return;
		}

		let aiResponse;
		if (toolName === "summarizer") {
			// aiResponse = await googleGeminiService.generateText(prompt);
			aiResponse = await huggingFaceSummarizerService.summarizeText(prompt);
		} else {
			aiResponse = "AI response simulation for " + toolName;
		}

		const usageLog = new UsageLog({
			userId: req.user._id,
			toolName,
			prompt,
			aiResponse,
		});
		await usageLog.save();

		logger.info("Tool used successfully:", toolName);

		res.status(200).json({ aiResponse });
	} catch (error) {
		logger.error("Error using tool:", error);
		res.status(500).json({ message: "Internal server error", error });
	}
};
