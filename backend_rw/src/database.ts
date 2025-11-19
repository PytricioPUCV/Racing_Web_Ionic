import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize: Sequelize;

// Priorizar DB_URL si existe (funciona para Docker y local)
if (process.env.DB_URL) {
  console.log('🔗 Conectando con DB_URL (NeonDB)...');
  
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
} else {
  // Fallback a parámetros individuales (PostgreSQL local sin SSL)
  console.log('🐳 Conectando con parámetros individuales (PostgreSQL local)...');
  
  sequelize = new Sequelize({
    database: process.env.DB_NAME || 'racing_db',
    username: process.env.DB_USER || 'racing_user',
    password: process.env.DB_PASSWORD || 'racing_password',
    host: process.env.DB_HOST || 'localhost',
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
}

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    throw error;
  }
}

testConnection();

export default sequelize;
