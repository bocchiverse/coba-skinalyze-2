class HistoriesHandler {
  constructor(historiesService) {
    this._historiesService = historiesService;

    this.postHistoriesHandler = this.postHistoriesHandler.bind(this);
    this.updateHistoriesHandler = this.updateHistoriesHandler.bind(this);
    this.deleteHistoriesHandler = this.deleteHistoriesHandler.bind(this);
    this.getHistoriesHandler = this.getHistoriesHandler.bind(this);
    this.getHistoriesByIdHandler = this.getHistoriesByIdHandler.bind(this);
  }

  async postHistoriesHandler(request, h) {
    const { name, skintypeId, ingredientId, description } = request.payload;

    const historyId = await this._historiesService.addHistory({ name, skintypeId, ingredientId, description });

    const response = h.response({
      status: 'success',
      message: 'History berhasil ditambahkan',
      data: { historyId },
    });
    response.code(201);
    return response;
  }

  async updateHistoriesHandler(request, h) {
    const { id } = request.params;
    const { name: newName, skintypeId, ingredientId, description } = request.payload;

    await this._historiesService.updateHistory({ id, newName, skintypeId, ingredientId, description });

    const response = h.response({
      status: 'success',
      message: 'History berhasil diubah'
    });
    response.code(200);
    return response;
  }

  async deleteHistoriesHandler(request, h) {
    const { id } = request.params;

    await this._historiesService.deleteHistory({ id });

    const response = h.response({
      status: 'success',
      message: 'History berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  async getHistoriesHandler(request, h) {
    const data = await this._historiesService.read();

    return ({
      status: 'success',
      data
    });
  }

  async getHistoriesByIdHandler(request, h) {
    const { id } = request.params;
    const data = await this._historiesService.readById({ id });

    return ({
      status: 'success',
      data
    });
  }
}

module.exports = HistoriesHandler;
