import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as dotenv from "dotenv";

const isFirebaseEnvironment =
  process.env.FUNCTIONS_EMULATOR || process.env.GCLOUD_PROJECT;

if (!isFirebaseEnvironment) {
  dotenv.config();
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: isFirebaseEnvironment
      ? functions.config().firebase.project_id
      : process.env.FIREBASE_PROJECT_ID,
    clientEmail: isFirebaseEnvironment
      ? functions.config().firebase.client_email
      : process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: isFirebaseEnvironment
      ? functions.config().firebase.private_key.replace(/\\n/g, "\n")
      : process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
  storageBucket: isFirebaseEnvironment
    ? functions.config().firebase.storage_bucket
    : process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();
const storage = admin.storage().bucket();
const auth = admin.auth();

export { db, storage, auth };
