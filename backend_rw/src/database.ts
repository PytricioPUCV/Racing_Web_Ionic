import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isDocker = process.env.DB_HOST !== undefined;

let sequelize: Sequelize;

if (isDocker) {
  console.log('🐳 Ejecutando en Docker...');
  
  sequelize = new Sequelize({
    database: process.env.DB_NAME || 'racing_db',
    username: process.env.DB_USER || '***REMOVED***',
    password: process.env.DB_PASSWORD || 'racing_password',
    host: process.env.DB_HOST || 'database',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
} else {
  console.log('☁️  Conectando a Supabase...');
  
  const dbUrl = process.env.DB_URL;
  
  if (!dbUrl) {
    throw new Error('❌ DB_URL no está definida en las variables de entorno');
  }
  
  sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  });
}

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

export default sequelize;
