class SkintypesRepositoryMySQL {
    constructor(pool) {
      this._pool = pool;
    }
  
    async read() {
      const query = {
        text: 'SELECT * FROM skintypes',
      };
  
      const [result, fields] = await this._pool.query(query.text);
  
      return result;
    }
  
    async readById({ id }) {
      const query = {
        text: 'SELECT * FROM skintypes WHERE id = ?',
        values: [id],
      };
  
      const [result, fields] = await this._pool.query(query.text, query.values);
  
      return result;
    }
  
    async addSkintype({ name }) {
      const query = {
        text: 'INSERT INTO skintypes (name) VALUES (?)',
        values: [name],
      };
  
      const [result] = await this._pool.query(query.text, query.values);
  
      return result.insertId; // Return the ID of the newly added skintype
    }
  
    async updateSkintype({ id, name }) {
      const query = {
        text: 'UPDATE skintypes SET name = ? WHERE id = ?',
        values: [name, id],
      };
  
      await this._pool.query(query.text, query.values);
    }
  
    async deleteSkintype(id) {
      const query = {
        text: 'DELETE FROM skintypes WHERE id = ?',
        values: [id],
      };
  
      await this._pool.query(query.text, query.values);
    }
}
  
module.exports = SkintypesRepositoryMySQL;
  