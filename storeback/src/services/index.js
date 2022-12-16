import Dao from "../models/dao.js";
import UserService from "./UserService.js";
import CartService from "./CartService.js";
import ProductService from "./ProductService.js";
import config from "../config/config.js";

const dao = new Dao(config);

export const userService = new UserService(dao);
export const productService =  new ProductService(dao);
export const cartService = new CartService(dao);