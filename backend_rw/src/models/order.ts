import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface OrderAttributes {
  id: number;
  userId: number;
  totalAmount: number;
  status: string; // 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
  shippingAddress: string;
  shippingRegion: string;
  shippingComuna: string;
  paymentMethod: string;
  orderDate: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'orderDate'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public totalAmount!: number;
  public status!: string;
  public shippingAddress!: string;
  public shippingRegion!: string;
  public shippingComuna!: string;
  public paymentMethod!: string;
  public orderDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  shippingAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shippingRegion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shippingComuna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'Orders'
});

export default Order;
