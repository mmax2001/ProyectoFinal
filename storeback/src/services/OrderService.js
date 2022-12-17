import { transporter } from "../config/nodemailer.js";
import CentralRepository from "./CentralRepository.js";
import { cartService } from "./index.js";
import Order from "../models/order.js";

export default class OrderServices extends CentralRepository{
  constructor(dao) {
    super(dao,Order.collection)
  }

  finalOrder = async (name,email,adress,idCart) => {
    const orderToCart = await cartService.getBy(idCart);
    if (!orderToCart) throw { status: 404, error: 'Carrito no encontrado' };
    if (orderToCart.products.length == 0) throw { status: 400, error: 'No se encontraron productos para generar la orden de compra' };

    let totalOrders = await this.getAll();

    let order = {
      items: orderToCart.products,
      number_order: totalOrders.length++,
      email: email,
      adress: adress,
    };

    let productosEnOrden = '';
    let totalEnOrden = 0;
    carritoOrden.productos.forEach((p) => {
      productosEnOrden += `<tr border:1px>
                          <td border:1px>${p.producto.nombre}</td>
                          <td border:1px>${p.producto.precio}</td>
                          <td border:1px>${p.cantidad}</td>
                         </tr border:1px>`;
      totalEnOrden += p.producto.precio * p.cantidad;
    });
    //send email
    let message = `<html>
                    <head>
                    <style>
                    table, td, th {
                      border: 1px solid black;
                    }
                    table {
                      border-collapse: collapse;
                      width: 100%;
                    }
                    td {
                      text-align: center;
                    }
                    </style>
                    </head>
                    <body>
                      <h1> Hola ${name} gracias por tu compra!</h1>
                        <p> Estos son los datos de la misma </p>
                        <div> 
                          <p>Nº de compra: ${order.number_order}</p>
                          <table border:1px>
                            <tr border:1px>
                              <th border:1px>Producto</th>
                              <th border:1px>Importe Unitario</th>
                              <th border:1px>Cantidad</th>
                            </tr border:1px>
                            ${productosEnOrden} 
                          </table border:1px> 
                        </div>
                        <p> Total de la orden: ${totalEnOrden} </p>
                        <p> La misma se enviará a ${adress}</p>
                        <p> ¡Muchas gracias por tu compra!</p>
                    </body>
                  </html>`;

    let result = await transporter.sendMail({
      from: 'Compras',
      to: email,
      subject: 'Compra Finalizada',
      html: message,
    });

    if (result) {
      cartService.emptyCart(cartId);
    }

    return await this.save(order);
  };
}


