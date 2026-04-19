import { Router } from 'express';

import { authJwt } from '../../common/middleware/auth-jwt';

export const meRouter = Router();

meRouter.use(authJwt);

meRouter.get('/profile', (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});
