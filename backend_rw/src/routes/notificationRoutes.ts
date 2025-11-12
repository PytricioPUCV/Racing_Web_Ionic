import { Router } from 'express';
import {
  getNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from '../controllers/notificationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { idParamValidation } from '../middlewares/validation';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// GET: Obtener todas las notificaciones
router.get('/', getNotifications);

// GET: Obtener notificaciones no leídas
router.get('/unread', getUnreadNotifications);

// PUT: Marcar notificación como leída
router.put('/:id/read', idParamValidation, markAsRead);

// PUT: Marcar todas como leídas
router.put('/read-all', markAllAsRead);

// DELETE: Eliminar notificación
router.delete('/:id', idParamValidation, deleteNotification);

export default router;
