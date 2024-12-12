class SkintypesHandler {
  constructor(skintypesService) {
    this._skintypesService = skintypesService;

    this.postSkintypesHandler = this.postSkintypesHandler.bind(this);
    this.updateSkintypesHandler = this.updateSkintypesHandler.bind(this);
    this.deleteSkintypesHandler = this.deleteSkintypesHandler.bind(this);
    this.getSkintypesHandler = this.getSkintypesHandler.bind(this);
    this.getSkintypesByIdHandler = this.getSkintypesByIdHandler.bind(this);
  }

  async postSkintypesHandler(request, h) {
    const { name } = request.payload;

    const skintypeId = await this._skintypesService.addSkintype({ name });

    const response = h.response({
      status: 'success',
      message: 'Skintype successfully added',
      data: { skintypeId },
    });
    response.code(201);
    return response;
  }

  async updateSkintypesHandler(request, h) {
    const { id } = request.params;
    const { name: newName } = request.payload;

    const skintype = await this._skintypesService.getSkintypeById(id);

    await this._skintypesService.updateSkintype({ id, name: newName });

    const response = h.response({
      status: 'success',
      message: 'Skintype successfully updated',
    });
    response.code(200);
    return response;
  }

  async deleteSkintypesHandler(request, h) {
    const { id } = request.params;

    await this._skintypesService.deleteSkintype(id);

    const response = h.response({
      status: 'success',
      message: 'Skintype successfully deleted',
    });
    response.code(200);
    return response;
  }

  async getSkintypesHandler(request, h) {
    const data = await this._skintypesService.read();

    return {
      status: 'success',
      data,
    };
  }

  async getSkintypesByIdHandler(request, h) {
    const { id } = request.params;
    const data = await this._skintypesService.readById({ id });

    return {
      status: 'success',
      data,
    };
  }
}

module.exports = SkintypesHandler;
