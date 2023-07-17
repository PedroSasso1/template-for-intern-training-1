import { test, describe } from 'node:test';
import request from 'supertest';
import { app, baseDomain } from '../../src/presentation/app.js';
import { ErrorTypes } from '../../src/_shared/errors.enum.js';

describe('User Controller - Unit Tests', () => {
  test('POST /api/user/ - should create user', async () => {
    await request(app)
      .post(`/${baseDomain}/user/`)
      .send({ age: 19, name: 'pedro' })
      .expect(200, { data: { id: 1, name: 'pedro', age: 19 }, status: true })
  });

  test('GET /api/user/:id - should fetch created user', async () => {
    await request(app)
      .get(`/${baseDomain}/user/1`)
      .expect(200, { data: { id: 1, name: 'pedro', age: 19 }, status: true })
  });

  test('GET /api/user/ - should fetch all users', async () => {
    await request(app)
      .get(`/${baseDomain}/user/`)
      .expect(200, { data: [{ id: 1, name: 'pedro', age: 19 }], status: true })
  });

  test('PUT /api/user/:id - should update user', async () => {
    await request(app)
      .put(`/${baseDomain}/user/1`)
      .send({ age: 20, name: 'pedro arthur' })
      .expect(200, { data: { id: 1, name: 'pedro arthur', age: 20 }, status: true })
  });

  test('DELETE /api/user/:id - should delete user', async () => {
    await request(app)
      .delete(`/${baseDomain}/user/1`)
      .expect(200, { data: true, status: true })
  });

  test('GET /api/user/:id - should return not found', async () => {
    await request(app)
      .get(`/${baseDomain}/user/1`)
      .expect(404, { 
        data: {},
        status: false,
        error: ErrorTypes.NOT_FOUND,
        errorMessage: 'user not found' 
      })
  });

  test('GET /api/user/ - should return empty array when fetching all users', async () => {
    await request(app)
      .get(`/${baseDomain}/user/`)
      .expect(404, { 
        data: [],
        status: false,
        error: ErrorTypes.NOT_FOUND,
        errorMessage: 'users not found' 
      })
  });
});
