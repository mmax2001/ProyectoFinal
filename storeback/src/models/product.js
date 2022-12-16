
export default class Product{
    static get collection() {
        return 'Products';        
    }

    static get schema(){
        return{
            name: {type:String,require:true,max:100},
            description: {type:String,require:true},
            code: {type:Number,require:true},
            thumbnail: {type:String,require:true},
            price: {type:Number,require:true},
            stock: {type:Number,require:true},
            quantity: {type:Number,require:true},
        }
    }
}