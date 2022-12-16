import mongoose from "mongoose";

export default class Order{

    static get collection(){
        return 'Orders';
    }

    static get schema(){
        return {
            items:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'Products',
            },
            number_order: {type:String,require:true,max:100},
            email: {type:String,require:true},
            adress:{type:String,require:true,max:100},
            
        }
    }
}
