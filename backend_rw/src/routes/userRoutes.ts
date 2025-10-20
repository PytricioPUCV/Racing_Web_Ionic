import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../models';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, username, rut, region, comuna } = req.body;
    if (!email || !password || !username || !rut || !region || !comuna) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      email,
      password: hashedPassword,
      username,
      rut,
      region,
      comuna,
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      rut: newUser.rut,
      region: newUser.region,
      comuna: newUser.comuna,
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
});

export default router;