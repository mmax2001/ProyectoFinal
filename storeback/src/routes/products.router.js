import {Router} from 'express'
import productController from '../controllers/product.controller.js';

const productRouter=Router();

productRouter.get('/',productController.getProducts);
productRouter.get('/:id',productController.getProductById);
productRouter.delete('/:id',productController.deleteProduct);
productRouter.post('/',productController.saveProduct);
productRouter.put('/:id',productController.updateProduct);

export default productRouter;