import {Router} from 'express'
import cartController from '../controllers/cart.controller.js'

const cartRouter=Router();

cartRouter.get('/:id',cartController.getCart);
cartRouter.post('/:id/product',cartController.saveProductInCart);
cartRouter.delete('/:id/product/:id_prod',cartController.deleteProductInCart);
cartRouter.delete('/:id',cartController.dropProductsInCart);

export default cartRouter;