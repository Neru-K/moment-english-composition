import { db, storage, auth } from "../config/firebase";

async function testFirebase() {
  try {
    // Test Firestore by adding a document to a test collection
    const testDocRef = db.collection("testCollection").doc("testDoc");
    await testDocRef.set({ message: "Firebase Firestore is working!" });
    console.log("Firestore test passed.");

    // Test Firebase Storage by listing the files in the root directory
    const [files] = await storage.getFiles();
    console.log(
      "Storage test passed. Files:",
      files.map((file) => file.name)
    );

    // Test Firebase Authentication by listing users
    const users = await auth.listUsers();
    console.log("Auth test passed. Number of users:", users.users.length);
  } catch (error) {
    console.error("Firebase test failed:", error);
  }
}

testFirebase();
