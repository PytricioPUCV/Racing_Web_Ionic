import { Router } from 'express';
import { 
  addCartItem, 
  updateCartItem, 
  removeCartItem 
} from '../controllers/cartItemController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', addCartItem);
router.put('/:id', updateCartItem);
router.delete('/:id', removeCartItem);

export default router;
