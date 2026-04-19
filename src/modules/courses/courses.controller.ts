import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CoursesService } from './courses.service';

export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  async getAllCourses(_req: Request, res: Response): Promise<void> {
    const courses = await this.coursesService.getAllCourses();
    res.status(StatusCodes.OK).json(courses);
  }

  async getCourseById(req: Request, res: Response): Promise<void> {
    const course = await this.coursesService.getCourseById(req.params.id);
    res.status(StatusCodes.OK).json(course);
  }
}
