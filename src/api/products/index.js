const ProductsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'products',
  version: '1.0.0',
  register: async (server, { productsService }) => {
    const productsHandler = new ProductsHandler(productsService);
    server.route(routes(productsHandler));
  }
}