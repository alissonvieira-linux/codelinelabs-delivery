const productRepository = require('../repositories/ProductRepository');

class ProductController {
  async index(request, response) {
    try {
      const products = await productRepository.findAll();

      return response.json(products);

    } catch (error) {
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'ID do produto não enviado.' });
      }

      const product = await productRepository.findOne({
        id: Number(id),
      });

      if (!product) {
        return response.status(404).json({ message: 'Nenhum produto encontrado.' });
      }

      return response.json(product);

    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }

  async create(request, response) {
    try {
      const { sku, title, price, thumb_url } = request.body;

      if (!sku || !title || !price) {
        return response.status(400).json({ message: 'SKU, título e preço são obrigatórios.' });
      }

      await productRepository.store({ sku, title, price, thumb_url });

      return response.status(201).send();

    } catch (error) {
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }

  async updateAvailability(request, response) {
    try {
      const { id } = request.params;
      const { available } = request.body;

      if (!id) {
        return response.status(400).json({ message: 'ID do produto não enviado.' });
      }

      await productRepository.update({ 
        data: {
          available: available ? available : false,
        },
        where: {
          id: Number(id),
        }
      });

      return response.status(200).send();
    } catch (error) {
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ message: 'ID do produto não enviado.' });
      }

      await productRepository.destroy(Number(id));

      return response.status(200).send();

    } catch (error) {
      return response.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }
}

module.exports = new ProductController();