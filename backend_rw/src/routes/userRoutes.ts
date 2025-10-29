import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  changePassword
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Aplicar middleware de autenticación a TODAS las rutas de usuarios
router.use(authMiddleware);

// PUT: Cambiar contraseña - PROTEGIDO ✅ (DEBE IR PRIMERO)
router.put('/:id/change-password', changePassword);

// GET: Obtener todos los usuarios - PROTEGIDO ✅
router.get('/', getAllUsers);

// GET: Obtener un usuario específico por ID - PROTEGIDO ✅
router.get('/:id', getUserById);

// PUT: Actualizar un usuario existente - PROTEGIDO ✅
router.put('/:id', updateUser);

// DELETE: Eliminar un usuario - PROTEGIDO ✅
router.delete('/:id', deleteUser);

export default router;
