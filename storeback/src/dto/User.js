export default class UserDtoToken {
    constructor(user){
        this.id=user._id;
        this.email=user.email;
        this.role=user.rol;
        this.cart=user.cart;
    }
    toObject=()=>{
        return {
            id:this.id,
            email:this.email,
            role:this.role,
            cart:this.cart
        }
    }
}