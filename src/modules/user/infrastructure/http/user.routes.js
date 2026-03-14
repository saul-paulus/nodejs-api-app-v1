import express from 'express';

export default ({ userController }) => {
  const router = express.Router();

  router.post('/', (req, res, next) => userController.register(req, res, next));
  router.get('/', (req, res, next) => userController.handlerGetUsers(req, res, next));
  router.get('/:idPersonal', (req, res, next) => userController.handlerGetUser(req, res, next));

  return router;
};
