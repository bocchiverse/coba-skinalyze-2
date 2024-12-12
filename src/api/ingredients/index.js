const IngredientsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'ingredients',
  version: '1.0.0',
  register: async (server, { ingredientsService }) => {
    const ingredientsHandler = new IngredientsHandler(ingredientsService);
    server.route(routes(ingredientsHandler));
  }
};
