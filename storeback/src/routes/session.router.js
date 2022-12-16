import {Router} from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import { uploader } from '../utils.js';
const sessionRouter = Router();

sessionRouter.post('/register',uploader.single('avatar'),sessionsController.register);
sessionRouter.post('/login',sessionsController.login);

export default sessionRouter;