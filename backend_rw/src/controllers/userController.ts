import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { User } from '../models';
import bcrypt from 'bcrypt';
import { encrypt, decrypt } from '../utils/encryption';

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

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

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Contraseña actual incorrecta' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
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

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'No tienes permisos para ver todos los usuarios' });
      return;
    }

    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    const decryptedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      username: user.username,
      rut: decrypt(user.rut),
      region: decrypt(user.region),
      comuna: decrypt(user.comuna),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    console.log(`✅ Listando ${users.length} usuarios (Admin: ${req.user.email})`);

    res.json({
      message: 'Usuarios obtenidos exitosamente',
      users: decryptedUsers
    });
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (req.user?.id !== parseInt(id) && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'No tienes permisos para ver este usuario' });
      return;
    }

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
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        rut: decrypt(user.rut),
        region: decrypt(user.region),
        comuna: decrypt(user.comuna),
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, email, rut, region, comuna, role } = req.body;

    if (req.user?.id !== parseInt(id) && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'No tienes permisos para actualizar este usuario' });
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'El email ya está en uso' });
        return;
      }
    }

    const updateData: any = {
      username: username || user.username,
      email: email || user.email,
    };

    if (rut) updateData.rut = encrypt(rut);
    if (region) updateData.region = encrypt(region);
    if (comuna) updateData.comuna = encrypt(comuna);

    if (req.user?.role === 'admin') {
      if (role && ['user', 'admin', 'guest'].includes(role)) {
        updateData.role = role;
      }
    }

    await user.update(updateData);

    console.log(`✅ Usuario actualizado: ${user.email}`);

    res.json({
      message: 'Usuario actualizado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        rut: decrypt(user.rut),
        region: decrypt(user.region),
        comuna: decrypt(user.comuna),
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'No tienes permisos para eliminar usuarios' });
      return;
    }

    if (req.user?.id === parseInt(id)) {
      res.status(400).json({ message: 'No puedes eliminarte a ti mismo' });
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const userEmail = user.email;
    await user.destroy();

    console.log(`✅ Usuario eliminado: ${userEmail} (por Admin: ${req.user.email})`);

    res.json({
      message: 'Usuario eliminado exitosamente',
      userId: id,
      deletedUser: userEmail
    });
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
