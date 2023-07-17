import express from 'express';
import cors from 'cors';

import UserController from './controller/user.controller.js';

export class App {
  constructor() {
    this.baseDomain = 'api';
    this.app = express();
    this.app.use(cors());
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(`/${this.baseDomain}/user`, UserController);
  }

  start(port) {
    this.app.listen(port, () => `listening port ${port}`);
  }
}

export const { app, baseDomain } = new App();

