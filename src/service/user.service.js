import { ErrorTypes } from '../_shared/errors.enum.js';
import { UserEntity } from '../entity/user.entity.js';
import { Util } from '../util/util.js';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getOneById(id) {
    try {
      if (!id) {
        return { 
          data: {},
          status: false,
          error: ErrorTypes.INVALID_PARAM, 
          errorMessage: 'invalid id',
        };
      }

      const foundUser = await this.userRepository.getOneById(id);

      if (Util.isEmpty(foundUser)) {
          return {
            data: {},
            status: false,
            error: ErrorTypes.NOT_FOUND, 
            errorMessage: 'user not found',
          };
      }

      const user = new UserEntity({
        id: foundUser.id,
        name: foundUser.name,
        age: foundUser.age,
      });

      return { data: user, status: true };
    } catch (err) {
      console.error(`Error on Service User - getOneById: ${err.stack}`);
      return {
        data: {},
        status: false,
        error: ErrorTypes.INTERNAL_ERROR, 
        errorMessage: err.message,
      };
    }
  }

  async getAll() {
    try {
      const foundUsers = await this.userRepository.getAll();

      if (Util.isEmpty(foundUsers)) {
        return { 
          data: [],
          status: false,
          error: ErrorTypes.NOT_FOUND, 
          errorMessage: 'users not found', 
        };
      }

      const users = foundUsers.map(foundUser => {
        return new UserEntity({
          id: foundUser.id,
          name: foundUser.name,
          age: foundUser.age,
        });
      });

      return { data: users, status: true };
    } catch (err) {
      console.error(`Error on Service User - getAll: ${err.stack}`);
      return {
        data: [],
        status: false,
        error: ErrorTypes.INTERNAL_ERROR,
        errorMessage: err.message,
      };
    }
  }

  async create({ name, age }) {
    try {
      const userEntity = new UserEntity({ name, age });
      const userId = await this.userRepository.create(userEntity);

      if(!userId) {
        throw new Error('failed to create user')
      }

      return this.getOneById(userId);
    } catch (err) {
      console.error(`Error on Service User - create: ${err.stack}`);
      
      if(err.message.includes('UserEntity')) {
        return {
          data: {},
          status: false,
          error: ErrorTypes.INVALID_PARAM,
          errorMessage: err.message,
        };
      }

      return {
        data: [],
        status: false,
        error: ErrorTypes.INTERNAL_ERROR,
        errorMessage: err.message,
      };
    }
  }

  async update(id, { name, age }) {
    try {
      const foundUser = await this.getOneById(id);
      
      if(!foundUser.status) {
        return foundUser;
      }

      const user = new UserEntity({id: Number(id), name, age});
      const updated = await this.userRepository.update(id, user);
      if(!updated) {
        throw new Error('failed to update user')
      }

      return this.getOneById(id)
    } catch (err) {
      console.error(`Error on Service User - update: ${err.stack}`);
      
      if(err.message.includes('UserEntity')) {
        return {
          data: {},
          status: false,
          error: ErrorTypes.INVALID_PARAM,
          errorMessage: err.message,
        };
      }

      return {
        data: [],
        status: false,
        error: ErrorTypes.INTERNAL_ERROR,
        errorMessage: err.message,
      };
    }
  }

  async delete(id) {
    try {
      const foundUser = await this.getOneById(id);
      
      if(!foundUser.status) {
        return foundUser;
      }

      const deleted = await this.userRepository.delete(id);
      if(!deleted) {
        throw new Error('failed to delete user')
      }

      return {
        data: true,
        status: true,
      }
    } catch (err) {
      console.error(`Error on Service User - delete: ${err.stack}`);
      
      return {
        data: [],
        status: false,
        error: ErrorTypes.INTERNAL_ERROR,
        errorMessage: err.message,
      };
    }
  }
}
