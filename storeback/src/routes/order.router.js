import { Router } from 'express';
import orderController from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/',orderController.endOrder);

export default orderRouter;