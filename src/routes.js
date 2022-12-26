const { Router } = require('express');

const OrderController = require('./controllers/OrderController');
const ProductController = require('./controllers/ProductController');

const routes = Router();

// Product routes
routes.post('/products', ProductController.create);
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.put('/products/:id/availability', ProductController.updateAvailability);
routes.delete('/products/:id', ProductController.delete);

// Order routes
routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.index);
routes.get('/orders/:id', OrderController.show);
routes.put('/orders/:id/status', OrderController.updateStatus);

module.exports = routes;