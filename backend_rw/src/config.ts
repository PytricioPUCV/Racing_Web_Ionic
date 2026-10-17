import 'dotenv/config';
import { SignOptions } from 'jsonwebtoken';

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Falta la variable de entorno obligatoria ${name}`);
  }
  return value;
};

export const JWT_SECRET = requireEnv('JWT_SECRET');
export const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'];
export const ENCRYPTION_KEY = requireEnv('ENCRYPTION_KEY');
