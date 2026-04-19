import request from 'supertest';

import { app } from '../src/app';

describe('Health endpoint', () => {
  it('GET /api/health should return 200', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('GET /api/unknown should return 404', async () => {
    const response = await request(app).get('/api/unknown');

    expect(response.status).toBe(404);
    expect(response.body.message).toContain('Route not found');
  });
});
