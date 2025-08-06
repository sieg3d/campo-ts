import { Request, Response, NextFunction } from "express";
import { auth } from "../utils/firebase";

export interface AuthRequest extends Request {
  uid?: string;
  email?: string;
  admin?: boolean;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
    const token = header.split(" ")[1];
    const decoded = await auth.verifyIdToken(token);
    req.uid = decoded.uid;
    req.email = decoded.email;
    req.admin = decoded.admin || false;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
