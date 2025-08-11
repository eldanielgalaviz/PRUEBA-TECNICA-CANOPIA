import { body } from 'express-validator';

export const categoriesCreateValidation = [
  body('name').isString().notEmpty().withMessage('name is required'),
  body('description').optional().isString().withMessage('description must be a string')
];

