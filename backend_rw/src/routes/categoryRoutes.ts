import { Router } from 'express';
import { getAllCategories, getCategoryById, createCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// GET: Obtener todas las categorías (público)
router.get('/', getAllCategories);

// GET: Obtener categoría por ID (público)
router.get('/:id', getCategoryById);

// POST: Crear categoría (protegido - solo admin)
router.post('/', authMiddleware, createCategory);

export default router;
