import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export class Notification extends Model {
  public id!: number;
  public userId!: number;
  public type!: 'order' | 'cart' | 'product' | 'system';
  public title!: string;
  public message!: string;
  public isRead!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('order', 'cart', 'product', 'system'),
      allowNull: false,
      defaultValue: 'system'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'notifications',  // ← MINÚSCULA (diferente a tus otras tablas)
    timestamps: true,
  }
);

export default Notification;
