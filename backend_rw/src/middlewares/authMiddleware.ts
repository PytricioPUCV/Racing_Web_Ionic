import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export interface AuthRequest extends Request {
  userId?: number;
  userEmail?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // Obtener token del header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token no proporcionado' });
      return;
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Agregar datos del usuario al request
    req.userId = decoded.id;
    req.userEmail = decoded.email;

    console.log(`✅ Token verificado - Usuario ID: ${req.userId}`);
    
    next(); // Continuar con la siguiente función
  } catch (error) {
    console.error('❌ Token inválido:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
    return;
  }
};
