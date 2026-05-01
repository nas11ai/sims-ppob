import { JwtPayload } from 'jsonwebtoken';

export interface AuthPayload extends JwtPayload {
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
