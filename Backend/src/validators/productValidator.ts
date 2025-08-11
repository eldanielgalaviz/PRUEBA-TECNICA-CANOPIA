import { body } from 'express-validator';

export const productCreateValidation = [
  body('name').isString().notEmpty().withMessage('name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('price must be a number > 0'),
  body('stock').optional().isInt({ min: 0 }).withMessage('stock must be integer >= 0'),
  body('category_id').optional().isInt().withMessage('category_id must be integer'),
];
