import express from 'express';
// Importa el objeto 'db' que contiene la conexión y los modelos
import { db } from './models';

const app = express();
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

app.get('/', (req, res) => {
  res.send('¡El servidor backend con TypeScript está funcionando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});