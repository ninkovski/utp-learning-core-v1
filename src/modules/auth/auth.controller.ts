import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../../common/errors/AppError';
import { loginSchema } from './auth.schema';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response): Promise<void> {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid login payload', parsed.error.flatten());
    }

    const result = await this.authService.login(parsed.data);
    res.status(StatusCodes.OK).json(result);
  }
}
