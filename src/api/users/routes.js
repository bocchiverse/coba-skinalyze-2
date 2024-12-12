const routes = (handler) => [
    {
      method: 'POST',
      path: '/',
      handler: handler.postUsersHandler,
    },
    {
      method: 'PUT',
      path: '/{id}',
      handler: handler.updateUsersHandler,
    },
    {
      method: 'DELETE',
      path: '/{id}',
      handler: handler.deleteUsersHandler,
    },
    {
      method: 'GET',
      path: '/',
      handler: handler.getUsersHandler,
    },
    {
      method: 'GET',
      path: '/{id}',
      handler: handler.getUsersByIdHandler,
    },
  ];
  
  module.exports = routes;
  