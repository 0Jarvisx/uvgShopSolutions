import { Router } from 'express';
import { cookieMiddleware } from '../adapters/middlewares/cookies.middleware';
const { newCategoryController, updateCategoryController, deleteCategoryController, getCategoriesController, getSingleCategoryController } = require('../adapters/controllers/category.controller');
const cookieparser = require('cookie-parser');
const router = Router();

router.get('/getCategories', getCategoriesController);

router.use(cookieparser());
router.use(cookieMiddleware);
router.post('/createCategory', newCategoryController);
router.put('/updateCategory', updateCategoryController);
router.delete('/deleteCategory/:id', deleteCategoryController);
router.get('/getSingleCategory/:data', getSingleCategoryController);

export default router;