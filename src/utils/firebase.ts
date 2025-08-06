// src/utils/firebase.ts
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// parse do JSON completo vindo da env var
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export const auth = admin.auth();
export const db   = admin.firestore();
export default admin;
