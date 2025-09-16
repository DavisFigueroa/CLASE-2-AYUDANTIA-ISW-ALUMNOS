import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { 
  getPublicProfile, 
  getPrivateProfile,
  updateProfile,    // nueva función
  deleteProfile     // nueva función
} from "../controllers/profile.controller.js";

const router = Router();

// Perfil público (cualquiera puede ver)
router.get("/public", getPublicProfile);

// Perfil privado (solo usuario autenticado)
router.get("/private", authMiddleware, getPrivateProfile);

// Modificar perfil propio (PATCH /private)
router.patch("/private", authMiddleware, updateProfile);

// Eliminar perfil propio (DELETE /private)
router.delete("/private", authMiddleware, deleteProfile);

export default router;
