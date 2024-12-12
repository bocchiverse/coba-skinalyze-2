const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postHistoriesHandler,
  },
  {
    method: 'PUT',
    path: '/{id}',
    handler: handler.updateHistoriesHandler,
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: handler.deleteHistoriesHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getHistoriesHandler,
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getHistoriesByIdHandler,
  },
];

module.exports = routes;
