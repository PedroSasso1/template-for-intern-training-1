import { Router } from 'express';
import { UserServiceFactory } from '../../service/factory/user.service.factory.js';
import { ErrorTypes } from '../../_shared/errors.enum.js';

const routes = Router();

routes.post('/', async (req, res) => {
  try {
    const userService = UserServiceFactory.getInstanceSqlite();
    const responseBody = await userService.create(req.body);
    const { status, error } = responseBody;

    if(!status) {
      if(error === ErrorTypes.INTERNAL_ERROR) {
        return res.status(500).json(responseBody)
      }
      return res.status(422).json(responseBody)
    }
    
    return res.status(201).json(responseBody)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.get('/', async (_, res) => {
  try {
    const userService = UserServiceFactory.getInstanceSqlite();
    const responseBody = await userService.getAll();
    const { status, error } = responseBody;

    if(!status) {
      if(error === ErrorTypes.INTERNAL_ERROR) {
        return res.status(500).json(responseBody)
      } else if (error === ErrorTypes.NOT_FOUND) {
        return res.status(404).json(responseBody)
      }
      return res.status(422).json(responseBody)
    }
    
    return res.status(200).json(responseBody)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.get('/:id', async (req, res) => {
  try {
    const userService = UserServiceFactory.getInstanceSqlite();
    const responseBody = await userService.getOneById(req.params.id);
    const { status, error } = responseBody;

    if(!status) {
      if(error === ErrorTypes.INTERNAL_ERROR) {
        return res.status(500).json(responseBody)
      } else if (error === ErrorTypes.NOT_FOUND) {
        return res.status(404).json(responseBody)
      }
      return res.status(422).json(responseBody)
    }
    
    return res.status(200).json(responseBody)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


routes.delete('/:id', async (req, res) => {
  try {
    const userService = UserServiceFactory.getInstanceSqlite();
    const responseBody = await userService.delete(req.params.id);
    const { status, error } = responseBody;

    if(!status) {
      if(error === ErrorTypes.INTERNAL_ERROR) {
        return res.status(500).json(responseBody)
      } else if (error === ErrorTypes.NOT_FOUND) {
        return res.status(404).json(responseBody)
      }
      return res.status(422).json(responseBody)
    }
    
    return res.status(200).json(responseBody)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.put('/:id', async (req, res) => {
  try {
    const userService = UserServiceFactory.getInstanceSqlite();
    const responseBody = await userService.update(req.params.id, req.body);
    const { status, error } = responseBody;

    if(!status) {
      if(error === ErrorTypes.INTERNAL_ERROR) {
        return res.status(500).json(responseBody)
      } else if (error === ErrorTypes.NOT_FOUND) {
        return res.status(404).json(responseBody)
      }
      return res.status(422).json(responseBody)
    }
    
    return res.status(200).json(responseBody)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default routes;
