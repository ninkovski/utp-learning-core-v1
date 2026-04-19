import { z } from 'zod';

export const courseIdParamSchema = z.object({
  courseId: z.string().min(1, 'courseId is required'),
});

export const taskIdParamSchema = z.object({
  taskId: z.string().min(1, 'taskId is required'),
});

export const meTasksQuerySchema = z.object({
  courseId: z.string().min(1, 'courseId query param is required'),
});
