import { Timestamp } from "firebase-admin/firestore";
import { translationConverter, Translation } from "../models/Translation";

// Mock Firestore snapshot data for testing
const mockSnapshotData = {
  id: "translation123",
  data: () => ({
    user_id: "user123",
    text_english: "Hello, world!",
    text_japanese: "こんにちは、世界！",
    audio_english: "https://example.com/audio/english.mp3",
    audio_japanese: "https://example.com/audio/japanese.mp3",
    created_at: Timestamp.now(), // 修正
    likes: 10,
  }),
};

// Test function to validate conversion to Firestore data format
function testToFirestore() {
  const translation: Translation = {
    translation_id: "translation123",
    user_id: "user123",
    text_english: "Hello, world!",
    text_japanese: "こんにちは、世界！",
    audio_english: "https://example.com/audio/english.mp3",
    audio_japanese: "https://example.com/audio/japanese.mp3",
    created_at: Timestamp.now(), // 修正
    likes: 10,
  };

  const firestoreData = translationConverter.toFirestore(translation);

  console.log("Test toFirestore:");
  console.log(firestoreData);
}

// Test function to validate conversion from Firestore snapshot to Translation object
function testFromFirestore() {
  const mockSnapshot = mockSnapshotData;
  const translation = translationConverter.fromFirestore(mockSnapshot as any);

  console.log("Test fromFirestore:");
  console.log(translation);
}

// Running tests
console.log("Running Translation Model Tests...");
testToFirestore();
testFromFirestore();
console.log("All tests completed.");
