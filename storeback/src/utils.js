import bcrypt from 'bcrypt'
import multer from 'multer'
import {fileURLToPath} from 'url'
import { dirname } from 'path'

/*Bcrypt*/
export const createHash = async(password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}
export const matchPassword = (user,password) => bcrypt.compare(password,user.password)

/*Configuracion para ruta a directorios*/
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

/*Configuro Multer*/
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+'/public/images')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

export const uploader= multer({storage});

/*Configuro mensajes de error*/

const errorCart = "No se encuentra el carrito";
const errorProduct = "Producto No Encontrado";
const errorProducts = "No hay productos";
const searchProduct ="Ya se encuentra el producto";
const searchCart ="Carrito encontrado";
const emptyCart="Se ha vaciado el carrito";

export const ERRORS = {
  messages: {
    errorCart,
    errorProduct,
    errorProducts,
    searchProduct,
    searchCart,
    emptyCart,
  },
};
