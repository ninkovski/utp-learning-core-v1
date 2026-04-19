import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { AppError } from '../../common/errors/AppError';
import { env } from '../../config/env';
import { prisma } from '../../lib/prisma';
import type { LoginInput } from './auth.schema';

export class AuthService {
  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true, email: true, password: true, name: true },
    });

    if (!user || user.password !== input.password) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    const payload: Express.UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name ?? undefined,
    };

    const accessToken = jwt.sign(payload, env.jwtSecret, {
      expiresIn: '1h',
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
