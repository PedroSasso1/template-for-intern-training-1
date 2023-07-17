import { test, describe } from 'node:test';
import assert from 'node:assert';
import { UserEntity } from '../../src/entity/user.entity.js';

describe("User Entity - Unit Tests", () => {
  test("should throw invalid id as error", () => {
    assert.throws(
      () => new UserEntity({ id: 'coe', name: "pedro", age: 19 }),
      new Error("Error on UserEntity: id is invalid")
    );
  });

  test("should throw invalid name as error", () => {
    assert.throws(
      () => new UserEntity({id: 1, name:"", age:19}),
      new Error("Error on UserEntity: name is invalid")
    );
    assert.throws(
      () => new UserEntity(1, undefined, 19),
      new Error("Error on UserEntity: name is invalid")
    );
  });

  test("should throw invalid age as error", () => {
    assert.throws(
      () => new UserEntity({id: 1, name: "pedro", age: undefined}),
      new Error("Error on UserEntity: age is invalid")
    );
    assert.throws(
      () => new UserEntity({id: 1, name: "pedro", age: NaN}),
      new Error("Error on UserEntity: age is invalid")
    );
    assert.throws(
      () => new UserEntity({id: 1, name: "pedro", age: 17}),
      new Error("Error on UserEntity: age is invalid")
    );
  });

  test("should return valid user instance", () => {
    const pedro = new UserEntity({id: 1, name: "pedro", age: 19});
    assert.deepStrictEqual(pedro, pedro.clone());
  });
});
