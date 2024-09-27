import { Router } from 'express';
import { cookieMiddleware } from '../adapters/middlewares/cookies.middleware';

const { loginUserController, newUserController, getUsersController, updateUserController, deleteUserController, getSingleUserController } = require('../adapters/controllers/user.controller');

const cookieparser = require('cookie-parser');
const router = Router();

/* Las rutas están en este orden para que el middleware Cookies NO afecte al login, pues en esta ruta se crea el jwt */
router.post('/auth/:email', loginUserController);
router.post('/Register', newUserController);
router.use(cookieparser());
router.use(cookieMiddleware);
router.post('/CreateNewUser', newUserController);
router.get('/getUsers', getUsersController);
router.put('/updateUser', updateUserController);
router.delete('/deleteUser/:id', deleteUserController);
router.get('/getSingleUser/:data', getSingleUserController)


export default router;