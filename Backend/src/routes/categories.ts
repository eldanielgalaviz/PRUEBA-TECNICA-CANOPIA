import { Router } from 'express';
import { createcategories, listcategories, getcategories, updatecategories, deletecategories } from '../controllers/categoriesController';
import { authMiddleware } from '../middleware/authMiddleware';
import { categoriesCreateValidation } from '../validators/categoriesValidator';
import { validationHandler } from '../middleware/validationHandler';

const router = Router();

router.use(authMiddleware); // todas requieren auth

router.get('/', listcategories);
router.post('/', categoriesCreateValidation, validationHandler, createcategories);
router.get('/:id', getcategories);
router.put('/:id', categoriesCreateValidation, validationHandler, updatecategories);
router.delete('/:id', deletecategories);

export default router;
