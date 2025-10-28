import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../models';

const router = Router();

// POST: Crear un nuevo usuario (registro)
router.post('/', async (req, res) => {
  try {
    const { email, password, username, rut, region, comuna } = req.body;
    if (!email || !password || !username || !rut || !region || !comuna) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      email,
      password: hashedPassword,
      username,
      rut,
      region,
      comuna,
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      rut: newUser.rut,
      region: newUser.region,
      comuna: newUser.comuna,
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
});

// GET: Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] } // No retornar contraseñas
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
});

// GET: Obtener un usuario específico por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ['password'] } // No retornar contraseña
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario.' });
  }
});

// PUT: Actualizar un usuario existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, username, rut, region, comuna } = req.body;
    
    const user = await db.User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    
    // Si se proporciona nueva contraseña, hashearla
    let updateData: any = { email, username, rut, region, comuna };
    
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    
    await user.update(updateData);
    
    res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      rut: user.rut,
      region: user.region,
      comuna: user.comuna
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
});

// DELETE: Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    
    await user.destroy();
    res.status(204).send(); // 204 No Content - eliminación exitosa
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
});

export default router;
