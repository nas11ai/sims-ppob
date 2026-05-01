import { Request, Response } from 'express';
import * as informationService from './information.service';
import { sendSuccess, sendError } from '../../shared/response.helper';

export const getBanners = async (_req: Request, res: Response) => {
  try {
    const data = await informationService.getBanners();
    return sendSuccess(res, 'Sukses', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus ?? 500, error.statusCode ?? 500);
  }
};

export const getServices = async (_req: Request, res: Response) => {
  try {
    const data = await informationService.getServices();
    return sendSuccess(res, 'Sukses', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus ?? 500, error.statusCode ?? 500);
  }
};
