// src/config/openai.ts

import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";
import OpenAI from "openai";
import * as functions from "firebase-functions";

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      messages: [
        /* {"role": "system", "content": "You are a helpful assistant."}, */
        { role: "user", content: prompt },
      ],
    });

    return response.choices.map((choice) => choice.message?.content?.trim());
  } catch (error) {
    functions.logger.error("Error generating translations:", error);
    throw new Error("Failed to generate translations");
  }
};

export const generateSpeech = async (text: string) => {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const speechFile = path.resolve("./speech.mp3");
    const buffer = Buffer.from(await mp3.arrayBuffer());

    await fs.promises.writeFile(speechFile, buffer);

    return speechFile; // Return the path of the saved audio file
  } catch (error) {
    functions.logger.error("Error generating speech:", error);
    throw new Error("Failed to generate speech");
  }
};
