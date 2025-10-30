import { Router } from 'express';
import { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  updateOrderStatus 
} from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// POST: Crear pedido
router.post('/', createOrder);

// GET: Obtener mis pedidos
router.get('/', getUserOrders);

// GET: Obtener pedido por ID
router.get('/:id', getOrderById);

// PUT: Actualizar estado del pedido
router.put('/:id', updateOrderStatus);

export default router;
