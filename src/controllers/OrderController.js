const orderRepository = require('../repositories/OrderRepository');
const orderStatus = require('../utils/order_status');

class OrderController {
  async create(request, response) {
    try {
      const { customer_name, products } = request.body;

      if (!customer_name || !products) {
        return response.status(400).json({ message: 'Os campos "customer_name" e "products" são obrigatórios.' });
      }

      const amount = products.reduce((acc, item) => {
        return acc += item.quantity * item.price
      }, 0);

      await orderRepository.store({
        customer_name,
        amount,
        products,
      });

      return response.status(201).send();

    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }

  async index(request, response) {
    try {
      const orders = await orderRepository.findAll();

      if (orders) {
        return response.json(orders);
      }

      return response.status(404).json({ message: 'Nenhum pedido encontrado.' });

    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'ID do pedido não enviado.' });
      }

      const order = await orderRepository.findOne({
        id: Number(id),
      });

      if (!order) {
        return response.status(404).json({ message: 'Nenhum pedido encontrado.' });
      }

      return response.json(order);

    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }

  async updateStatus(request, response) {
    try {
      const { status } = request.body;
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'ID do pedido não enviado.' });
      }

      if (!status) {
        return response.status(400).json({ message: 'Não foi possível atualizar o pedido, status não enviado.' });
      }

      if (status !== orderStatus.PENDING && status !== orderStatus.FINISHED && status !== orderStatus.PRODUCTION) {
        return response.status(400).json({ message: 'Status para atualização de pedido inválido.' });
      }

      await orderRepository.update({
        data: {
          status,
        },
        where: {
          id: Number(id),
        }
      });

      return response.status(204).send();

    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }
}

module.exports = new OrderController();