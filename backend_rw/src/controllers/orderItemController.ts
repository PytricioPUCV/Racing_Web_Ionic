import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Order, OrderItem } from '../models';

// Los items de una orden se crean únicamente dentro de createOrder,
// con precios tomados de la BD, por eso aquí solo existe la lectura.
export const getOrderItems = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order || (order.userId !== req.user?.id && req.user?.role !== 'admin')) {
      res.status(404).json({ message: 'Pedido no encontrado' });
      return;
    }

    const items = await OrderItem.findAll({
      where: { orderId },
      include: [{ association: 'product' }]
    });

    res.json({
      message: 'Items obtenidos exitosamente',
      items
    });
  } catch (error) {
    console.error('❌ Error al obtener items:', error);
    res.status(500).json({ message: 'Error al obtener items' });
  }
};
