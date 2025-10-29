import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { db } from '../models';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (sin JWT)
// ============================================

// POST: Crear un nuevo usuario (registro) - PÚBLICO
// Nota: El registro ahora usa /api/auth/register con JWT
// Esta ruta es legacy, podrías eliminarla o dejarla para compatibilidad
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

// ============================================
// RUTAS PROTEGIDAS (requieren JWT)
// ============================================

// Aplicar middleware de autenticación a todas las rutas siguientes
router.use(authMiddleware);

// GET: Obtener todos los usuarios - PROTEGIDO ✅
router.get('/', getAllUsers);

// GET: Obtener un usuario específico por ID - PROTEGIDO ✅
router.get('/:id', getUserById);

// PUT: Actualizar un usuario existente - PROTEGIDO ✅
router.put('/:id', updateUser);

// DELETE: Eliminar un usuario - PROTEGIDO ✅
router.delete('/:id', deleteUser);

export default router;
