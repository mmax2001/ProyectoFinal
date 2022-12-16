import { userService } from "../services/index.js";


const getUsers = async(req,res) => {
    const result = await userService.getAll();
    res.send({status:"success",payload:result})
}

export default{ 
    getUsers    
}