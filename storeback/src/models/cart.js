import mongoose from "mongoose";

export default class Cart{

    static get collection(){
        return 'Carts';
    }

    static get schema(){
        return {
            products:[
                {
                    product:{
                        type:mongoose.SchemaTypes.ObjectId,
                        ref:'Products'
                    },
                    quantity:{
                        type:Number,
                        default:1
                    }
                }
            ]
        }
    }
}