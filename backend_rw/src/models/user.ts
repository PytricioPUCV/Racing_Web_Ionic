import { DataTypes } from 'sequelize';
import sequelize from '../database'; // La ruta ahora es relativa a 'src'

const user = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,

    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default user; // Usamos export default