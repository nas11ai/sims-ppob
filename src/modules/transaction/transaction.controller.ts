import { Request, Response } from 'express';
import * as transactionService from './transaction.service';
import { sendSuccess, sendError } from '../../shared/response.helper';

export const getBalance = async (req: Request, res: Response) => {
  try {
    const data = await transactionService.getBalance(req.user!.email);
    return sendSuccess(res, 'Get Balance Berhasil', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};

export const topup = async (req: Request, res: Response) => {
  try {
    const data = await transactionService.topup(req.user!.email, req.body);
    return sendSuccess(res, 'Top Up Balance berhasil', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};
