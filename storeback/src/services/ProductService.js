import CentralRepository from "./CentralRepository.js";
import Product from "../models/product.js";

export default class ProductService extends CentralRepository {
    constructor(dao){
        super(dao,Product.collection)
    }

}