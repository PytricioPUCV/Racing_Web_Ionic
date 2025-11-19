import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Cart, CartItem } from '../models';
import { DateTime } from 'luxon';

// Helper function para formatear timestamps de carrito
const formatCartTimestamps = (cart: any, timezone: string) => {
  const cartData = cart.toJSON();
  const createdDate = DateTime.fromJSDate(cart.createdAt).setZone(timezone);
  const updatedDate = DateTime.fromJSDate(cart.updatedAt).setZone(timezone);
  
  return {
    ...cartData,
    createdAtLocal: createdDate.toFormat('dd/MM/yyyy HH:mm'),
    updatedAtLocal: updatedDate.toFormat('dd/MM/yyyy HH:mm'),
    // Útil para mostrar "última modificación hace X tiempo"
    lastModifiedRelative: updatedDate.toRelative(),
    // Para saber si el carrito está "fresco" o abandonado
    daysSinceCreated: Math.floor(DateTime.now().diff(createdDate, 'days').days),
    isRecent: DateTime.now().diff(updatedDate, 'hours').hours < 24
  };
};

// POST /api/carts - Crear carrito
export const createCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const timezone = req.clientTimezone || 'America/Santiago';

    const cart = await Cart.create({
      userId: req.user.id,
      sessionId: null
    });

    console.log(`✅ Carrito creado: ID ${cart.id}`);

    res.status(201).json({
      message: 'Carrito creado exitosamente',
      cart: formatCartTimestamps(cart, timezone)
    });
  } catch (error) {
    console.error('❌ Error al crear carrito:', error);
    res.status(500).json({ message: 'Error al crear carrito' });
  }
};

// GET /api/carts/user - Obtener mi carrito
export const getUserCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const timezone = req.clientTimezone || 'America/Santiago';

    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ association: 'items', include: [{ association: 'product' }] }]
    });

    if (!cart) {
      res.status(404).json({ message: 'Carrito no encontrado' });
      return;
    }

    // Formatear timestamps de los items del carrito también
    const cartData = formatCartTimestamps(cart, timezone);
    
    if (cartData.items && cartData.items.length > 0) {
      cartData.items = cartData.items.map((item: any) => ({
        ...item,
        addedAtLocal: DateTime.fromJSDate(item.createdAt)
          .setZone(timezone)
          .toFormat('dd/MM/yyyy HH:mm'),
        addedAtRelative: DateTime.fromJSDate(item.createdAt)
          .setZone(timezone)
          .toRelative()
      }));
    }

    res.json({
      message: 'Carrito obtenido exitosamente',
      cart: cartData,
      itemCount: cartData.items?.length || 0
    });
  } catch (error) {
    console.error('❌ Error al obtener carrito:', error);
    res.status(500).json({ message: 'Error al obtener carrito' });
  }
};

// GET /api/carts/:id - Obtener carrito por ID
export const getCartById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const timezone = req.clientTimezone || 'America/Santiago';

    const cart = await Cart.findByPk(id, {
      include: [{ association: 'items', include: [{ association: 'product' }] }]
    });

    if (!cart) {
      res.status(404).json({ message: 'Carrito no encontrado' });
      return;
    }

    // Formatear timestamps de los items del carrito
    const cartData = formatCartTimestamps(cart, timezone);
    
    if (cartData.items && cartData.items.length > 0) {
      cartData.items = cartData.items.map((item: any) => ({
        ...item,
        addedAtLocal: DateTime.fromJSDate(item.createdAt)
          .setZone(timezone)
          .toFormat('dd/MM/yyyy HH:mm'),
        addedAtRelative: DateTime.fromJSDate(item.createdAt)
          .setZone(timezone)
          .toRelative()
      }));
    }

    res.json({
      message: 'Carrito obtenido exitosamente',
      cart: cartData,
      itemCount: cartData.items?.length || 0
    });
  } catch (error) {
    console.error('❌ Error al obtener carrito:', error);
    res.status(500).json({ message: 'Error al obtener carrito' });
  }
};

// DELETE /api/carts/:id - Limpiar carrito
export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const timezone = req.clientTimezone || 'America/Santiago';

    const cart = await Cart.findByPk(id);

    if (!cart) {
      res.status(404).json({ message: 'Carrito no encontrado' });
      return;
    }

    await CartItem.destroy({ where: { cartId: id } });

    console.log(`✅ Carrito vaciado: ID ${id}`);

    res.json({
      message: 'Carrito vaciado exitosamente',
      clearedAt: DateTime.now().setZone(timezone).toFormat('dd/MM/yyyy HH:mm:ss')
    });
  } catch (error) {
    console.error('❌ Error al limpiar carrito:', error);
    res.status(500).json({ message: 'Error al limpiar carrito' });
  }
};
