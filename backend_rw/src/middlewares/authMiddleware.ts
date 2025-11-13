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
    // Obtener token del header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token no proporcionado' });
      return;
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Agregar datos del usuario al request (formato antiguo - para compatibilidad)
    req.userId = decoded.id;
    req.userEmail = decoded.email;

    // Agregar datos del usuario al request (formato nuevo - para los nuevos controladores)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      rut: decoded.rut,
      role: decoded.role || 'user' // ✅ NUEVO: Agregar rol desde el token
    };

    console.log(`✅ Token verificado - Usuario: ${req.user.email} (Rol: ${req.user.role})`);
    
    next();
  } catch (error) {
    console.error('❌ Token inválido:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
    return;
  }
};
