const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postIngredientsHandler,
  },
  {
    method: 'PUT',
    path: '/{id}',
    handler: handler.updateIngredientsHandler,
  },
  { 
    method: 'DELETE',
    path: '/{id}',
    handler: handler.deleteIngredientsHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getIngredientsHandler,
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getIngredientsByIdHandler,
  },
  {
    method: 'GET',
    path: '/skintype/{id_skintype}',
    handler: handler.getIngredientsBySkintypeHandler,
  },
];

module.exports = routes;
