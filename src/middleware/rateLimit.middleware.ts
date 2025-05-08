import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 5, // Limit each IP to 5 requests per windowMs
	handler: (req, res) => {
		res
			.status(429)
			.json({ message: "Too many requests, please try again later." });
	},
});

export const abuseDetection = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 30, // Limit each IP to 30 requests per windowMs
	handler: (req, res) => {
		res.status(429).json({ message: "Abuse detected, please slow down." });
	},
});
