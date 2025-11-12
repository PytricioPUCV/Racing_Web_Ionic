
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware para manejar errores de validación
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg
      }))
    });
  }
  next();
};

// ============================================
// VALIDACIONES PARA AUTENTICACIÓN
// ============================================

export const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Debe contener mayúsculas, minúsculas y números'),
  
  body('name')
    .trim()
    .escape()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  handleValidationErrors
];

export const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
  
  handleValidationErrors
];

// ============================================
// VALIDACIONES PARA PRODUCTOS
// ============================================

export const productValidation = [
  body('name')
    .trim()
    .escape()
    .isLength({ min: 3, max: 255 })
    .withMessage('El nombre debe tener entre 3 y 255 caracteres'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  
  body('stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo'),
  
  handleValidationErrors
];

// ============================================
// VALIDACIONES PARA CARRITO
// ============================================

export const cartItemValidation = [
  body('productId')
    .isInt({ min: 1 })
    .withMessage('El ID del producto debe ser un número válido'),
  
  body('quantity')
    .isInt({ min: 1, max: 999 })
    .withMessage('La cantidad debe estar entre 1 y 999'),
  
  handleValidationErrors
];

// ============================================
// VALIDACIÓN DE ID EN PARÁMETROS
// ============================================

export const idParamValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  handleValidationErrors
];
