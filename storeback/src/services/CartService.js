import CentralRepository from "./CentralRepository.js";
import Cart from "../models/cart.js";
import { cartService, productService } from "./index.js";


export default class CartService extends CentralRepository {
    constructor(dao){
        super(dao,Cart.collection)
    }
    
    getCartById = async (id) => {
        let result = await this.getBy(id);
        if (!result) throw { status: 404, error: 'Carrito no encontrado' };
        return result;
    };

    saveProductToCart = async (id, productId) => {
        const cart = await this.getBy({_id:id});
        if (!cart) throw { status: 404, error: 'Carrito no encontrado' };
        const productInput = await productService.getBy({_id:productId});
        if (!productInput) throw { status: 404, error: 'Producto no encontrado' };    

        if (cart.products.length >= 0) {
            productInput.quantity++;
            const existProduct = cart.products.find((p) => p._id == productId);
            if (existProduct) existProduct.quantity++;
            else cart.products.push(productInput);
        }

        return cartService.update(cart,id);
    }

    deleteProductCart = async (id, productId) => {
        const cart = await this.getBy({_id:id});
        if (!cart) throw { status: 404, error: 'Carrito no encontrado' };
        const product = cart.products.find((e) => (e._id.valueOf())==productId);
        if (!product) throw { status: 404, error: 'Producto no encontrado' };

        if (product.quantity >= 1) {
            product.quantity--;
        } else {
            cart.products = cart.products.filter((e) => e.product._id != productId);
        }
        return cartService.update(cart,id);
    };

    emptyCart = async (id) => {
        const cart = await this.getBy({_id:id});
        if (!cart) throw { status: 404, error: 'Carrito no encontrado' };
        cart.products=[];
        return await this.update(cart,id);
    };

}