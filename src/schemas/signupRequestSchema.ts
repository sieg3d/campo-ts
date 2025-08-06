import { z } from "zod";

export const signupRequestSchema = z.object({
  nome: z.string().min(1),
  sobrenome: z.string().min(1),
  email: z.string().email(),
  setor: z.string().min(1),
});
