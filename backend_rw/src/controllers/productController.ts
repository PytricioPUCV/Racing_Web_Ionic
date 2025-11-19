import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Product } from '../models';
import { DateTime } from 'luxon';

const formatProductTimestamps = (product: any, timezone: string) => {
  const productData = product.toJSON();
  
  return {
    ...productData,
    createdAtLocal: DateTime.fromJSDate(product.createdAt)
      .setZone(timezone)
      .toFormat('dd/MM/yyyy HH:mm'),
    updatedAtLocal: DateTime.fromJSDate(product.updatedAt)
      .setZone(timezone)
      .toFormat('dd/MM/yyyy HH:mm')
  };
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, price, categoryId, imageUrl, stock, size, brand, color, isActive } = req.body;
    const timezone = req.clientTimezone || 'America/Santiago';

    if (!name || !description || !price || !categoryId || !stock || !size || !brand) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    if (price <= 0) {
      res.status(400).json({ message: 'El precio debe ser mayor a 0' });
      return;
    }

    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
      imageUrl: imageUrl || '/assets/default-product.jpg',
      stock,
      size,
      brand,
      color: color || 'Sin especificar',
      isActive: isActive !== undefined ? isActive : true
    });

    console.log(`✅ Producto creado: ${name}`);

    res.status(201).json({
      message: 'Producto creado exitosamente',
      product: formatProductTimestamps(product, timezone)
    });
  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

export const getAllProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const timezone = req.clientTimezone || 'America/Santiago';
    
    const products = await Product.findAll({
      include: [{ association: 'category' }]
    });

    const productsWithTimezone = products.map(product => 
      formatProductTimestamps(product, timezone)
    );

    res.json({
      message: 'Productos obtenidos exitosamente',
      products: productsWithTimezone
    });
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const getProductById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const timezone = req.clientTimezone || 'America/Santiago';

    const product = await Product.findByPk(id, {
      include: [{ association: 'category' }]
    });

    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    res.json({
      message: 'Producto obtenido exitosamente',
      product: formatProductTimestamps(product, timezone)
    });
  } catch (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener producto' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl, isActive } = req.body;
    const timezone = req.clientTimezone || 'America/Santiago';

    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    await product.update({
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      stock: stock !== undefined ? stock : product.stock,
      imageUrl: imageUrl || product.imageUrl,
      isActive: isActive !== undefined ? isActive : product.isActive
    });

    console.log(`✅ Producto actualizado: ${product.name}`);

    res.json({
      message: 'Producto actualizado exitosamente',
      product: formatProductTimestamps(product, timezone)
    });
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    const productName = product.name;
    await product.destroy();

    console.log(`✅ Producto eliminado: ${productName}`);

    res.json({
      message: 'Producto eliminado exitosamente',
      productId: id
    });
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};
