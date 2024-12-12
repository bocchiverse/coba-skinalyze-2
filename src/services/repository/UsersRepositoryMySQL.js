class UsersRepositoryMySQL {
  constructor(pool) {
    this._pool = pool;
  }
  
  // Fungsi untuk mendapatkan semua pengguna
  async read() {
    const query = {
      text: 'SELECT * FROM `users`',
    };
  
    const [result, fields] = await this._pool.query(query.text);
    return result;
  }
  
  // Fungsi untuk mendapatkan pengguna berdasarkan ID
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `users` WHERE `Id` = ?',
      values: [id],
    };
  
    const [result, fields] = await this._pool.query(query.text, query.values);
    return result;
  }
}
  
module.exports = UsersRepositoryMySQL;
  