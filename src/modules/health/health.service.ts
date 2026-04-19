export class HealthService {
  getStatus() {
    return {
      status: 'ok',
      service: 'mini-lms-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
