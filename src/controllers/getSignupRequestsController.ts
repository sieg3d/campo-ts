// src/controllers/getSignupRequestsController.ts
import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { db } from "../utils/firebase";

export const getSignupRequests = async (req: AuthRequest, res: Response) => {
  const snapshot = await db
    .collection("signupRequests")
    .orderBy("createdAt", "desc")
    .get();

  const requests = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.json({ data: requests });
};
