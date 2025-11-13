import { Router } from 'express';
import { 
  createCart, 
  getUserCart, 
  getCartById, 
  clearCart 
} from '../controllers/cartController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createCart);
router.get('/user', getUserCart);
router.get('/:id', getCartById);
router.delete('/:id', clearCart);

export default router;
