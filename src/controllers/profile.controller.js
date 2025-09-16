import { handleSuccess } from "../Handlers/responseHandlers.js";

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
export async function updateProfile(req, res) {
  try {
    const userId = req.user.id; // ID del usuario desde JWT
    const { email, password } = req.body;

    if (!email && !password) {
      return handleErrorClient(res, 400, "Debes enviar email o password para actualizar");
    }

    const userRepo = getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return handleErrorClient(res, 404, "Usuario no encontrado");

    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await userRepo.save(user);

    handleSuccess(res, 200, "Perfil actualizado correctamente", { email: user.email });
  } catch (error) {
    handleErrorServer(res, 500, "Error al actualizar perfil", error.message);
  }
}

// DELETE /profile/private → Eliminar perfil propio
export async function deleteProfile(req, res) {
  try {
    const userId = req.user.id; // ID del usuario desde JWT

    const userRepo = getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return handleErrorClient(res, 404, "Usuario no encontrado");

    await userRepo.remove(user);

    handleSuccess(res, 200, "Cuenta eliminada correctamente", { id: userId });
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar cuenta", error.message);
  }
}
