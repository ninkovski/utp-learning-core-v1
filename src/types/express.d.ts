import 'express';

declare global {
  namespace Express {
    interface UserPayload {
      sub: string;
      email: string;
      name?: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
