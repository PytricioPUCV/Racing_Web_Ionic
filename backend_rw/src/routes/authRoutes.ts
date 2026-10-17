import { Router } from 'express';
import { register, login, verifyToken } from '../controllers/authController';
import { rateLimit } from '../middlewares/rateLimit.middleware';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Demasiados intentos de inicio de sesión. Intenta nuevamente en unos minutos.'
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Demasiados registros desde esta conexión. Intenta nuevamente más tarde.'
});

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);
router.get('/verify', verifyToken);

export default router;
