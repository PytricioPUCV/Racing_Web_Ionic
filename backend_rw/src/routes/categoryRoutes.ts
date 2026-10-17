import { Router } from 'express';
import { getAllCategories, getCategoryById, createCategory } from '../controllers/categoryController';
import { authMiddleware, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllCategories);

router.get('/:id', getCategoryById);

router.post('/', authMiddleware, requireAdmin, createCategory);

export default router;
