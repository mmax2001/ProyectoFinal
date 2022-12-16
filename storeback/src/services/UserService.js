import CentralRepository from "./CentralRepository.js";
import User from "../models/users.js";

export default class UserService extends CentralRepository{
    constructor(dao){
        super(dao,User.collection)
    }
}