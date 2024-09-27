import { Router } from 'express';
import { cookieMiddleware } from '../adapters/middlewares/cookies.middleware';

const { newStatusController, getStatusController, updateStatusController, deleteStatusController, getSingleStatusController } = require('../adapters/controllers/status.controller');

const cookieparser = require('cookie-parser');
const router = Router();

/* Las rutas están en este orden para que el middleware Cookies NO afecte al login, pues en esta ruta se crea el jwt */

router.use(cookieparser());
router.use(cookieMiddleware);
router.post('/createStatus', newStatusController);
router.get('/getStatuses', getStatusController);
router.put('/updateStatus', updateStatusController);
router.delete('/deleteStatus/:id', deleteStatusController);
router.get('/getSingleStatus/:data', getSingleStatusController)


export default router;