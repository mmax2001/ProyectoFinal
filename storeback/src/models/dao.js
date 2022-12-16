import mongoose from "mongoose"
import config from "../config/config.js"
import User from "./users.js"
import Cart from "./cart.js"
import Product from "./product.js"
import Order from "./order.js"


export default class Dao {
    constructor(config){
        //console.log("LA CONEXION ES HACIA ",config.MONGO_DB.URL)
        mongoose.set('strictQuery', false);
        this.mongoose=mongoose.connect(config.MONGO_DB.URL)
        .then(() => {console.log('connected to db');})
        .catch((err) => {console.log(err.message);});
        console.log("CONECTO")
        
        const timestamps={timestamps:{createdAt:'creado_en',updatedAt:'actualizado_en'}}
        const userSchema=mongoose.Schema(User.schema,timestamps);
        const cartSchema=mongoose.Schema(Cart.schema,timestamps);
        const productSchema=mongoose.Schema(Product.schema,timestamps);
        const orderSchema=mongoose.Schema(Order.schema,timestamps);

        this.models={
            [User.collection]: mongoose.model(User.collection,userSchema),
            [Cart.collection]: mongoose.model(Cart.collection,cartSchema),
            [Product.collection]: mongoose.model(Product.collection,productSchema),
            [Order.collection]: mongoose.model(Order.collection,orderSchema)
        }
    }
    getAll = async(options,entity) => {
        if(!this.models[entity]) throw new Error((`La entidad o coleccion no existe`));
        let result=await this.models[entity].find(options).lean();
        return result;
    }

    findOne = async(options,entity) => {
        if(!this.models[entity]) throw new Error((`La entidad o coleccion no existe`));
        let result=await this.models[entity].findOne(options).lean();
        return result;
    }

    save = async(document,entity) => {
        if(!this.models[entity]) throw new Error((`La entidad o coleccion no existe`));
        let result= await this.models[entity].create(document);
        return result;
    }

    update = async(data,id,entity)=>{
        console.log("UPDATE")
        if(!this.models[entity]) throw new Error((`La entidad o coleccion no existe`));
        try {
            const response = await this.models[entity].findByIdAndUpdate(id, data, {
            new: true,
            });
        return response;
        } catch (error) {
        return error;
        }
    }

    delete = async(options,entity)=>{
        console.log('DELETE');
        if(!this.models[entity]) throw new Error((`La entidad o coleccion no existe`));
        let result = await this.models[entity].deleteOne({_id:options});
        return result;
    }

}