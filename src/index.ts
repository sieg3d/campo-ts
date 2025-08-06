// import express from "express";

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get("/", (_req, res) => {
//   res.send("API rodando com TypeScript!");
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import signupRoutes from "./routes/signupRequestRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Monta as rotas sob /api
app.use("/api", signupRoutes);

// Tratamento global de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
