import 'dotenv/config';
import express from 'express';
import cors from 'cors';
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
    await db.sequelize.authenticate();
    console.log('✅ Conexión a la base de datos de Supabase establecida correctamente.');

    // Sincronizar modelos (sin alterar estructura en producción)
    await db.sequelize.sync({ alter: false });
    console.log('✅ Modelos sincronizados con la base de datos.');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1); // Salir si no hay conexión
  }
}

// Iniciar el servidor
startServer();
