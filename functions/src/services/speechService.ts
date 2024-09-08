import { openai } from "../config/openai";
import * as fs from "fs";
import * as path from "path";
import * as functions from "firebase-functions";

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

    return speechFile;
  } catch (error) {
    functions.logger.error("Error generating speech:", error);
    throw new Error("Failed to generate speech");
  }
};
