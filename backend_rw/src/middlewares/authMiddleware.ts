import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export interface AuthRequest extends Request {
  userId?: number;
  userEmail?: string;
  user?: {
    id: number;
    email: string;
    username: string;
    rut: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token no proporcionado' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    req.userId = decoded.id;
    req.userEmail = decoded.email;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      rut: decoded.rut,
      role: decoded.role || 'user'
    };

    console.log(`✅ Token verificado - Usuario: ${req.user.email} (Rol: ${req.user.role})`);
    
    next();
  } catch (error) {
    console.error('❌ Token inválido:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
    return;
  }
};
