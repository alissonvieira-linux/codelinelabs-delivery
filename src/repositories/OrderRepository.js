const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OrderRepository {
  async store({ customer_name, amount, products, status = 'pending' }) {
    await prisma.order.create({
      data: {
        customer_name,
        amount,
        status,
        products,
      }
    });

    return;
  }

  async findAll() {
    const orders = await prisma.order.findMany();
    return orders;
  }

  async findOne(where) {
    const order = await prisma.order.findFirst({
      where,
    });

    return order;
  }

  async update({ data, where }) {
    await prisma.order.update({
      data,
      where
    });

    return;
  }
}

module.exports = new OrderRepository();