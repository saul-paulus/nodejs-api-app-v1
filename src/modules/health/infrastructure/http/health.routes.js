import express from 'express';

export default ({ healthController }) => {
  const router = express.Router();

  router.get('/', (req, res, next) => healthController.check(req, res, next));

  return router;
};
