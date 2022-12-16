import express from 'express'
import cors from 'cors';
import config from './src/config/config.js';
import { __dirname } from './src/utils.js';
import usersRouter from './src/routes/users.router.js';
import sessionRouter from './src/routes/session.router.js';
import productRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/cart.router.js';
import session, { Session } from 'express-session';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:"Api para ecommerce",
            description:"Esta documentacion describe y permite probar la api"
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
const specs=swaggerJSDoc(swaggerOptions);

app.use(cors({credentials:true,origin:'http://localhost:3000'}));

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs));


app.use('/api/users',usersRouter);
app.use('/api/sessions',sessionRouter);
app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter);

const server=app.listen(8080,()=>console.log(`Servidor http escuchando en la direccion y puerto http://localhost:${config.server.PORT}`))