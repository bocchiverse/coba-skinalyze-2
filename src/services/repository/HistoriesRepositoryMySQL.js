class HistoriesRepositoryMySQL {
  constructor(pool) {
    this._pool = pool;
  }

  // Fetch all histories, including the skintypes and ingredients names
  async read() {
    const query = {
      text: `
        SELECT histories.id, histories.skintype_name, histories.ingredient_name, 
               histories.createdAt, histories.updatedAt
        FROM histories
      `,
    };

    const [result, fields] = await this._pool.query(query.text);
    return result;
  }

  // Fetch a specific history by ID, including the skintypes and ingredients names
  async readById({ id }) {
    const query = {
      text: `
        SELECT histories.id, histories.skintype_name, histories.ingredient_name, 
               histories.createdAt, histories.updatedAt
        FROM histories
        WHERE histories.id = ?
      `,
      values: [id],
    };

    const [result, fields] = await this._pool.query(query.text, query.values);
    return result;
  }

  // Add a new history
  async addHistory({ name, skintypeId, ingredientId, description }) {
    // Fetch skintype_name and ingredient_name from the respective tables
    const skintypeQuery = {
      text: 'SELECT name FROM skintypes WHERE id = ?',
      values: [skintypeId],
    };

    const ingredientQuery = {
      text: 'SELECT name FROM ingredients WHERE id = ?',
      values: [ingredientId],
    };

    const [skintypeResult] = await this._pool.query(skintypeQuery.text, skintypeQuery.values);
    const [ingredientResult] = await this._pool.query(ingredientQuery.text, ingredientQuery.values);

    const skintypeName = skintypeResult[0]?.name;
    const ingredientName = ingredientResult[0]?.name;

    // Insert the new history record
    const query = {
      text: 'INSERT INTO histories (name, skintypeId, ingredientId, skintype_name, ingredient_name, description) VALUES (?, ?, ?, ?, ?, ?)',
      values: [name, skintypeId, ingredientId, skintypeName, ingredientName, description],
    };

    const [result] = await this._pool.query(query.text, query.values);
    return result.insertId;
  }

  // Update an existing history
  async updateHistory({ id, newName, skintypeId, ingredientId, description }) {
    // Fetch skintype_name and ingredient_name from the respective tables
    const skintypeQuery = {
      text: 'SELECT name FROM skintypes WHERE id = ?',
      values: [skintypeId],
    };

    const ingredientQuery = {
      text: 'SELECT name FROM ingredients WHERE id = ?',
      values: [ingredientId],
    };

    const [skintypeResult] = await this._pool.query(skintypeQuery.text, skintypeQuery.values);
    const [ingredientResult] = await this._pool.query(ingredientQuery.text, ingredientQuery.values);

    const skintypeName = skintypeResult[0]?.name;
    const ingredientName = ingredientResult[0]?.name;

    // Update the history record
    const query = {
      text: 'UPDATE histories SET name = ?, skintypeId = ?, ingredientId = ?, skintype_name = ?, ingredient_name = ?, description = ? WHERE id = ?',
      values: [newName, skintypeId, ingredientId, skintypeName, ingredientName, description, id],
    };

    await this._pool.query(query.text, query.values);
  }

  // Delete a history
  async deleteHistory({ id }) {
    const query = {
      text: 'DELETE FROM histories WHERE id = ?',
      values: [id],
    };

    await this._pool.query(query.text, query.values);
  }
}

module.exports = HistoriesRepositoryMySQL;
