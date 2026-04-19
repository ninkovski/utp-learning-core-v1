import { Router } from 'express';

import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

const coursesService = new CoursesService();
const coursesController = new CoursesController(coursesService);

export const coursesRouter = Router();

coursesRouter.get('/', (req, res, next) => {
  void coursesController.getAllCourses(req, res).catch(next);
});

coursesRouter.get('/:id', (req, res, next) => {
  void coursesController.getCourseById(req, res).catch(next);
});
