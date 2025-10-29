import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = '7d';

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, al menos una letra y un número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

const isValidRut = (rut: string): boolean => {
  // Formato chileno: 12.345.678-9 o 12.345.678-K
  const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
  return rutRegex.test(rut);
};

const isValidUsername = (username: string): boolean => {
  // Entre 3 y 20 caracteres, solo letras, números y guiones bajos
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// ============================================
// CONTROLADORES
// ============================================

// POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username, rut, region, comuna } = req.body;

    // 1. Validar campos requeridos
    if (!email || !password || !username || !rut || !region || !comuna) {
      res.status(400).json({ 
        message: 'Todos los campos son requeridos',
        missing: {
          email: !email,
          password: !password,
          username: !username,
          rut: !rut,
          region: !region,
          comuna: !comuna
        }
      });
      return;
    }

    // 2. Validar formato de email
    if (!isValidEmail(email)) {
      res.status(400).json({ 
        message: 'El formato del email es inválido',
        example: 'usuario@ejemplo.com'
      });
      return;
    }

    // 3. Validar contraseña
    if (!isValidPassword(password)) {
      res.status(400).json({ 
        message: 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
      });
      return;
    }

    // 4. Validar username
    if (!isValidUsername(username)) {
      res.status(400).json({ 
        message: 'El nombre de usuario debe tener entre 3 y 20 caracteres (solo letras, números y guiones bajos)'
      });
      return;
    }

    // 5. Validar RUT chileno
    if (!isValidRut(rut)) {
      res.status(400).json({ 
        message: 'El formato del RUT es inválido',
        example: '12.345.678-9'
      });
      return;
    }

    // 6. Verificar si el email ya existe
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      res.status(409).json({ message: 'El email ya está registrado' });
      return;
    }

    // 7. Verificar si el username ya existe
    const existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
      return;
    }

    // 8. Verificar si el RUT ya existe
    const existingUserByRut = await User.findOne({ where: { rut } });
    if (existingUserByRut) {
      res.status(409).json({ message: 'El RUT ya está registrado' });
      return;
    }

    // 9. Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 10. Crear usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      rut,
      region,
      comuna,
    });

    // 11. Generar token JWT
    const token = jwt.sign(
      { 
        id: newUser.id, 
        email: newUser.email, 
        username: newUser.username 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    console.log(`✅ Usuario registrado: ${newUser.email} (ID: ${newUser.id})`);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        rut: newUser.rut,
        region: newUser.region,
        comuna: newUser.comuna,
      },
    });

  } catch (error) {
    console.error('❌ Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Validar campos requeridos
    if (!email || !password) {
      res.status(400).json({ message: 'Email y contraseña son requeridos' });
      return;
    }

    // 2. Validar formato de email
    if (!isValidEmail(email)) {
      res.status(400).json({ message: 'El formato del email es inválido' });
      return;
    }

    // 3. Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
      return;
    }

    // 4. Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
      return;
    }

    // 5. Generar token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        username: user.username 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    console.log(`✅ Login exitoso: ${user.email} (ID: ${user.id})`);

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        rut: user.rut,
        region: user.region,
        comuna: user.comuna,
      },
    });

  } catch (error) {
    console.error('❌ Error en el login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// GET /api/auth/verify
export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ 
        valid: false, 
        message: 'Token no proporcionado' 
      });
      return;
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Buscar usuario en la base de datos
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      res.status(401).json({ 
        valid: false, 
        message: 'Usuario no encontrado' 
      });
      return;
    }

    console.log(`✅ Token verificado: ${user.email}`);

    res.json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        rut: user.rut,
        region: user.region,
        comuna: user.comuna,
      },
    });

  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.log('⚠️ Token expirado');
      res.status(401).json({ 
        valid: false, 
        message: 'Token expirado',
        expired: true
      });
      return;
    }

    console.error('❌ Error al verificar token:', error);
    res.status(401).json({ 
      valid: false, 
      message: 'Token inválido' 
    });
  }
};
