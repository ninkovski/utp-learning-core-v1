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

async function login(email: string) {
  const response = await request(app).post('/api/auth/login').send({
    email,
    password: '123456',
  });

  return response.body.accessToken as string;
}

describe('Me enrollments + tasks progress', () => {
  beforeEach(async () => {
    await seedTestData();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('GET /api/me/enrollments without token should return 401', async () => {
    const response = await request(app).get('/api/me/enrollments');

    expect(response.status).toBe(401);
  });

  it('POST /api/me/enrollments/:courseId should enroll user', async () => {
    const token = await login('ana@utp.edu');
    const course = await prisma.course.findFirst({ select: { id: true } });

    const response = await request(app)
      .post(`/api/me/enrollments/${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(course?.id);
  });

  it('POST /api/me/enrollments/:courseId should reject duplicate enrollment', async () => {
    const token = await login('ana@utp.edu');
    const course = await prisma.course.findFirst({ select: { id: true } });

    await request(app)
      .post(`/api/me/enrollments/${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${token}`);

    const duplicateResponse = await request(app)
      .post(`/api/me/enrollments/${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${token}`);

    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body.message).toContain('already enrolled');
  });

  it('POST /api/me/tasks/:taskId/complete should be isolated by user', async () => {
    const course = await prisma.course.findFirst({
      select: {
        id: true,
        tasks: {
          select: { id: true },
          orderBy: { createdAt: 'asc' },
          take: 1,
        },
      },
    });

    const taskId = course?.tasks[0]?.id ?? '';

    const anaToken = await login('ana@utp.edu');
    await request(app)
      .post(`/api/me/enrollments/${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${anaToken}`);

    const completeResponse = await request(app)
      .post(`/api/me/tasks/${taskId}/complete`)
      .set('Authorization', `Bearer ${anaToken}`);

    expect(completeResponse.status).toBe(200);
    expect(completeResponse.body.completed).toBe(true);

    const anaTasksResponse = await request(app)
      .get(`/api/me/tasks?courseId=${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${anaToken}`);

    expect(anaTasksResponse.status).toBe(200);
    expect(anaTasksResponse.body.find((task: { id: string }) => task.id === taskId)?.completed).toBe(
      true,
    );

    const carlosToken = await login('carlos@utp.edu');
    await request(app)
      .post(`/api/me/enrollments/${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${carlosToken}`);

    const carlosTasksResponse = await request(app)
      .get(`/api/me/tasks?courseId=${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${carlosToken}`);

    expect(carlosTasksResponse.status).toBe(200);
    expect(
      carlosTasksResponse.body.find((task: { id: string }) => task.id === taskId)?.completed,
    ).toBe(false);
  });

  it('DELETE /api/me/tasks/:taskId/complete should set task as pending', async () => {
    const course = await prisma.course.findFirst({
      select: {
        id: true,
        tasks: {
          select: { id: true },
          orderBy: { createdAt: 'asc' },
          take: 1,
        },
      },
    });

    const taskId = course?.tasks[0]?.id ?? '';

    const token = await login('ana@utp.edu');
    await request(app)
      .post(`/api/me/enrollments/${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${token}`);

    await request(app)
      .post(`/api/me/tasks/${taskId}/complete`)
      .set('Authorization', `Bearer ${token}`);

    const uncompleteResponse = await request(app)
      .delete(`/api/me/tasks/${taskId}/complete`)
      .set('Authorization', `Bearer ${token}`);

    expect(uncompleteResponse.status).toBe(200);
    expect(uncompleteResponse.body.completed).toBe(false);

    const tasksResponse = await request(app)
      .get(`/api/me/tasks?courseId=${course?.id ?? ''}`)
      .set('Authorization', `Bearer ${token}`);

    expect(tasksResponse.status).toBe(200);
    expect(tasksResponse.body.find((task: { id: string }) => task.id === taskId)?.completed).toBe(
      false,
    );
  });
});
