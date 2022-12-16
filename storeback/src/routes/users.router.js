import {Router} from 'express'
import userControllers from '../controllers/user.controller.js';


const router=Router();

router.get('/',userControllers.getUsers);

export default router;