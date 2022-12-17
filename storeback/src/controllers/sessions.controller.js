import config from "../config/config.js";
import UserDtoToken from "../dto/User.js";
import { cartService, userService } from "../services/index.js";
import { createHash } from "../utils.js";
import jwt from 'jsonwebtoken';



const register = async (req,res) => {
    let {name,surname,email,age,adress,phone,password}=req.body;
    
    try{
        if(!req.file) return res.status(500).send({status:"error",error:"Error en carga de imagen"})
        let user = await userService.getBy({email});
        if(user) return res.status(400).send({status:"error",error:"El usuario ya existe"})
        let cart = await cartService.save({products:[]});
        const hashedPassword = await createHash(password);
        const newUser={
            name,
            surname,
            email,
            age,
            adress,
            phone,
            password:hashedPassword,
            cart:cart._id,
            avatar:`${req.protocol}://${req.hostname}:${process.env.PORT}/images/${req.file.filename}`
        }
        let result = await userService.save(newUser);
        res.send({status:"success",message:"Usuario agregado"});

    }catch(error){
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
    
}

const login = async (req,res)=>{
    let {email,password}=req.body;
    if(!email||!password) return res.status(400).send({status:"error",error:"Complete empty values"})
    if(email===config.ROOT.EMAIL && password===config.ROOT.PASSWORD){
        const admin = {
            id:0,
            role:"admin"           
        }
        const token=jwt.sign(admin,config.JWT.SECRET,{expiresIn:"10m"});
        return res.cookie(config.JWT.COOKIE,token,{maxAge:60000}).send({status:"success",payload:{user:admin}});

    }
    const user = await userService.getBy({email});
    if(!user) return res.status(404).send({status:"error",error:"User not found"});
    const userToToken=new UserDtoToken(user);
    const token=jwt.sign(userToToken.toObject(),config.JWT.SECRET,{expiresIn:"1h"});
    res.cookie(config.JWT.COOKIE,token,{maxAge:360000}).send({status:"success",payload:{user:userToToken}});
    
}

export default {register,login}