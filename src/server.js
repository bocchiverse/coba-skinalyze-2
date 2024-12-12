require('dotenv').config();

const Hapi = require('@hapi/hapi');

// Services
const pool = require('./services/mysql/pool');
const ClientError = require('./exceptions/ClientError');
// const routes = require('./api/predict/routes'); // Mengimpor rute
// const loadModel = require('./services/tf/loadModel'); // Memuat model

// Plugins 
const products = require('./api/products');
const users = require('./api/users'); // Import users plugin
const ingredients = require('./api/ingredients');
const skintypes = require('./api/skintypes');
const histories = require('./api/histories');

// Repositories
const ProductsRepositoryMySQL = require('./services/repository/ProductsRepositoryMySQL');
const UsersRepositoryMySQL = require('./services/repository/UsersRepositoryMySQL'); // Import users repository
const IngredientsRepositoryMySQL = require('./services/repository/IngredientsRepositoryMySQL');
const SkinTypesRepositoryMySQL = require('./services/repository/SkintypesRepositoryMySQL');
const HistoriesRepositoryMySQL = require('./services/repository/HistoriesRepositoryMySQL');

const init = async () => {
  const { HOST, PORT } = process.env;

  // Membuat instance dari Product dan User Repository
  const productRepository = new ProductsRepositoryMySQL(pool);
  const userRepository = new UsersRepositoryMySQL(pool); // Create an instance of UsersRepositoryMySQL
  const ingredientRepository = new IngredientsRepositoryMySQL(pool);
  const skintypeRepository = new SkinTypesRepositoryMySQL(pool);
  const historyRepository = new HistoriesRepositoryMySQL(pool);

  const server = Hapi.server({
    port: PORT || 3000,
    host: HOST || "0.0.0.0",
    routes: {
      cors: {
        origin: ['*'], 
      },
    },
  });

  // const model = await loadModel();
  // server.app.model = model;

  // server.route(routes);

  // Global error handling (ClientError)
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  // Registering plugins (products and users)
  await server.register([
    {
      plugin: products,
      options: {
        productsService: productRepository,
      },
      routes: {
        prefix: '/products', // Prefix for the products API
      },
    },
    {
      plugin: users,
      options: {
        usersService: userRepository,
      },
      routes: {
        prefix: '/users', // Prefix for the users API
      },
    },
    {
      plugin: ingredients,
      options: {
        ingredientsService: ingredientRepository,
      },
      routes: {
        prefix: '/ingredients', // Prefix for the users API
      },
    },
    {
      plugin: skintypes,
      options: {
        skintypesService: skintypeRepository,
      },
      routes: {
        prefix: '/skintypes', // Prefix for the users API
      },
    },
    {
      plugin: histories,
      options: {
        historiesService: historyRepository,
      },
      routes: {
        prefix: '/histories', // Prefix for the users API
      },
    },
  ]);

  // Start the server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
