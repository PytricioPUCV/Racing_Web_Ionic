import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import { encrypt, decrypt } from '../utils/encryption';

interface UserAttributes {
  id: number;
  rut: string;
  username: string; 
  email: string;
  password: string;
  region: string;  
  comuna: string;
  role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public rut!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public region!: string;
  public comuna!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getDecryptedRegion(): string {
    return this.region ? decrypt(this.region) : '';
  }

  public getDecryptedComuna(): string {
    return this.comuna ? decrypt(this.comuna) : '';
  }

  public getDecryptedRut(): string {
    return this.rut ? decrypt(this.rut) : '';
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rut: {
    type: DataTypes.STRING(255),
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
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  comuna: { 
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'guest'),
    defaultValue: 'user',
  },
}, {
  sequelize,
  tableName: 'Users'
});

export default User;
