import { orderService } from "../services/index.js";

const endOrder = async (req, res) => {
  try {
    const { name, email, adress, idCart } = req.body.data;
    const order = await orderService.finalOrder(name, email, adress, idCart);
    res.send(order);
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

export default {endOrder};