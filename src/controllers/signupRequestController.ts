// src/controllers/signupRequestController.ts
import admin from "firebase-admin";
import { Request, Response } from "express";
import { signupRequestSchema } from "../schemas/signupRequestSchema";
import type { ZodIssue } from "zod";
import { db } from "../utils/firebase";

export const createSignupRequest = async (req: Request, res: Response) => {
  const parsed = signupRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((e: ZodIssue) => ({
      path: e.path.join("."),
      message: e.message,
    }));
    return res.status(400).json({ error: "Validação falhou", details: errors });
  }

  // grava no Firestore
  const docRef = await db
    .collection("signupRequests")
    .add({
      ...parsed.data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

  return res
    .status(201)
    .json({
      message: "Signup request criada com sucesso",
      id: docRef.id,
      data: parsed.data,
    });
};
