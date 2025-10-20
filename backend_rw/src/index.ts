import express from 'express';
import { db } from './models';
import userRoutes from './routes/userRoutes'; // <-- 1. IMPORTA LAS RUTAS

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

async function syncDatabase() {
  try {
    // Usa db.sequelize para sincronizar. Ahora sí conoce el modelo User.
    await db.sequelize.sync();
    console.log('✅ Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('❌ Error al sincronizar modelos:', error);
  }
}

syncDatabase();

app.use('/api/users', userRoutes); // Cualquier petición a /api/users será manejada por userRoutes
app.get('/', (req, res) => {
  res.send('¡El servidor backend con TypeScript está funcionando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});