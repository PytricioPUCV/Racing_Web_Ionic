export interface User {
  id?: number;
  email: string;
  password?: string;
  username: string;
  rut: string;
  region: string;
  comuna: string;
  createdAt?: Date;
  updatedAt?: Date;
}
