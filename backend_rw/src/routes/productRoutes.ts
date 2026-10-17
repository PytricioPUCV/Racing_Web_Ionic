import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController';
import { authMiddleware, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', authMiddleware, requireAdmin, createProduct);

router.put('/:id', authMiddleware, requireAdmin, updateProduct);

router.delete('/:id', authMiddleware, requireAdmin, deleteProduct);

export default router;
