import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface CartAttributes {
  id: number;
  userId: number | null; // null si es invitado
  sessionId: string | null; // para invitados
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
  tableName: 'Carts'
});

export default Cart;
