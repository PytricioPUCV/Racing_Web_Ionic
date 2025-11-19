import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Order, OrderItem } from '../models';
import { DateTime } from 'luxon';

const formatOrderTimestamps = (order: any, timezone: string) => {
  const orderData = order.toJSON();
  const createdDate = DateTime.fromJSDate(order.createdAt).setZone(timezone);
  const updatedDate = DateTime.fromJSDate(order.updatedAt).setZone(timezone);
  
  return {
    ...orderData,
    createdAtLocal: createdDate.toFormat('dd/MM/yyyy HH:mm:ss'),
    updatedAtLocal: updatedDate.toFormat('dd/MM/yyyy HH:mm:ss'),
    createdAtRelative: createdDate.toRelative(),
    createdAtFull: createdDate.toLocaleString(DateTime.DATETIME_FULL),
    estimatedDelivery: createdDate.plus({ days: 7 }).toFormat('dd/MM/yyyy'),
    estimatedDeliveryFull: createdDate.plus({ days: 7 }).toLocaleString(DateTime.DATE_FULL)
  };
};

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { totalAmount, shippingAddress, shippingRegion, shippingComuna, paymentMethod } = req.body;
    const timezone = req.clientTimezone || 'America/Santiago';

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
      order: formatOrderTimestamps(order, timezone)
    });
  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const timezone = req.clientTimezone || 'America/Santiago';

    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ association: 'items' }],
      order: [['createdAt', 'DESC']]
    });

    const ordersWithTimezone = orders.map(order => 
      formatOrderTimestamps(order, timezone)
    );

    res.json({
      message: 'Pedidos obtenidos exitosamente',
      orders: ordersWithTimezone,
      totalOrders: orders.length
    });
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const timezone = req.clientTimezone || 'America/Santiago';

    const order = await Order.findByPk(id, {
      include: [{ association: 'items' }]
    });

    if (!order) {
      res.status(404).json({ message: 'Pedido no encontrado' });
      return;
    }

    res.json({
      message: 'Pedido obtenido exitosamente',
      order: formatOrderTimestamps(order, timezone)
    });
  } catch (error) {
    console.error('❌ Error al obtener pedido:', error);
    res.status(500).json({ message: 'Error al obtener pedido' });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const timezone = req.clientTimezone || 'America/Santiago';

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

    const formattedOrder = formatOrderTimestamps(order, timezone);

    res.json({
      message: 'Pedido actualizado exitosamente',
      order: formattedOrder,
      statusUpdatedAt: DateTime.now().setZone(timezone).toFormat('dd/MM/yyyy HH:mm:ss')
    });
  } catch (error) {
    console.error('❌ Error al actualizar pedido:', error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};
