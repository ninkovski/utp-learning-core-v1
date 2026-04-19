import { Router } from 'express';

import { HealthController } from '../modules/health/health.controller';
import { HealthService } from '../modules/health/health.service';

const healthService = new HealthService();
const healthController = new HealthController(healthService);

export const apiRouter = Router();

apiRouter.get('/health', (req, res) => healthController.getHealth(req, res));
