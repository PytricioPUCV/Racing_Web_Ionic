import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Cart, CartItem, Product } from '../models';
import { isPositiveInteger } from '../utils/validators';

const findOwnedCartItem = (id: string, userId: number) =>
  CartItem.findOne({
    where: { id },
    include: [{ association: 'cart', where: { userId }, attributes: [] }]
  });

export const addCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { cartId, productId, quantity, size } = req.body;

    if (!cartId || !productId || !size) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    if (!isPositiveInteger(quantity)) {
      res.status(400).json({ message: 'La cantidad debe ser un entero mayor a 0' });
      return;
    }

    const cart = await Cart.findOne({ where: { id: cartId, userId: req.user!.id } });
    if (!cart) {
      res.status(404).json({ message: 'Carrito no encontrado' });
      return;
    }

    const product = await Product.findByPk(productId);
    if (!product || !product.isActive) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    const existing = await CartItem.findOne({
      where: { cartId: cart.id, productId, size }
    });

    const newQuantity = (existing?.quantity ?? 0) + quantity;
    if (newQuantity > product.stock) {
      res.status(409).json({ message: `Stock insuficiente. Disponible: ${product.stock}` });
      return;
    }

    if (existing) {
      await existing.update({ quantity: newQuantity });
      console.log(`✅ Cantidad actualizada en carrito`);
      res.json({
        message: 'Item actualizado en carrito',
        cartItem: existing
      });
    } else {
      const cartItem = await CartItem.create({
        cartId: cart.id,
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

export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!isPositiveInteger(quantity)) {
      res.status(400).json({ message: 'La cantidad debe ser un entero mayor a 0' });
      return;
    }

    const cartItem = await findOwnedCartItem(id, req.user!.id);

    if (!cartItem) {
      res.status(404).json({ message: 'Item no encontrado' });
      return;
    }

    const product = await Product.findByPk(cartItem.productId);
    if (product && quantity > product.stock) {
      res.status(409).json({ message: `Stock insuficiente. Disponible: ${product.stock}` });
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

export const removeCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const cartItem = await findOwnedCartItem(id, req.user!.id);

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
