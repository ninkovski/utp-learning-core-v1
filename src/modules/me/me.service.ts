import { StatusCodes } from 'http-status-codes';
import { Prisma } from '@prisma/client';

import { AppError } from '../../common/errors/AppError';
import { prisma } from '../../lib/prisma';

export class MeService {
  async getEnrollments(userId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            _count: {
              select: {
                tasks: true,
              },
            },
          },
        },
      },
    });

    return enrollments.map((item) => item.course);
  }

  async enroll(userId: string, courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, description: true },
    });

    if (!course) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Course not found');
    }

    try {
      await prisma.enrollment.create({
        data: {
          userId,
          courseId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new AppError(StatusCodes.CONFLICT, 'User is already enrolled in this course');
      }

      throw error;
    }

    return course;
  }

  async unenroll(userId: string, courseId: string) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      select: { id: true },
    });

    if (!enrollment) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Enrollment not found');
    }

    await prisma.enrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
  }

  async getTasksByCourse(userId: string, courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true },
    });

    if (!course) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Course not found');
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      select: { id: true },
    });

    if (!enrollment) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is not enrolled in this course');
    }

    const tasks = await prisma.task.findMany({
      where: { courseId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        completions: {
          where: { userId },
          select: { completed: true },
          take: 1,
        },
      },
    });

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completions[0]?.completed ?? false,
    }));
  }

  async completeTask(userId: string, taskId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { id: true, courseId: true },
    });

    if (!task) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Task not found');
    }

    await this.assertEnrollment(userId, task.courseId);

    await prisma.taskCompletion.upsert({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId,
        taskId,
        completed: true,
      },
    });

    return {
      taskId,
      completed: true,
    };
  }

  async uncompleteTask(userId: string, taskId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { id: true, courseId: true },
    });

    if (!task) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Task not found');
    }

    await this.assertEnrollment(userId, task.courseId);

    await prisma.taskCompletion.upsert({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
      update: {
        completed: false,
      },
      create: {
        userId,
        taskId,
        completed: false,
      },
    });

    return {
      taskId,
      completed: false,
    };
  }

  private async assertEnrollment(userId: string, courseId: string): Promise<void> {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      select: { id: true },
    });

    if (!enrollment) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is not enrolled in this course');
    }
  }
}
