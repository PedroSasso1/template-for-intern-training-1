import { test, describe } from 'node:test';
import assert from 'node:assert';
import { SqliteHandler } from '../../src/database/sqlite.handler.js';
import { UserRepository } from "../../src/repository/user.repository.js";
import { UserEntity } from "../../src/entity/user.entity.js";

describe("User Repository - Unit Tests", () => {
  const sqlite3 = new SqliteHandler();
  const userRepository = new UserRepository(sqlite3);
  
  test('should create a user entity', async () => {
    const user = new UserEntity({name: 'pedro', age: 19});
    const lastID = await userRepository.create(user);

    assert.ok(lastID)
    assert.ok(user.id === null)
    assert.doesNotThrow(() => user.id = lastID)
  });

  test('should list all user in database', async () => {
    const users = await userRepository.getAll()

    assert.deepEqual(users, [{id: 1, name: 'pedro', age: 19}])
  })

  test('should get one user by id in database', async () => {
    const user = await userRepository.getOneById(1)
    assert.deepEqual(user, {age: 19, id: 1, name: 'pedro'})
  })

  test('should update user in database', async () => {
    const user = new UserEntity({name: 'pedroarthur', age: 20});
    const updated = await userRepository.update(1, user);
    assert.ok(updated)
    const updatedUser = await userRepository.getOneById(1)
    assert.deepEqual(updatedUser, {age: 20, id: 1, name: 'pedroarthur'})
  })

  test('should delete user in database', async () => {
    const deleted = await userRepository.delete(1);
    assert.ok(deleted)
    const deletedUser = await userRepository.getOneById(1)
    assert.deepEqual(deletedUser, {})
  })
});
