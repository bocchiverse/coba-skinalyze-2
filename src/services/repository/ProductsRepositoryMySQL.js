class ProductsRepositoryMySQL {
  constructor(pool) {
    this._pool = pool;
  }

  async read() {
    const query = {
      text: 'SELECT * FROM products',
    };

    const [result, fields] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM products WHERE id = ?',
      values: [id],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async readBySkinType({ id_skintype }) {
    const query = {
      text: 'SELECT * FROM products WHERE id_skintype = ?',
      values: [id_skintype],  // Use `id_skintype` to filter products
    };

    const [result, fields] = await this._pool.query(query.text, query.values);
    return result;
  }

}

module.exports = ProductsRepositoryMySQL;
