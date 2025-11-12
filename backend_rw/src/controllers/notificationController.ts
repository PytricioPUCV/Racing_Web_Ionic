import { Response } from 'express';
import { Notification } from '../models/notification';
import { AuthRequest } from '../middlewares/authMiddleware';

// Obtener todas las notificaciones del usuario
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user?.id },
      order: [['createdAt', 'DESC']],
      limit: 50 // Últimas 50 notificaciones
    });

    res.json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener notificaciones'
    });
  }
};

// Obtener notificaciones no leídas
export const getUnreadNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await Notification.findAll({
      where: { 
        userId: req.user?.id,
        isRead: false 
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Error al obtener notificaciones no leídas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener notificaciones'
    });
  }
};

// Marcar notificación como leída
export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOne({
      where: {
        id,
        userId: req.user?.id
      }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notificación no encontrada'
      });
    }

    await notification.update({ isRead: true });

    res.json({
      success: true,
      message: 'Notificación marcada como leída'
    });
  } catch (error) {
    console.error('Error al marcar notificación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar notificación'
    });
  }
};

// Marcar todas como leídas
export const markAllAsRead = async (req: AuthRequest, res: Response) => {
  try {
    await Notification.update(
      { isRead: true },
      { where: { userId: req.user?.id, isRead: false } }
    );

    res.json({
      success: true,
      message: 'Todas las notificaciones marcadas como leídas'
    });
  } catch (error) {
    console.error('Error al marcar notificaciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar notificaciones'
    });
  }
};

// Eliminar notificación
export const deleteNotification = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await Notification.destroy({
      where: {
        id,
        userId: req.user?.id
      }
    });

    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notificación no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Notificación eliminada'
    });
  } catch (error) {
    console.error('Error al eliminar notificación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar notificación'
    });
  }
};
