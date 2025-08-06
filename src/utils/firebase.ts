// src/utils/firebase.ts
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Extrai do env
const projectId   = process.env.FIREBASE_PROJECT_ID!;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
// Converte os '\n' literais de volta em quebras de linha reais
const privateKey  = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "🚨 Variáveis de ambiente do Firebase não configuradas corretamente. " +
    "Verifique FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY."
  );
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

export const auth = admin.auth();
export const db   = admin.firestore();
export default admin;
