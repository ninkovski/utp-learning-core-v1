import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { env } from '../../config/env';

export function authJwt(req: Request, _res: Response, next: NextFunction): void {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    next(new AppError(StatusCodes.UNAUTHORIZED, 'Missing or invalid Authorization header'));
    return;
  }

  const token = authorization.substring('Bearer '.length);

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as Express.UserPayload;
    req.user = decoded;
    next();
  } catch {
    next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token'));
  }
}
