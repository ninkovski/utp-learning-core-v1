import { Router } from 'express';

import { authJwt } from '../../common/middleware/auth-jwt';
import { MeController } from './me.controller';
import { MeService } from './me.service';

export const meRouter = Router();
const meService = new MeService();
const meController = new MeController(meService);

meRouter.use(authJwt);

meRouter.get('/profile', (req, res, next) => {
  void meController.getProfile(req, res).catch(next);
});

meRouter.get('/enrollments', (req, res, next) => {
  void meController.getEnrollments(req, res).catch(next);
});

meRouter.post('/enrollments/:courseId', (req, res, next) => {
  void meController.enroll(req, res).catch(next);
});

meRouter.delete('/enrollments/:courseId', (req, res, next) => {
  void meController.unenroll(req, res).catch(next);
});

meRouter.get('/tasks', (req, res, next) => {
  void meController.getTasks(req, res).catch(next);
});

meRouter.post('/tasks/:taskId/complete', (req, res, next) => {
  void meController.completeTask(req, res).catch(next);
});

meRouter.delete('/tasks/:taskId/complete', (req, res, next) => {
  void meController.uncompleteTask(req, res).catch(next);
});
