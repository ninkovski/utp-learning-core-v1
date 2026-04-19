"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_service_1 = require("../src/modules/health/health.service");
describe('HealthService', () => {
    it('should return service status', () => {
        const service = new health_service_1.HealthService();
        const result = service.getStatus();
        expect(result.status).toBe('ok');
        expect(result.service).toBe('mini-lms-backend');
        expect(result.timestamp).toBeDefined();
    });
});
//# sourceMappingURL=health.service.spec.js.map