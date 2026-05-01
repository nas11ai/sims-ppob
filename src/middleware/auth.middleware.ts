import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../types/express';
import { sendError } from '../shared/response.helper';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Token tidak tidak valid atau kadaluwarsa', 108, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
    req.user = payload;
    next();
  } catch {
    return sendError(res, 'Token tidak tidak valid atau kadaluwarsa', 108, 401);
  }
};
