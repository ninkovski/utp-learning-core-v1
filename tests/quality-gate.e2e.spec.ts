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
}

async function login(email: string): Promise<string> {
  const response = await request(app).post('/api/auth/login').send({
    email,
    password: '123456',
  });

  return response.body.accessToken as string;
}

describe('Quality Gate v0.5.0', () => {
  beforeEach(async () => {
    await seedTestData();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return 400 on invalid login payload', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'invalid-email',
      password: '12',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid login payload');
  });

  it('should return 401 when token is invalid on /api/me/profile', async () => {
    const response = await request(app)
      .get('/api/me/profile')
      .set('Authorization', 'Bearer token-invalido');

    expect(response.status).toBe(401);
    expect(response.body.message).toContain('Invalid or expired token');
  });

  it('should return 400 when /api/me/tasks has no courseId query', async () => {
    const token = await login('ana@utp.edu');

    const response = await request(app).get('/api/me/tasks').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid query params for tasks');
  });

  it('should return 403 when user requests tasks for a course without enrollment', async () => {
    const token = await login('ana@utp.edu');
    const course = await prisma.course.findFirst({ select: { id: true } });

    const response = await request(app)
      .get(`/api/me/tasks?courseId=${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toContain('not enrolled');
  });

  it('should return 404 when enrolling into a non-existing course', async () => {
    const token = await login('ana@utp.edu');

    const response = await request(app)
      .post('/api/me/enrollments/course-no-existe')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toContain('Course not found');
  });
});
