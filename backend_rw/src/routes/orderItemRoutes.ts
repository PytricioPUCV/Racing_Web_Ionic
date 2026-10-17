import { Router } from 'express';
import { getOrderItems } from '../controllers/orderItemController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/:orderId', getOrderItems);

export default router;
