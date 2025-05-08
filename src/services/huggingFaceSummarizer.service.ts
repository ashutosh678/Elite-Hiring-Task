import { InferenceClient } from "@huggingface/inference";
import { logger } from "../utils/logger";

export class HuggingFaceSummarizerService {
	private client: InferenceClient;

	constructor() {
		if (!process.env.HUGGING_FACE_API_KEY) {
			logger.error("Hugging Face API key is missing");
			throw new Error("Hugging Face API key is missing");
		}

		this.client = new InferenceClient(process.env.HUGGING_FACE_API_KEY!);
	}

	public async summarizeText(
		text: string,
		maxLength: number = 150,
		minLength: number = 50
	): Promise<string> {
		try {
			logger.info("Summarizing text with Hugging Face model...");

			const result = await this.client.summarization({
				model: "T-Systems-onsite/mt5-small-sum-de-en-v2",
				inputs: text,
				parameters: {
					max_length: maxLength,
					min_length: minLength,
					do_sample: false,
				},
				provider: "hf-inference",
			});

			logger.info("Text summarized successfully.");
			return result.summary_text;
		} catch (error) {
			logger.error("Error summarizing text:", error);

			// More detailed error logging
			if (error instanceof Error) {
				logger.error(`Detailed error: ${error.message}`);
				logger.error(`Error stack: ${error.stack}`);
			}

			throw new Error(
				`Failed to summarize text: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	}
}
