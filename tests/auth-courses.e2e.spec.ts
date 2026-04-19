import request from 'supertest';

import { prisma } from '../src/lib/prisma';
import { app } from '../src/app';

async function seedTestData() {
  await prisma.taskCompletion.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      { email: 'ana@utp.edu', password: '123456', name: 'Ana UTP' },
      { email: 'carlos@utp.edu', password: '123456', name: 'Carlos UTP' },
    ],
  });

  await prisma.course.create({
    data: {
      title: 'Node.js Fundamentals',
      description: 'Base concepts for backend development',
      tasks: {
        create: [{ title: 'Create first route' }, { title: 'Implement middleware' }],
      },
    },
  });

  await prisma.course.create({
    data: {
      title: 'TypeScript Essentials',
      description: 'Types and strict mode',
      tasks: {
        create: [{ title: 'Define DTOs' }, { title: 'Use strict typing' }],
      },
    },
  });
}

describe('Auth + Courses', () => {
  beforeAll(async () => {
    await seedTestData();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('POST /api/auth/login should return JWT for valid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'ana@utp.edu',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.user.email).toBe('ana@utp.edu');
  });

  it('GET /api/courses should return seeded courses', async () => {
    const response = await request(app).get('/api/courses');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  it('GET /api/courses/:id should return a course detail', async () => {
    const firstCourse = await prisma.course.findFirst();

    const response = await request(app).get(`/api/courses/${firstCourse?.id ?? ''}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(firstCourse?.id);
    expect(Array.isArray(response.body.tasks)).toBe(true);
  });

  it('GET /api/me/profile without token should return 401', async () => {
    const response = await request(app).get('/api/me/profile');

    expect(response.status).toBe(401);
  });
});
