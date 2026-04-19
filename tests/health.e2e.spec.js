"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
describe('Health endpoint', () => {
    it('GET /api/health should return 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('ok');
    });
    it('GET /api/unknown should return 404', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/api/unknown');
        expect(response.status).toBe(404);
        expect(response.body.message).toContain('Route not found');
    });
});
//# sourceMappingURL=health.e2e.spec.js.map