import CentralRepository from "./CentralRepository.js";
import Cart from "../models/cart.js";

export default class CartService extends CentralRepository {
    constructor(dao){
        super(dao,Cart.collection)
    }

}