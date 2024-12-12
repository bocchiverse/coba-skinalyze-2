const HistoriesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'histories',
  version: '1.0.0',
  register: async (server, { historiesService }) => {
    const historiesHandler = new HistoriesHandler(historiesService);
    server.route(routes(historiesHandler));
  }
};
