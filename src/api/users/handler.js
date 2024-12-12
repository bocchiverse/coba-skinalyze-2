class UsersHandler {
  constructor(usersService) {
    this._usersService = usersService;

    // Mengikat handler ke instance class
    this.postUsersHandler = this.postUsersHandler.bind(this);
    this.updateUsersHandler = this.updateUsersHandler.bind(this);
    this.deleteUsersHandler = this.deleteUsersHandler.bind(this);
    this.getUsersHandler = this.getUsersHandler.bind(this);
    this.getUsersByIdHandler = this.getUsersByIdHandler.bind(this);
  }

  // Handler untuk membuat pengguna baru
  async postUsersHandler(request, h) {
    const { name, email, password, gender, date_of_birth } = request.payload;

    const user = await this._service.addUser({ name, email, password, gender, date_of_birth });
    
    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: { user },
    });
    response.code(201);
    return response;
  }

  // Handler untuk memperbarui data pengguna
  async updateUsersHandler(request, h) {
    const { id } = request.params;
    const { name, email, password, gender, date_of_birth } = request.payload;

    const user = await this._usersService.readById({ id });

    if (!user || user.length === 0) {
      return h.response({
        status: 'fail',
        message: 'User tidak ditemukan',
      }).code(404);
    }

    const updatedUser = await this._usersService.update({ id, name, email, password, gender, date_of_birth });

    const response = h.response({
      status: 'success',
      message: 'User berhasil diubah',
      data: { updatedUser },
    });
    response.code(200);
    return response;
  }

  // Handler untuk menghapus pengguna
  async deleteUsersHandler(request, h) {
    const { id } = request.params;

    const user = await this._usersService.readById({ id });

    if (!user || user.length === 0) {
      return h.response({
        status: 'fail',
        message: 'User tidak ditemukan',
      }).code(404);
    }

    await this._usersService.deleteUser({ id });

    const response = h.response({
      status: 'success',
      message: 'User berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // Handler untuk mendapatkan semua pengguna
  async getUsersHandler(request, h) {
    const users = await this._usersService.read();
    return h.response({
      status: 'success',
      data: { users },
    }).code(200);
  }

  // Handler untuk mendapatkan pengguna berdasarkan ID
  async getUsersByIdHandler(request, h) {
    const { id } = request.params;

    const user = await this._usersService.readById({ id });

    // Mengecek apakah data user ditemukan
    if (user && user.length > 0) {
      return h.response({
        status: 'success',
        data: { user },
      }).code(200);
    }

    return h.response({
      status: 'fail',
      message: 'User tidak ditemukan',
    }).code(404);
  }
}

module.exports = UsersHandler;
