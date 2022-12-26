const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductRepository {
  async findAll() {
    const allProducts = await prisma.product.findMany();
    return allProducts;
  }

  async findOne(where) {
    const product = await prisma.product.findFirst({
      where,
    });

    return product;
  }

  async store({ sku, title, price, thumb_url = '' }) {
    await prisma.product.create({
      data: {
        sku,
        title,
        price,
        thumb_url,
        available: true,
      }
    });

    return;
  }

  async update({ data, where }) {
    await prisma.product.update({
      data,
      where
    });

    return;
  }

  async destroy(id) {
    await prisma.product.delete({ 
      where: { 
        id,
      } 
    });

    return;
  }
}

module.exports = new ProductRepository();