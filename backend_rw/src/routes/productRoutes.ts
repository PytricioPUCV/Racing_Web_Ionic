import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { productValidation, idParamValidation } from '../middlewares/validation';  

const router = Router();

// GET: Obtener todos los productos (público)
router.get('/', getAllProducts);

// GET: Obtener producto por ID (público con validación)
router.get('/:id', idParamValidation, getProductById);

// POST: Crear producto (protegido - solo admin, con validación)
router.post('/', authMiddleware, productValidation, createProduct);

// PUT: Actualizar producto (protegido - solo admin, con validación)
router.put('/:id', authMiddleware, idParamValidation, productValidation, updateProduct);

// DELETE: Eliminar producto (protegido - solo admin, con validación)
router.delete('/:id', authMiddleware, idParamValidation, deleteProduct);

export default router;
