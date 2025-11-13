import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Cart, CartItem } from '../models';

// POST /api/carts - Crear carrito
export const createCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const cart = await Cart.create({
      userId: req.user.id,
      sessionId: null
    });

    console.log(`✅ Carrito creado: ID ${cart.id}`);

    res.status(201).json({
      message: 'Carrito creado exitosamente',
      cart
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

    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ association: 'items', include: [{ association: 'product' }] }]
    });

    if (!cart) {
      res.status(404).json({ message: 'Carrito no encontrado' });
      return;
    }

    res.json({
      message: 'Carrito obtenido exitosamente',
      cart
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

    const cart = await Cart.findByPk(id, {
      include: [{ association: 'items', include: [{ association: 'product' }] }]
    });

    if (!cart) {
      res.status(404).json({ message: 'Carrito no encontrado' });
      return;
    }

    res.json({
      message: 'Carrito obtenido exitosamente',
      cart
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

    const cart = await Cart.findByPk(id);

    if (!cart) {
      res.status(404).json({ message: 'Carrito no encontrado' });
      return;
    }

    await CartItem.destroy({ where: { cartId: id } });

    console.log(`✅ Carrito vaciado: ID ${id}`);

    res.json({
      message: 'Carrito vaciado exitosamente'
    });
  } catch (error) {
    console.error('❌ Error al limpiar carrito:', error);
    res.status(500).json({ message: 'Error al limpiar carrito' });
  }
};
