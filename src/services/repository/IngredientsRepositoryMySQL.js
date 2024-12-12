class IngredientsRepositoryMySQL {
  constructor(pool) {
    this._pool = pool;
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `ingredients`',
    };

    const [result, fields] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `ingredients` WHERE `id` = ?',
      values: [id],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async addIngredient({ name }) {
    const query = {
      text: 'INSERT INTO `ingredients` (`name`) VALUES (?)',
      values: [name],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result.insertId;
  }

  async updateIngredient({ id, name }) {
    const query = {
      text: 'UPDATE `ingredients` SET `name` = ? WHERE `id` = ?',
      values: [name, id],
    };

    await this._pool.query(query.text, query.values);
  }

  async deleteIngredient({ id }) {
    const query = {
      text: 'DELETE FROM `ingredients` WHERE `id` = ?',
      values: [id],
    };

    await this._pool.query(query.text, query.values);
  }

  async readBySkinType({ id_skintype }) {
    const query = {
      text: 'SELECT * FROM ingredients WHERE id_skintype = ?',
      values: [id_skintype],  // Use `id_skintype` to filter products
    };

    const [result, fields] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = IngredientsRepositoryMySQL;
