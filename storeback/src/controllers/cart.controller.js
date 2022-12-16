import { ERRORS } from "../utils.js";
import { cartService, productService, userService } from "../services/index.js";

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

    try {
        let cartIdToFind = req.params.id;   
        const productToSave = req.body;
        let productId=productToSave._id
        const cart = await cartService.saveProductToCart(cartIdToFind, productId);
        res.send(cart);
    } catch (error) {
        if (error.status) return res.status(error.status).send({ error: error });
        res.status(500).send({ status: 'error', error: error.message });
    }
  
}

const deleteProductInCart = async (req, res) => {
  
    try {
        const { id,id_prod} = req.params;
        const cart = await cartService.deleteProductCart(id,id_prod);
        res.send(cart);
    } catch (error) {
        if (error.status) return res.status(error.status).send({ error: error });
        res.status(500).send({ status: 'error', error: error.message });
    } 
};

const dropProductsInCart = async (req, res) => {
    try {
        let cartIdToFind = req.params.id;
        const cart = await cartService.emptyCart(cartIdToFind);
        res.send(cart);
    } catch (error) {
        if (error.status) return res.status(error.status).send({ error: error });
        res.status(500).send({ status: 'error', error: error.message });
    }
};

export default {getCart,saveProductInCart,deleteProductInCart,dropProductsInCart};

