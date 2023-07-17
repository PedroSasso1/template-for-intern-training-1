import { test, describe } from 'node:test';
import assert from 'node:assert';
import { UserEntity } from '../../src/entity/user.entity.js';
import { UserServiceFactory } from '../../src/service/factory/user.service.factory.js';
import { ErrorTypes } from '../../src/_shared/errors.enum.js';

describe("User Service - Unit Tests", () => {
  const userService = UserServiceFactory.getInstanceSqlite();
  
  test('should create a user entity', async () => {
    const user = new UserEntity({ name: 'pedro', age: 19 });
    const { data, status } = await userService.create(user);

    assert.ok(status)
    assert.deepEqual(data, {id: 1, name: 'pedro', age: 19})
  });

  test('should list all user in database', async () => {
    const {data, status} = await userService.getAll()

    assert.ok(status)
    assert.deepEqual(data, [{id: 1, name: 'pedro', age: 19}])
  })

  test('should get one user by id in database', async () => {
    const {data, status} = await userService.getOneById(1)

    assert.ok(status)
    assert.deepEqual(data, {age: 19, id: 1, name: 'pedro'})
  })

  test('should update user in database', async () => {
    const user = new UserEntity({name: 'pedroarthur', age: 20});
    const {data, status} = await userService.update(1, user);
    assert.ok(status)
    assert.deepEqual(data, {age: 20, id: 1, name: 'pedroarthur'})
  })

  test('should delete user in database', async () => {
    const deleted = await userService.delete(1);
    assert.ok(deleted)
    const { data, status, error, errorMessage } = await userService.getOneById(1)
    assert.deepEqual(data, {})
    assert.ok(!status)
    assert.equal(error, ErrorTypes.NOT_FOUND)
    assert.equal(errorMessage, 'user not found')
  })
});
