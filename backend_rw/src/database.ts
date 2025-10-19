import { Sequelize } from 'sequelize';

// Reemplaza con tus propias credenciales
const sequelize = new Sequelize('racing_db', 'postgres', 'c10h15n1', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false // Opcional: desactiva los logs de SQL en la consola
});

// Probar la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

export default sequelize; // Usamos export default