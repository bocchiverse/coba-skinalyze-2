const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postSkintypesHandler,
  },
  {
    method: 'PUT',
    path: '/{id}',
    handler: handler.updateSkintypesHandler,
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: handler.deleteSkintypesHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getSkintypesHandler,
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getSkintypesByIdHandler,
  },
];

module.exports = routes;
