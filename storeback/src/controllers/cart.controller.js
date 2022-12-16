import CartService from "../services/CartService.js";
import { ERRORS } from "../utils.js";
import productController from '../controllers/product.controller.js';
import { cartService, productService, userService } from "../services/index.js";
cartService


const getCart = async(req,res) => {
    
    try {   
        let cartIdToFind = req.params.id;        
        console.log(cartIdToFind);
        const cartToFind = await cartService.getBy({_id:cartIdToFind});
        console.log("El id de cart es:",cartToFind._id.valueOf());
        if(cartToFind){  
            res.send({status:"success",payload:cartToFind})
        } else {     
            res.send({alertMessage: ERRORS.messages.errorCart})
        }
    } catch (error) {
        res.send(error)
    }
}

const saveProductInCart = async(req,res) => {

    try{

        //recibo por parametros el ID del carrito a agregar productos
        let cartIdToFind = req.params.id;
        console.log("EL PARAMETRO ID DE CARRITO ES",cartIdToFind)
        //recibo por body el producto a agregar al carrito        
        const productToSave = req.body;
        //busco el carrito
        const cartToFind = await cartService.getBy({_id:cartIdToFind});
        console.log("Los productos en el carrito son :",cartToFind.products);
        let arrayProducts=cartToFind.products;
        console.log("el array tiene",arrayProducts);
        arracartToFind.products.push(productToSave);
        console.log("El producto agregado es",cartToFind.products)
        
        if(cartToFind){
            const prodToAdd = await cartService.update(cartToFind.products,cartIdToFind);  
        //     //let productToUpdate = await productService.getBy({_id:productID});
        //     //actualizo el stock y la cantidad del producto
            
        //     let codeProduct=productToSave.code;
        //     //Busco y actualizo el producto en mongo 
        //     let productToUpdate = await productService.getBy({code:codeProduct});
        //     console.log("El producto a actualizar es",productToUpdate)
        //     productToUpdate.stock=productToUpdate.stock-1;
        //     productToUpdate.quantity=productToUpdate.quantity-1;
        //     let productID=productToUpdate._id.valueOf();
        //     console.log("el producto a actualizar tiene el stock en :",productToUpdate.stock);                        
        //     let response=await productService.update(productToUpdate,productID);

        //     let productToUpdate2 = await productService.getBy({code:codeProduct});
        //     console.log("El producto a actulizado es",productToUpdate2)

        //     res.send({status:"success",payload:prodToAdd})
        // } else {     
        //     res.send({alertMessage: ERRORS.messages.errorProduct})
        // }
        }  
    }catch (error) {
        res.send(error)
    }
}

export default {getCart,saveProductInCart};

