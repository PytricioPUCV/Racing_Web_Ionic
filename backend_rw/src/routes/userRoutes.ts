import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  changePassword
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { rateLimit } from '../middlewares/rateLimit.middleware';

const router = Router();

const changePasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiados intentos de cambio de contraseña. Intenta nuevamente en unos minutos.'
});

router.use(authMiddleware);

router.put('/:id/change-password', changePasswordLimiter, changePassword);

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
