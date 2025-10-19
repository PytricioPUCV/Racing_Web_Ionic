import express from 'express';
import sequelize from './database';
import user from './models/user';

const app = express();
const PORT = process.env.PORT || 3000;

// Sincronizar modelos con la base de datos
async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
}

syncDatabase();

app.get('/', (req, res) => {
  res.send('¡El servidor backend con TypeScript está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});