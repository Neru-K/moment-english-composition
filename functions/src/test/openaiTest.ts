// src/test/openaiTest.ts

import { generateTranslations, generateSpeech } from "../config/openai";

const runTranslationTest = async () => {
  const text = "Hello, how are you?";
  try {
    const translations = await generateTranslations(text, "ja");
    console.log("Generated Translations:", translations);
  } catch (error) {
    console.error("Translation Test Failed:", error);
  }
};

const runSpeechTest = async () => {
  const text = "Today is a wonderful day to build something people love!";
  try {
    const speechFile = await generateSpeech(text); // Remove second argument
    console.log("Speech file saved at:", speechFile);
  } catch (error) {
    console.error("Speech Test Failed:", error);
  }
};

// Call the test functions
const runTests = async () => {
  await runTranslationTest();
  await runSpeechTest();
};

runTests();
