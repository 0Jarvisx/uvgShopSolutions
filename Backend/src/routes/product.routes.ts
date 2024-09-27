import { Router } from 'express';
import { cookieMiddleware } from '../adapters/middlewares/cookies.middleware';
const { newProductController, getProductsController, deleteProductController, updateProductController, getSingleProductController, createReviewController } = require('../adapters/controllers/product.controller')
const router = Router();

router.get('/getProducts', getProductsController);
const cookieparser = require('cookie-parser');
router.use(cookieparser());
router.use(cookieMiddleware);


router.post('/createProduct', newProductController);
router.put('/updateProduct', updateProductController);
router.delete('/deleteProduct/:id', deleteProductController);
router.get('/getSingleProduct/:data', getSingleProductController);
router.post('/createReview/:product_id', createReviewController);



export default router;