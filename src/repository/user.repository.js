export class UserRepository {
  constructor(database) {
    this.tableName = 'users';
    this.fields = ['id', 'name', 'age'];
    this.database = database;
  }

  async getOneById(id) {
    try {
      const user = await this.database.getOneById(
        this.tableName,
        this.fields,
        id,
      );

      return user ?? {};
    } catch (err) {
      console.error(`Error on Repository User: ${err.message}`);
      return [];
    }
  }

  async getAll() {
    try {
      const users = await this.database.getAll(this.tableName, this.fields);
      return users;
    } catch (err) {
      console.error(`Error on Repository User: ${err.message}`);
      return [];
    }
  }

  async create(userEntity) {
    try {
      const lastID = await this.database.create(
        this.tableName,
        ['name', 'age'],
        [userEntity.name, userEntity.age],
      );
      return lastID;
    } catch (err) {
      console.error(`Error on Repository User: ${err.message}`);
      return false;
    }
  }

  async update(id, newUserEntityData) {
    try {
      const updated = await this.database.update(
        this.tableName,
        id,
        ['name', 'age'],
        [newUserEntityData.name, newUserEntityData.age],
      );

      return updated;
    } catch (err) {
      console.error(`Error on Repository User: ${err.message}`);
      return false;
    }
  }

  async delete(id) {
    try {
      const deleted = await this.database.delete(this.tableName, id);
      return deleted;
    } catch (err) {
      console.error(`Error on Repository User: ${err.message}`);
      return false;
    }
  }
}
