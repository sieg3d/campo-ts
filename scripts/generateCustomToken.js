// scripts/generateCustomToken.js
require("dotenv").config();
const admin = require("firebase-admin");
const { resolve } = require("path");

// inicializa o SDK igual ao seu utils/firebase.ts
const serviceAccountPath = resolve(__dirname, "../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

(async () => {
  try {
    const customToken = await admin
      .auth()
      .createCustomToken("uid-do-admin", { admin: true });
    console.log("TOKEN:", customToken);
  } catch (err) {
    console.error(err);
  }
  process.exit();
})();
