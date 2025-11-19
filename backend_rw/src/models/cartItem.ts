import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  size: string;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public size!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Carts',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'CartItems',
  timestamps: true,
  // ✅ ÍNDICES PARA OPTIMIZACIÓN
  indexes: [
    {
      // Buscar todos los items de un carrito específico
      fields: ['cartId'],
      name: 'cart_items_cart_id_index'
    },
    {
      // Ver qué productos están en carritos (para análisis)
      fields: ['productId'],
      name: 'cart_items_product_id_index'
    },
    {
      // Índice compuesto: evitar productos duplicados en el mismo carrito
      unique: true,
      fields: ['cartId', 'productId', 'size'],
      name: 'cart_items_unique_product_index'
    }
  ]
});

export default CartItem;
