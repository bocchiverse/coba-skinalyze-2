const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postProductsHandler,
  },
  {
    method: 'PUT',
    path: '/{id}',
    handler: handler.updateProductsHandler,
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: handler.deleteProductsHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getProductsHandler,
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getProductsByIdHandler,
  },
  // New route for getting products by skintype
  {
    method: 'GET',
    path: '/skintype/{id_skintype}',
    handler: handler.getProductsBySkinTypeHandler,
  },
];

module.exports = routes;
