import { Router } from 'express';
import { createProduct, listProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';
import { productCreateValidation } from '../validators/productValidator';
import { validationHandler } from '../middleware/validationHandler';

const router = Router();

router.use(authMiddleware); // todas requieren auth

router.get('/', listProducts);
router.post('/', productCreateValidation, validationHandler, createProduct);
router.get('/:id', getProduct);
router.put('/:id', productCreateValidation, validationHandler, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
