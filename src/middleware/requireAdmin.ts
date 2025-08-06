import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.uid) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  if (!req.admin) {
    return res.status(403).json({ error: "Acesso de administrador requerido" });
  }
  next();
};
