import { Router } from 'express';
import { 
  createOrderItem, 
  getOrderItems, 
  deleteOrderItem 
} from '../controllers/orderItemController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createOrderItem);
router.get('/:orderId', getOrderItems);
router.delete('/:id', deleteOrderItem);

export default router;
