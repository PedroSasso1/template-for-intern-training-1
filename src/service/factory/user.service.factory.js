import { SqliteHandler } from '../../database/sqlite.handler.js';
import { UserRepository } from '../../repository/user.repository.js';
import { UserService } from '../user.service.js'; 

export class UserServiceFactory {
  static getInstanceSqlite() {
    const sqlite3 = new SqliteHandler();
    const userRepository = new UserRepository(sqlite3);
    return new UserService(userRepository);
  }
}
