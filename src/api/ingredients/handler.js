class IngredientsHandler {
  constructor(ingredientsService) {
    this._ingredientsService = ingredientsService;

    this.postIngredientsHandler = this.postIngredientsHandler.bind(this);
    this.updateIngredientsHandler = this.updateIngredientsHandler.bind(this);
    this.deleteIngredientsHandler = this.deleteIngredientsHandler.bind(this);
    this.getIngredientsHandler = this.getIngredientsHandler.bind(this);
    this.getIngredientsByIdHandler = this.getIngredientsByIdHandler.bind(this);
    this.getIngredientsBySkintypeHandler = this.getIngredientsBySkintypeHandler.bind(this);
  }

  async postIngredientsHandler(request, h) {
    const { name } = request.payload;

    const ingredientId = await this._ingredientsService.addIngredient({ name });

    const response = h.response({
      status: 'success',
      message: 'Ingredient berhasil ditambahkan',
      data: { ingredientId },
    });
    response.code(201);
    return response;
  }

  async updateIngredientsHandler(request, h) {
    const { id } = request.params;
    const { name: newName } = request.payload;

    await this._ingredientsService.updateIngredient({ id, name: newName });

    const response = h.response({
      status: 'success',
      message: 'Ingredient berhasil diubah'
    });
    response.code(200);
    return response;
  }

  async deleteIngredientsHandler(request, h) {
    const { id } = request.params;

    await this._ingredientsService.deleteIngredient({ id });

    const response = h.response({
      status: 'success',
      message: 'Ingredient berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  async getIngredientsHandler(request, h) {
    const data = await this._ingredientsService.read();

    return ({
      status: 'success',
      data
    });
  }

  async getIngredientsByIdHandler(request, h) {
    const { id } = request.params;
    const data = await this._ingredientsService.readById({ id });

    return ({
      status: 'success',
      data
    });
  }

  async getIngredientsBySkintypeHandler(request, h) {
    const { id_skintype } = request.params;  // Extract `id_skintype` from path
    const data = await this._ingredientsService.readBySkinType({ id_skintype }); // Call service method

    return {
      status: 'success',
      data
    };
  }
}

module.exports = IngredientsHandler;
