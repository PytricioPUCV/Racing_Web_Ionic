import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Order, OrderItem } from '../models';
import { NotificationService } from '../services/notificationService';

// POST /api/orders - Crear pedido
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { totalAmount, shippingAddress, shippingRegion, shippingComuna, paymentMethod } = req.body;

    if (!totalAmount || !shippingAddress || !shippingRegion || !shippingComuna || !paymentMethod) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      shippingAddress,
      shippingRegion,
      shippingComuna,
      paymentMethod,
      status: 'pending'
    });

    console.log(`✅ Pedido creado: ID ${order.id}`);

    res.status(201).json({
      message: 'Pedido creado exitosamente',
      order
    });
  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

// GET /api/orders - Obtener mis pedidos
export const getUserOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ association: 'items' }]
    });

    res.json({
      message: 'Pedidos obtenidos exitosamente',
      orders
    });
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

// GET /api/orders/:id - Obtener pedido por ID
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [{ association: 'items' }]
    });

    if (!order) {
      res.status(404).json({ message: 'Pedido no encontrado' });
      return;
    }

    res.json({
      message: 'Pedido obtenido exitosamente',
      order
    });
  } catch (error) {
    console.error('❌ Error al obtener pedido:', error);
    res.status(500).json({ message: 'Error al obtener pedido' });
  }
};

// PUT /api/orders/:id - Actualizar estado del pedido
export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: 'Estado inválido' });
      return;
    }

    const order = await Order.findByPk(id);

    if (!order) {
      res.status(404).json({ message: 'Pedido no encontrado' });
      return;
    }

    await order.update({ status });

    console.log(`✅ Pedido actualizado: ID ${order.id}, Status: ${status}`);

    res.json({
      message: 'Pedido actualizado exitosamente',
      order
    });
  } catch (error) {
    console.error('❌ Error al actualizar pedido:', error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};
