import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../../common/errors/AppError';
import { courseIdParamSchema, meTasksQuerySchema, taskIdParamSchema } from './me.schema';
import { MeService } from './me.service';

export class MeController {
  constructor(private readonly meService: MeService) {}

  async getProfile(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({
      user: req.user,
    });
  }

  async getEnrollments(req: Request, res: Response): Promise<void> {
    const userId = this.getUserId(req);
    const enrollments = await this.meService.getEnrollments(userId);

    res.status(StatusCodes.OK).json(enrollments);
  }

  async enroll(req: Request, res: Response): Promise<void> {
    const parsed = courseIdParamSchema.safeParse(req.params);

    if (!parsed.success) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid courseId param', parsed.error.flatten());
    }

    const userId = this.getUserId(req);
    const enrollment = await this.meService.enroll(userId, parsed.data.courseId);

    res.status(StatusCodes.CREATED).json(enrollment);
  }

  async unenroll(req: Request, res: Response): Promise<void> {
    const parsed = courseIdParamSchema.safeParse(req.params);

    if (!parsed.success) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid courseId param', parsed.error.flatten());
    }

    const userId = this.getUserId(req);
    await this.meService.unenroll(userId, parsed.data.courseId);

    res.status(StatusCodes.NO_CONTENT).send();
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    const parsed = meTasksQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Invalid query params for tasks',
        parsed.error.flatten(),
      );
    }

    const userId = this.getUserId(req);
    const tasks = await this.meService.getTasksByCourse(userId, parsed.data.courseId);

    res.status(StatusCodes.OK).json(tasks);
  }

  async completeTask(req: Request, res: Response): Promise<void> {
    const parsed = taskIdParamSchema.safeParse(req.params);

    if (!parsed.success) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid taskId param', parsed.error.flatten());
    }

    const userId = this.getUserId(req);
    const result = await this.meService.completeTask(userId, parsed.data.taskId);

    res.status(StatusCodes.OK).json(result);
  }

  async uncompleteTask(req: Request, res: Response): Promise<void> {
    const parsed = taskIdParamSchema.safeParse(req.params);

    if (!parsed.success) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid taskId param', parsed.error.flatten());
    }

    const userId = this.getUserId(req);
    const result = await this.meService.uncompleteTask(userId, parsed.data.taskId);

    res.status(StatusCodes.OK).json(result);
  }

  private getUserId(req: Request): string {
    const userId = req.user?.sub;

    if (!userId) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
    }

    return userId;
  }
}
