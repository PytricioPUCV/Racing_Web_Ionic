import { Router } from 'express';
import { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  updateOrderStatus 
} from '../controllers/orderController';
import { authMiddleware, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createOrder);

router.get('/', getUserOrders);

router.get('/:id', getOrderById);

router.put('/:id', requireAdmin, updateOrderStatus);

export default router;
