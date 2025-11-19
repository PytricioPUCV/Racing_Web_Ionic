import { Router } from 'express';
import { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  updateOrderStatus 
} from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createOrder);

router.get('/', getUserOrders);

router.get('/:id', getOrderById);

router.put('/:id', updateOrderStatus);

export default router;
