import { Router } from 'express';
import { cookieMiddleware } from '../adapters/middlewares/cookies.middleware';
const { addToCartController, getCartController, updateDetailController, deleteCartController, deleteDetailController, getAllCartsController, updateCartController, payOrderController } = require('../adapters/controllers/order.controller');

const router = Router();
const cookieparser = require('cookie-parser');
router.use(cookieparser());
router.use(cookieMiddleware);

router.post('/addtoCart/:user_id', addToCartController); //AGREGAR PRODUCTO A CARRITO, CREAR ORDEN CON ESTADO EN CARRITO EN CASO NO EXISTA
router.get('/getCart/:user_id', getCartController); // Obtener Carrito
router.get('/getAllCarts', getAllCartsController); // Obtener todos las ordenes
router.put('/updateCart', updateCartController); // Actualizar una orden (direccion, card, nit)
router.put('/updateDetail/:order_id', updateDetailController); // Actualizar un detalle
router.delete('/deleteCart/:order_id', deleteCartController); // Eliminar Orden junto con sus detalles
router.delete('/deleteDetail/:order_id/:id', deleteDetailController); // Eliminar un detalle
router.post('/payOrder', payOrderController) // Validar datos de tarjeta y pago

export default router;