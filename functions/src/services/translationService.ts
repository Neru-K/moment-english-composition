import { openai } from "../config/openai";
import * as functions from "firebase-functions";

export const generateTranslations = async (
  text: string,
  targetLanguage: "ja" | "en"
) => {
  try {
    const prompt =
      targetLanguage === "ja"
        ? `Translate the following text to Japanese: ${text}`
        : `Translate the following text to English: ${text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices.map((choice) => choice.message?.content?.trim());
  } catch (error) {
    functions.logger.error("Error generating translations:", error);
    throw new Error("Failed to generate translations");
  }
};
