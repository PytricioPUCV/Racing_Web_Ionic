import { Sequelize } from 'sequelize';

const dbUrl = 'postgresql://neondb_owner:npg_JYNG38cthdXC@ep-shiny-breeze-acdy3wk7-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: { // Necesario para conexiones seguras (SSL) en la nube
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos de Supabase establecida correctamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos de Supabase:', error);
  }
}

testConnection();

export default sequelize;