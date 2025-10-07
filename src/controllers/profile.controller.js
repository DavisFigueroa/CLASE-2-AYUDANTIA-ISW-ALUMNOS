import { handleSuccess } from "../Handlers/responseHandlers.js";
import { AppDataSource } from "../config/configDB.js";
import { User } from "../entities/user.entity.js";

import { userBodyValidation } from "../../validations/user.validation.js";

// Ahora puedes usar AppDataSource.manager.findOne(...) y AppDataSource.manager.save(...)


export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

// PATCH /profile/private 
export async function updateProfile(req, res) {
  
}

// DELETE /profile/private 
export async function deleteProfile(req, res) {
  
}
