import { HealthService } from '../src/modules/health/health.service';

describe('HealthService', () => {
  it('should return service status', () => {
    const service = new HealthService();
    const result = service.getStatus();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('mini-lms-backend');
    expect(result.version).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });
});
