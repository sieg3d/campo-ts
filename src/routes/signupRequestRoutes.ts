// src/routes/signupRequestRoutes.ts
import { Router } from "express";
import { createSignupRequest } from "../controllers/signupRequestController";
import { getSignupRequests } from "../controllers/getSignupRequestsController";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticate } from "../middleware/auth";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Rota pública para criação de pedido de cadastro
router.post(
  "/signup-request",
  asyncHandler(createSignupRequest)
);

// Rota protegida (autenticado + admin) para listar todos
router.get(
  "/signup-requests",
  authenticate,
  requireAdmin,
  asyncHandler(getSignupRequests)
);

export default router;
