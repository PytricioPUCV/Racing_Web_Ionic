import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { CartItem } from '../models';

// POST /api/cart-items - Agregar item al carrito
export const addCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { cartId, productId, quantity, size } = req.body;

    if (!cartId || !productId || !quantity || !size) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    // Verificar si el item ya existe
    const existing = await CartItem.findOne({
      where: { cartId, productId, size }
    });

    if (existing) {
      // Actualizar cantidad si ya existe
      await existing.update({ quantity: existing.quantity + quantity });
      console.log(`✅ Cantidad actualizada en carrito`);
      res.json({
        message: 'Item actualizado en carrito',
        cartItem: existing
      });
    } else {
      // Crear nuevo item
      const cartItem = await CartItem.create({
        cartId,
        productId,
        quantity,
        size
      });

      console.log(`✅ Item agregado al carrito`);

      res.status(201).json({
        message: 'Item agregado al carrito',
        cartItem
      });
    }
  } catch (error) {
    console.error('❌ Error al agregar item:', error);
    res.status(500).json({ message: 'Error al agregar item' });
  }
};

// PUT /api/cart-items/:id - Actualizar cantidad
export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
      return;
    }

    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) {
      res.status(404).json({ message: 'Item no encontrado' });
      return;
    }

    await cartItem.update({ quantity });

    console.log(`✅ Item actualizado`);

    res.json({
      message: 'Item actualizado exitosamente',
      cartItem
    });
  } catch (error) {
    console.error('❌ Error al actualizar item:', error);
    res.status(500).json({ message: 'Error al actualizar item' });
  }
};

// DELETE /api/cart-items/:id - Eliminar item del carrito
export const removeCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) {
      res.status(404).json({ message: 'Item no encontrado' });
      return;
    }

    await cartItem.destroy();

    console.log(`✅ Item eliminado del carrito`);

    res.json({
      message: 'Item eliminado del carrito exitosamente'
    });
  } catch (error) {
    console.error('❌ Error al eliminar item:', error);
    res.status(500).json({ message: 'Error al eliminar item' });
  }
};
