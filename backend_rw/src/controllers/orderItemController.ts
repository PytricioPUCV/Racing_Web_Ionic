import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { OrderItem } from '../models';

// POST /api/order-items - Agregar item a pedido
export const createOrderItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId, productId, quantity, price, size } = req.body;

    if (!orderId || !productId || !quantity || !price || !size) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    const orderItem = await OrderItem.create({
      orderId,
      productId,
      quantity,
      price,
      size
    });

    console.log(`✅ Item agregado al pedido`);

    res.status(201).json({
      message: 'Item agregado exitosamente',
      orderItem
    });
  } catch (error) {
    console.error('❌ Error al crear item:', error);
    res.status(500).json({ message: 'Error al crear item' });
  }
};

// GET /api/order-items/:orderId - Obtener items de un pedido
export const getOrderItems = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;

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

// DELETE /api/order-items/:id - Eliminar item del pedido
export const deleteOrderItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await OrderItem.findByPk(id);

    if (!item) {
      res.status(404).json({ message: 'Item no encontrado' });
      return;
    }

    await item.destroy();

    console.log(`✅ Item eliminado`);

    res.json({
      message: 'Item eliminado exitosamente'
    });
  } catch (error) {
    console.error('❌ Error al eliminar item:', error);
    res.status(500).json({ message: 'Error al eliminar item' });
  }
};
