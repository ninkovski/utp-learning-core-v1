import { Router } from 'express';

import { authRouter } from '../modules/auth/auth.routes';
import { coursesRouter } from '../modules/courses/courses.routes';
import { HealthController } from '../modules/health/health.controller';
import { HealthService } from '../modules/health/health.service';
import { meRouter } from '../modules/me/me.routes';

const healthService = new HealthService();
const healthController = new HealthController(healthService);

export const apiRouter = Router();

apiRouter.get('/health', (req, res) => healthController.getHealth(req, res));
apiRouter.use('/auth', authRouter);
apiRouter.use('/courses', coursesRouter);
apiRouter.use('/me', meRouter);
