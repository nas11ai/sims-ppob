import { Request, Response } from 'express';
import * as membershipService from './membership.service';
import { sendSuccess, sendError } from '../../shared/response.helper';

export const register = async (req: Request, res: Response) => {
  try {
    await membershipService.register(req.body);
    return sendSuccess(res, 'Registrasi berhasil silahkan login');
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await membershipService.login(req.body);
    return sendSuccess(res, 'Login Sukses', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};
