import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Category } from '../models';

// POST /api/categories - Crear categoría
export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;

    // Validaciones
    if (!name) {
      res.status(400).json({ message: 'El nombre de la categoría es requerido' });
      return;
    }

    // Verificar que no existe
    const existing = await Category.findOne({ where: { name } });
    if (existing) {
      res.status(400).json({ message: 'La categoría ya existe' });
      return;
    }

    const category = await Category.create({
      name,
      description: description || ''
    });

    console.log(`✅ Categoría creada: ${name}`);

    res.status(201).json({
      message: 'Categoría creada exitosamente',
      category
    });
  } catch (error) {
    console.error('❌ Error al crear categoría:', error);
    res.status(500).json({ message: 'Error al crear categoría' });
  }
};

// GET /api/categories - Obtener todas las categorías
export const getAllCategories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categories = await Category.findAll();

    res.json({
      message: 'Categorías obtenidas exitosamente',
      categories
    });
  } catch (error) {
    console.error('❌ Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

// GET /api/categories/:id - Obtener categoría por ID
export const getCategoryById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      res.status(404).json({ message: 'Categoría no encontrada' });
      return;
    }

    res.json({
      message: 'Categoría obtenida exitosamente',
      category
    });
  } catch (error) {
    console.error('❌ Error al obtener categoría:', error);
    res.status(500).json({ message: 'Error al obtener categoría' });
  }
};
