import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { JWT_SECRET } from '../config';

export interface AuthRequest extends Request {
  userId?: number;
  userEmail?: string;
  user?: {
    id: number;
    email: string;
    username: string;
    role: string;
  };
}

interface TokenPayload {
  id: number;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const [scheme, token] = req.headers.authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return;
  }

  let decoded: TokenPayload;
  try {
    decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as TokenPayload;
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
    return;
  }

  try {
    // El rol y la existencia del usuario se leen de la BD en cada request,
    // así un usuario eliminado o degradado pierde el acceso de inmediato.
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'email', 'username', 'role']
    });

    if (!user) {
      res.status(401).json({ message: 'Token inválido o expirado' });
      return;
    }

    req.userId = user.id;
    req.userEmail = user.email;
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('❌ Error al validar usuario del token:', error);
    res.status(500).json({ message: 'Error al validar la sesión' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Se requieren permisos de administrador' });
    return;
  }
  next();
};
