import { Notification } from '../models/notification';

export class NotificationService {
  // Crear notificación de nueva orden
  static async createOrderNotification(userId: number, orderId: number) {
    return await Notification.create({
      userId,
      type: 'order',
      title: '¡Orden confirmada! 🎉',
      message: `Tu orden #${orderId} ha sido confirmada y está en proceso.`
    });
  }

  // Crear notificación de producto agregado al carrito
  static async createCartNotification(userId: number, productName: string) {
    return await Notification.create({
      userId,
      type: 'cart',
      title: 'Producto agregado al carrito',
      message: `${productName} fue agregado a tu carrito.`
    });
  }

  // Crear notificación de stock bajo
  static async createLowStockNotification(userId: number, productName: string) {
    return await Notification.create({
      userId,
      type: 'product',
      title: '¡Últimas unidades! ⚡',
      message: `Quedan pocas unidades de ${productName}. ¡Compra ahora!`
    });
  }

  // Crear notificación de bienvenida
  static async createWelcomeNotification(userId: number, username: string) {
    return await Notification.create({
      userId,
      type: 'system',
      title: `¡Bienvenido/a ${username}! 🏁`,
      message: 'Gracias por unirte a Racing Web. Descubre las mejores chaquetas de F1.'
    });
  }
}
