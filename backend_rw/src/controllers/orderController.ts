import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Order, OrderItem, Cart, CartItem, Product } from '../models';
import sequelize from '../database';
import { DateTime } from 'luxon';

const SHIPPING_COST = 5000;

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

class OrderValidationError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= 255;

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { shippingAddress, shippingRegion, shippingComuna, paymentMethod } = req.body;
    const timezone = req.clientTimezone || 'America/Santiago';

    if (![shippingAddress, shippingRegion, shippingComuna, paymentMethod].every(isNonEmptyString)) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ association: 'items' }]
    });
    const cartItems: CartItem[] = (cart as any)?.items ?? [];

    if (!cart || cartItems.length === 0) {
      res.status(400).json({ message: 'El carrito está vacío' });
      return;
    }

    // El total y los precios se calculan en el servidor a partir de la BD:
    // nunca se confía en montos enviados por el cliente.
    const order = await sequelize.transaction(async (transaction) => {
      const lines: { product: Product; item: CartItem }[] = [];
      let subtotal = 0;

      for (const item of cartItems) {
        const product = await Product.findByPk(item.productId, {
          transaction,
          lock: transaction.LOCK.UPDATE
        });

        if (!product || !product.isActive) {
          throw new OrderValidationError(400, 'Uno de los productos del carrito ya no está disponible');
        }

        if (product.stock < item.quantity) {
          throw new OrderValidationError(409, `Stock insuficiente para ${product.name}`);
        }

        subtotal += Number(product.price) * item.quantity;
        lines.push({ product, item });
      }

      const newOrder = await Order.create({
        userId: req.user!.id,
        totalAmount: Math.round((subtotal + SHIPPING_COST) * 100) / 100,
        shippingAddress: shippingAddress.trim(),
        shippingRegion: shippingRegion.trim(),
        shippingComuna: shippingComuna.trim(),
        paymentMethod: paymentMethod.trim(),
        status: 'pending'
      }, { transaction });

      for (const { product, item } of lines) {
        await OrderItem.create({
          orderId: newOrder.id,
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          size: item.size
        }, { transaction });

        await product.decrement('stock', { by: item.quantity, transaction });
      }

      await CartItem.destroy({ where: { cartId: cart.id }, transaction });

      return newOrder;
    });

    const createdOrder = await Order.findByPk(order.id, {
      include: [{ association: 'items' }]
    });

    console.log(`✅ Pedido creado: ID ${order.id}`);

    res.status(201).json({
      message: 'Pedido creado exitosamente',
      order: formatOrderTimestamps(createdOrder, timezone)
    });
  } catch (error) {
    if (error instanceof OrderValidationError) {
      res.status(error.status).json({ message: error.message });
      return;
    }
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

    if (!order || (order.userId !== req.user?.id && req.user?.role !== 'admin')) {
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
