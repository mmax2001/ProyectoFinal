import dotenv from 'dotenv';
dotenv.config();

const DEV_PORT = 8080;
const config = {
    server : {
        PORT:DEV_PORT,
    },
    
    MONGO_DB: {
    URL: process.env.MONGO_URL,
    DB_NAME: process.env.MONGO_DB_NAME,
    },
    JWT:{
      COOKIE: process.env.JWT_COOKIE,
      SECRET: process.env.JWT_SECRET,
    },

    ROOT :{
      EMAIL:process.env.ADMIN_USER,
      PASSWORD:process.env.ADMIN_PASS,
    },

}
console.log("ESTO TENGO EN MONGO URL",process.env.MONGO_URL)
console.log("Y USO ESTA CONEXION",config.MONGO_DB.URL)
console.log("Y USO ESTE EMAIL",config.ROOT.EMAIL)
export default config;