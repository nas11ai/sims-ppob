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

export const getProfile = async (req: Request, res: Response) => {
  try {
    const data = await membershipService.getProfile(req.user!.email);
    return sendSuccess(res, 'Sukses', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const data = await membershipService.updateProfile(req.user!.email, req.body);
    return sendSuccess(res, 'Update Pofile berhasil', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};

export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return sendError(res, 'File tidak ditemukan', 102);
    }
    const data = await membershipService.updateProfileImage(req.user!.email, req.file);
    return sendSuccess(res, 'Update Profile Image berhasil', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};
