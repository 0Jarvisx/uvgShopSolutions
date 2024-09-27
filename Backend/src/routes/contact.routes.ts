import { Router } from 'express';
import { cookieMiddleware } from "../adapters/middlewares/cookies.middleware";
const { newContactController, getAllContactController, changeStatusController } = require('../adapters/controllers/contact.controller')
const cookieParser = require('cookie-parser');
const router = Router();

router.post('/createContact', newContactController);
router.use(cookieParser());
router.use(cookieMiddleware);
router.get('/getContacts', getAllContactController);
router.put('/changeStatus', changeStatusController);

export default router;