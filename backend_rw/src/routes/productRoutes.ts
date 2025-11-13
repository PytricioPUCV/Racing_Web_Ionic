import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// GET: Obtener todos los productos (público)
router.get('/', getAllProducts);

// GET: Obtener producto por ID (público)
router.get('/:id', getProductById);

// POST: Crear producto (protegido - solo admin)
router.post('/', authMiddleware, createProduct);

// PUT: Actualizar producto (protegido - solo admin)
router.put('/:id', authMiddleware, updateProduct);

// DELETE: Eliminar producto (protegido - solo admin)
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
