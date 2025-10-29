import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { User } from '../models';
import bcrypt from 'bcrypt';  // ✅ Agregar esta importación al inicio

// PUT /api/users/:id/change-password - Cambiar contraseña
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Validaciones
    if (!currentPassword || !newPassword) {
      res.status(400).json({ message: 'Contraseña actual y nueva son requeridas' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres' });
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Verificar contraseña actual
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Contraseña actual incorrecta' });
      return;
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await user.update({ password: hashedPassword });

    console.log(`✅ Contraseña actualizada para: ${user.email}`);

    res.json({
      message: 'Contraseña actualizada exitosamente'
    });
  } catch (error) {
    console.error('❌ Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error al cambiar contraseña' });
  }
};

// GET /api/users - Listar todos los usuarios
export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // No enviar contraseñas
    });

    console.log(`✅ Listando ${users.length} usuarios`);

    res.json({
      message: 'Usuarios obtenidos exitosamente',
      users
    });
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// GET /api/users/:id - Obtener un usuario por ID
export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    console.log(`✅ Usuario obtenido: ${user.email}`);

    res.json({
      message: 'Usuario obtenido exitosamente',
      user
    });
  } catch (error) {
    console.error('❌ Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// PUT /api/users/:id - Actualizar un usuario
export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, email, rut, region, comuna } = req.body;  // ✅ AGREGAR email aquí

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // ✅ Actualizar campos incluyendo email (password sigue sin actualizarse por seguridad)
    await user.update({
      username: username || user.username,
      email: email || user.email,  // ✅ AGREGAR esta línea
      rut: rut || user.rut,
      region: region || user.region,
      comuna: comuna || user.comuna
    });

    console.log(`✅ Usuario actualizado: ${user.email}`);

    res.json({
      message: 'Usuario actualizado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        rut: user.rut,
        region: user.region,
        comuna: user.comuna
      }
    });
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// DELETE /api/users/:id - Eliminar un usuario
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const userEmail = user.email;
    await user.destroy();

    console.log(`✅ Usuario eliminado: ${userEmail}`);

    res.json({
      message: 'Usuario eliminado exitosamente',
      userId: id
    });
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
