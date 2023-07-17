export class UserEntity {
  id;
  name;
  age;

  constructor({ id, name, age }) {
    this.id = id ?? null;
    this.name = name;
    this.age = age;
    this.validator();
  }

  validator() {
    if (this.id && !(typeof this.id === 'number')) {
      throw new Error('Error on UserEntity: id is invalid');
    }

    if (!this.name || !this.name.length) {
      throw new Error('Error on UserEntity: name is invalid');
    }
    if (!this.age || this.age < 18) {
      throw new Error('Error on UserEntity: age is invalid');
    }
  }

  clone() {
    return new UserEntity({ id: this.id, name: this.name, age: this.age });
  }
}
