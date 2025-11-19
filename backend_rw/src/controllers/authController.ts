import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { encrypt, decrypt } from '../utils/encryption';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = '7d';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

const isValidRut = (rut: string): boolean => {
  const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
  return rutRegex.test(rut);
};

const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username, rut, region, comuna } = req.body;

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

    if (!isValidEmail(email)) {
      res.status(400).json({ 
        message: 'El formato del email es inválido',
        example: 'usuario@ejemplo.com'
      });
      return;
    }

    if (!isValidPassword(password)) {
      res.status(400).json({ 
        message: 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
      });
      return;
    }

    if (!isValidUsername(username)) {
      res.status(400).json({ 
        message: 'El nombre de usuario debe tener entre 3 y 20 caracteres (solo letras, números y guiones bajos)'
      });
      return;
    }

    if (!isValidRut(rut)) {
      res.status(400).json({ 
        message: 'El formato del RUT es inválido',
        example: '12.345.678-9'
      });
      return;
    }

    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      res.status(409).json({ message: 'El email ya está registrado' });
      return;
    }

    const existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const encryptedRut = encrypt(rut);
    const encryptedRegion = encrypt(region);
    const encryptedComuna = encrypt(comuna);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      rut: encryptedRut,
      region: encryptedRegion,
      comuna: encryptedComuna,
    });

    const token = jwt.sign(
      { 
        id: newUser.id, 
        email: newUser.email, 
        username: newUser.username,
        role: newUser.role
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
        rut: decrypt(newUser.rut),
        region: decrypt(newUser.region),
        comuna: decrypt(newUser.comuna),
        role: newUser.role
      },
    });

  } catch (error) {
    console.error('❌ Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email y contraseña son requeridos' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ message: 'El formato del email es inválido' });
      return;
    }

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      console.log(`Usuario con email ${email} no encontrado`);
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
      return;
    }
    
    console.log(`Usuario encontrado: ${user.email}`);
    console.log(`Hash almacenado: ${user.password}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`Resultado bcrypt.compare: ${isPasswordValid}`);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
      return;
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        username: user.username,
        role: user.role
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
        rut: decrypt(user.rut),
        region: decrypt(user.region),
        comuna: decrypt(user.comuna),
        role: user.role
      },
    });

  } catch (error) {
    console.error('❌ Error en el login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

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

    const decoded = jwt.verify(token, JWT_SECRET) as any;

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
        rut: decrypt(user.rut),
        region: decrypt(user.region),
        comuna: decrypt(user.comuna),
        role: user.role
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
