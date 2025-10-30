import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  stock: number;
  size: string; // S, M, L, XL
  brand: string; // Ferrari, Ford, Mercedes, etc.
  color: string;
  isActive: boolean;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public categoryId!: number;
  public imageUrl!: string;
  public stock!: number;
  public size!: string;
  public brand!: string;
  public color!: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  tableName: 'Products'
});

export default Product;
