import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

// 1. Define todos los atributos que tendrá un usuario
interface UserAttributes {
  id: number;
  rut: string;
  username: string; 
  email: string;
  password: string;
  region: string;  
  comuna: string;
}

// 2. Define qué atributos son opcionales durante la creación
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// 3. Crea la clase del Modelo con todas las propiedades
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public rut!: string;
  public username!: string; // Añadimos el nombre de usuario
  public email!: string;
  public password!: string;
  public region!: string;   // Añadimos la región
  public comuna!: string;   // Añadimos la comuna

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4. Inicializa el modelo con las nuevas columnas y reglas
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  comuna: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Users'
});

export default User;