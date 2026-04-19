import { env } from '../../config/env';

export class HealthService {
  getStatus() {
    return {
      status: 'ok',
      service: 'mini-lms-backend',
      version: env.appVersion,
      timestamp: new Date().toISOString(),
    };
  }
}
