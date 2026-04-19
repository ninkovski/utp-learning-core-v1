import { Router } from 'express';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const authService = new AuthService();
const authController = new AuthController(authService);

export const authRouter = Router();

authRouter.post('/login', (req, res, next) => {
  void authController.login(req, res).catch(next);
});
