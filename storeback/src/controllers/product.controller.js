import { productService } from "../services/index.js";
import { ERRORS } from "../utils.js";

const getProducts = async(req,res) => {

    try {
        const products = await productService.getAll();
        if(products.length>=1){  
            res.send({status:"success",payload:products})
        } else {     
            res.send({alertMessage: ERRORS.messages.errorProducts})
        }
    } catch (error) {
        res.send(error)
    }
}

const getProductById = async(req,res) => {
    try {
        let idToFind = req.params.id;
        console.log(idToFind);
        const products = await productService.getBy({_id:idToFind});
        if(products){  
             res.send({status:"success",payload:products})
        } else {     
        res.send({alertMessage: ERRORS.messages.errorProduct})
        }
    } catch (error) {
        res.send(error)
    }
}

const saveProduct = async(req,res) => {
    try{
        let product = req.body;
        if(product.name&&product.description&&product.code&&product.thumbnail&&product.price&&product.stock&&product.quantity){      
            let productToFind=product.code;
            let codeProduct = await productService.getBy({code:productToFind});
            if(codeProduct?.code==productToFind){
                res.send({alertMessage: ERRORS.messages.searchProduct})
            }else{               
                response=await productService.save(product);
                res.send({status:"success",payload:response});                
            }
            
        }
        
    } catch (error) {
        res.send(error);
    }
}
const updateProduct = async(req,res) => {
    try {
        let product = req.body;
        product.id=req.params.id;
        let productID = product.id;
        let productToUpdate = await productService.getBy({_id:productID});
        if(productToUpdate._id==productID){
            let response=await productService.update(product,productID);
            res.send({status:"success",payload:response});
        }
        else{
            res.send({alertMessage: ERRORS.messages.errorProduct});
        }
    } catch (error) {
        res.send(error);
    }
}
const deleteProduct = async(req,res)=>{
    try {
        let idToFind = req.params.id;        
        const product = await productService.getBy({_id:idToFind});
        if(product){ 
            await productService.delete(idToFind);
            res.send({alertMessage: 'Se borro correctamente'});
        } else {     
        res.send({alertMessage: ERRORS.messages.errorProduct})
        }                      
    } catch (error) {
        res.send(error);
    }

}

export default {getProducts,getProductById,saveProduct,updateProduct,deleteProduct}