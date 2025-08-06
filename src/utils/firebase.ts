// src/utils/firebase.ts
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY
} = process.env;

if (!FIREBASE_PROJECT_ID ||
    !FIREBASE_CLIENT_EMAIL ||
    !FIREBASE_PRIVATE_KEY) {
  throw new Error("Variáveis de ambiente do Firebase não configuradas");
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    // reconstrói as quebras de linha corretamente
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

export const auth = admin.auth();
export const db   = admin.firestore();
export default admin;
