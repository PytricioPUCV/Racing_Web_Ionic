import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import { Op } from 'sequelize';

interface CartAttributes {
  id: number;
  userId: number | null;
  sessionId: string | null;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id' | 'userId' | 'sessionId'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public userId!: number | null;
  public sessionId!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Carts',
  timestamps: true,
  indexes: [
    {
      fields: ['userId'],
      name: 'carts_user_id_index'
    },
    {
      fields: ['sessionId'],
      name: 'carts_session_id_index'
    }
  ]
});

export default Cart;
