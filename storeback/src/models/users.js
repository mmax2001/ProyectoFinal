import mongoose from "mongoose";

export default class User{

    static get collection(){
        return 'Users';
    }

    static get schema(){
        return {
            name: {type:String,require:true,max:100},
            surname: {type:String,require:false,max:100},
            email: {type:String,require:false},
            password:{type:String,require:true,max:20},
            age:{type:String,require:true,max:3},
            adress:{type:String,require:true,max:100},
            phone:{type:String,requier:true,max:15},
            role:{
                type:String,
                enum:['user','admin'],
                default:'user'
            },
            avatar:{type:String},
            cart:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'Carts',
            }
        }
    }
}