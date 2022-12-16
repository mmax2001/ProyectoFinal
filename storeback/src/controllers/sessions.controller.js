import config from "../config/config.js";
import UserDtoToken from "../dto/User.js";
import { cartService, userService } from "../services/index.js";
import { createHash } from "../utils.js";
import jwt from 'jsonwebtoken';



const register = async (req,res) => {
    let {name,surname,email,age,adress,phone,password}=req.body;
    console.log("REQ TIENE",req.file);
    console.log("REQ BODY TIENE 1",req.body);
    try{
        if(!req.file) return res.status(500).send({status:"error",error:"Error en carga de imagen"})
        console.log("ENTRO A TRY!",userService)
        let user = await userService.getBy({email});
        console.log("PASO GETBY",user)
        if(user) return res.status(400).send({status:"error",error:"El usuario ya existe"})
        let cart = await cartService.save({products:[]});
        const hashedPassword = await createHash(password);
        console.log("REQ BODY TIENE 2",req.body);
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
    console.log("ESTO ES CONFIG.ROOT",config.ROOT.EMAIL)
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
    const {data}=res;
    console.log(res);
    //localStorage.setItem('user',JSON.stringify(data.payload.user));
    // const decoded  = jwt.verify(userToToken,config.JWT.COOKIE);
    // console.log(decoded);

}

export default {register,login}