import { GoogleGenAI } from "@google/genai";
import { logger } from "../utils/logger";

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

export class GoogleGeminiService {
	private ai: GoogleGenAI;

	constructor() {
		if (!GEMINI_API_KEY) {
			logger.error("Gemini API key is missing");
			throw new Error("Gemini API key is missing");
		}
		this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
	}

	public async generateText(prompt: string): Promise<string> {
		try {
			logger.info(
				"Sending request to Google Gemini API for text generation..."
			);

			const response = await this.ai.models.generateContent({
				model: "gemini-2.0-flash",
				contents: prompt,
				config: {
					responseMimeType: "application/json",
				},
			});

			logger.info("Received response from Google Gemini API", response);

			if (
				!response ||
				!response.candidates ||
				response.candidates.length === 0
			) {
				logger.error("No text generated from Gemini API");
				throw new Error("No text generated from Gemini API");
			}

			let generatedText = response.candidates[0].content!.parts![0].text!;
			logger.info("Text generated:", generatedText);

			const summaryMatch = generatedText.match(/"summary":\s*"([^"]+)"/);
			const summary = summaryMatch ? summaryMatch[1] : generatedText;

			return summary;
		} catch (error) {
			logger.error("Error generating text with Google Gemini", error);
			throw new Error("Error generating text with Google Gemini");
		}
	}
}
