const SkintypesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'skintypes',
  version: '1.0.0',
  register: async (server, { skintypesService }) => {
    const skintypesHandler = new SkintypesHandler(skintypesService);
    server.route(routes(skintypesHandler));
  }
}
