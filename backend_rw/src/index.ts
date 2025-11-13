import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import sequelize from './database';
import { db } from './models';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import orderItemRoutes from './routes/orderItemRoutes';
import cartRoutes from './routes/cartRoutes';
import cartItemRoutes from './routes/cartItemRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

app.use(helmet());

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:8100',
    'http://localhost:8101',
    'http://localhost:4200',
    'https://racing-web-ionic.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/cart-items', cartItemRoutes);

app.get('/', (req, res) => {
  res.send('¡El servidor backend con TypeScript está funcionando!');
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos de Supabase establecida correctamente.');

    await sequelize.sync({ alter: isDevelopment }); 
    
    console.log('✅ Modelos sincronizados con la base de datos.');
    console.log('✅ Tablas creadas/actualizadas:');
    console.log('   ✓ Users');
    console.log('   ✓ Categories');
    console.log('   ✓ Products');
    console.log('   ✓ Orders');
    console.log('   ✓ OrderItems');
    console.log('   ✓ Carts');
    console.log('   ✓ CartItems');

    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor iniciado en http://localhost:${PORT}`);
      console.log(`📝 Entorno: ${isDevelopment ? 'DESARROLLO' : 'PRODUCCIÓN'}`);
      console.log('🔒 Seguridad: Helmet + CORS configurado');
      console.log('\n📋 Endpoints disponibles:');
      console.log('    /api/auth         - Autenticación');
      console.log('    /api/users        - Usuarios');
      console.log('    /api/categories   - Categorías');
      console.log('    /api/products     - Productos');
      console.log('    /api/orders       - Pedidos');
      console.log('    /api/order-items  - Items de pedidos');
      console.log('    /api/carts        - Carritos');
      console.log('    /api/cart-items   - Items de carritos');
    });

  } catch (error) {
    console.error('❌ Error al conectar o iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();