import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './database';
import { db } from './models';
import userRoutes from './routes/userRoutes'; 
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES
// ============================================

app.use(cors({
  origin: ['http://localhost:8100', 'http://localhost:8101'],
  credentials: true
}));

app.use(express.json());

// ============================================
// RUTAS
// ============================================

app.use('/api/auth', authRoutes);  // Rutas de autenticación (login, register)
app.use('/api/users', userRoutes); // Rutas de usuarios (CRUD protegido)

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡El servidor backend con TypeScript está funcionando!');
});

// ============================================
// CONEXIÓN A BASE DE DATOS Y SERVIDOR
// ============================================

async function startServer() {
  try {
    // Verificar conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos de Supabase establecida correctamente.');

    // Sincronizar modelos
    // alter: true = intenta actualizar las tablas sin borrar datos
    // alter: false = solo crea tablas si no existen (seguro para producción)
    // Para desarrollo: usar alter: true para ver cambios
    // Para producción: usar alter: false
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    
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

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
      console.log(`📝 Entorno: ${isDevelopment ? 'DESARROLLO' : 'PRODUCCIÓN'}`);
    });

  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1); // Salir si no hay conexión
  }
}

// Iniciar el servidor
startServer();
