import { StatusCodes } from 'http-status-codes';

import { AppError } from '../../common/errors/AppError';
import { prisma } from '../../lib/prisma';

export class CoursesService {
  async getAllCourses() {
    return prisma.course.findMany({
      orderBy: { createdAt: 'asc' },
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
    });
  }

  async getCourseById(courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        description: true,
        tasks: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!course) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Course not found');
    }

    return course;
  }
}
