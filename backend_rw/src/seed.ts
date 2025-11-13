import sequelize from './database';
import { User, Category, Product } from './models';
import bcrypt from 'bcrypt';

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando migración de datos mock a base de datos...');

    // 1. Sincronizar base de datos
    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos sincronizada');

    // 2. Crear usuario de prueba si no existe
    const existingUser = await User.findOne({ where: { email: 'test@example.com' } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      await User.create({
        rut: '12.345.678-9',
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
        region: 'Metropolitana de Santiago',
        comuna: 'Santiago',
        role: 'user'
      });
      console.log('✅ Usuario de prueba creado: test@example.com / 123456');
    }

    // 3. Crear categorías
    let categoryJackets = await Category.findOne({ where: { name: 'Chaquetas' } });
    if (!categoryJackets) {
      categoryJackets = await Category.create({
        name: 'Chaquetas',
        description: 'Chaquetas de carreras de alta calidad'
      });
      console.log('✅ Categoría "Chaquetas" creada');
    }

    let categoryAccessories = await Category.findOne({ where: { name: 'Accesorios' } });
    if (!categoryAccessories) {
      categoryAccessories = await Category.create({
        name: 'Accesorios',
        description: 'Accesorios para carreras'
      });
      console.log('✅ Categoría "Accesorios" creada');
    }

    // 4. Datos mock originales - CHAQUETAS
    const mockJackets = [
      { id: 1, name: 'Ferrari Black Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product1.jpg', type: 'chaqueta' },
      { id: 2, name: 'Jack Daniels Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product2.jpg', type: 'chaqueta' },
      { id: 3, name: 'Ford Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product3.jpg', type: 'chaqueta' },
      { id: 4, name: 'Red Bull Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product4.jpg', type: 'chaqueta' },
      { id: 5, name: 'Ferrari Cuero Racing Jacket', price: 80000, originalPrice: 100000, image: 'assets/product5.jpg', type: 'chaqueta' },
      { id: 6, name: 'Porsche Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product6.jpg', type: 'chaqueta' },
      { id: 7, name: 'Ferrari White Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product7.jpg', type: 'chaqueta' },
      { id: 8, name: 'Subaru Racing Jacket', price: 60000, originalPrice: 80000, image: 'assets/product8.jpg', type: 'chaqueta' },
    ];

    // 5. Insertar chaquetas en la base de datos
    for (const jacket of mockJackets) {
      const exists = await Product.findOne({ where: { name: jacket.name } });
      if (!exists) {
        await Product.create({
          name: jacket.name,
          description: `Chaqueta oficial de carreras ${jacket.name}`,
          price: jacket.price,
          categoryId: categoryJackets.id,
          imageUrl: jacket.image,
          stock: 10, // Stock por defecto
          size: 'L', // Talla por defecto
          brand: jacket.name.split(' ')[0], // Extraer marca del nombre
          color: 'Negro', // Color por defecto
          isActive: true
        });
      }
    }
    console.log('✅ Chaquetas migradas (8 productos)');

    // 6. Datos mock originales - ACCESORIOS
    const mockAccessories = [
      { id: 9, name: 'Gorra F1 Racing Black', price: 25000, originalPrice: 30000, image: 'assets/acc1.jpg', type: 'accesorio' },
      { id: 10, name: 'Guantes F1 Racing', price: 35000, originalPrice: 45000, image: 'assets/acc2.jpg', type: 'accesorio' },
      { id: 11, name: 'Llavero Pistón Metálico', price: 15000, originalPrice: 20000, image: 'assets/acc3.jpg', type: 'accesorio' },
      { id: 12, name: 'Mochila Red Bull Team', price: 55000, originalPrice: 70000, image: 'assets/acc4.jpg', type: 'accesorio' },
      { id: 13, name: 'Calcetines Checkered Flag', price: 12000, originalPrice: 15000, image: 'assets/acc5.jpg', type: 'accesorio' },
      { id: 14, name: 'Cinturón de Seguridad F1', price: 28000, originalPrice: 35000, image: 'assets/acc6.jpg', type: 'accesorio' },
      { id: 15, name: 'Tazón F1', price: 18000, originalPrice: 22000, image: 'assets/acc7.jpg', type: 'accesorio' },
      { id: 16, name: 'Gafas de Sol Aviador', price: 40000, originalPrice: 50000, image: 'assets/acc8.jpg', type: 'accesorio' },
    ];

    // 7. Insertar accesorios en la base de datos
    for (const accessory of mockAccessories) {
      const exists = await Product.findOne({ where: { name: accessory.name } });
      if (!exists) {
        await Product.create({
          name: accessory.name,
          description: `${accessory.name} - Accesorio oficial de carreras`,
          price: accessory.price,
          categoryId: categoryAccessories.id,
          imageUrl: accessory.image,
          stock: 15, // Stock por defecto
          size: 'Único', // Talla única para accesorios
          brand: accessory.name.includes('F1') ? 'F1' : accessory.name.split(' ')[0],
          color: 'Negro', // Color por defecto
          isActive: true
        });
      }
    }
    console.log('✅ Accesorios migrados (8 productos)');

    console.log('\n✨ ¡Migración completada exitosamente!');
    console.log('\n📊 Resumen:');
    console.log('   ✅ 2 categorías');
    console.log('   ✅ 16 productos (8 chaquetas + 8 accesorios)');
    console.log('   ✅ 1 usuario de prueba (test@example.com / 123456)');
    console.log('\n📝 Nota: Las imágenes usan rutas relativas (assets/...)');
    console.log('   El frontend ya las tiene en src/assets/');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en migración:', error);
    process.exit(1);
  }
}

seedDatabase();
