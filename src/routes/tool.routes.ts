import express from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { useTool } from "../controllers/tool.controller";
import { checkUsageLimit } from "../middleware/usageLimit.middleware";
import { apiLimiter, abuseDetection } from "../middleware/rateLimit.middleware";

const router = express.Router();

router.post(
	"/use-tool",
	authenticateJWT,
	checkUsageLimit,
	apiLimiter,
	abuseDetection,
	useTool
);

export default router;
