class ProductsHandler {
  constructor(productsService) {
    this._productsService = productsService;

    this.postProductsHandler = this.postProductsHandler.bind(this);
    this.updateProductsHandler = this.updateProductsHandler.bind(this);
    this.deleteProductsHandler = this.deleteProductsHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
    this.getProductsByIdHandler = this.getProductsByIdHandler.bind(this);
    this.getProductsBySkinTypeHandler = this.getProductsBySkinTypeHandler.bind(this); // New handler
  }

  async postProductsHandler(request, h) {
    const { name, email, password } = request.payload;

    const userId = await this._service.addUser({ name, email, password });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: { userId },
    });
    response.code(201);
    return response;
  }

  async updateProductsHandler(request, h) {
    const { id } = request.params;
    const { name: newName, image, old_password, new_password } = request.payload;

    const user = await this._service.getUserById(id);
    const { image: oldName } = user[0];

    const messageUpload = {
      image,
      service: 'users',
      newName,
      oldName
    };

    await this._service.verifyPassword(id, old_password);
    await this._service.updateUser({ id, name: newName, old_password, new_password });
    await this._producerService.sendMessage('media:put', messageUpload);

    const response = h.response({
      status: 'success',
      message: 'User berhasil diubah'
    });
    response.code(201);
    return response;
  }

  async deleteProductsHandler(request, h) {
    const { id } = request.params;
    const { old_password } = request.payload;

    const user = await this._service.getUserById(id);
    const { name } = user[0];
    const message = {
      name,
      service: 'users',
    };

    await this._service.deleteUser({ id, old_password });
    await this._producerService.sendMessage('media:delete', message);

    const response = h.response({
      status: 'success',
      message: 'User berhasil dihapus'
    });
    response.code(201);
    return response;
  }

  async getProductsHandler(request, h) {
    const data = await this._productsService.read();

    return ({
      status: 'success',
      data
    });
  }

  async getProductsByIdHandler(request, h) {
    const { id } = request.params;
    const data = await this._productsService.readById({ id });

    return ({
      status: 'success',
      data
    });
  }

  // New handler for fetching products by id_skintype
  async getProductsBySkinTypeHandler(request, h) {
    const { id_skintype } = request.params;  // Extract `id_skintype` from path
    const data = await this._productsService.readBySkinType({ id_skintype }); // Call service method

    return {
      status: 'success',
      data
    };
  }
}

module.exports = ProductsHandler;
