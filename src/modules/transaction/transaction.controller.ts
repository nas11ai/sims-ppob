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

export const transaction = async (req: Request, res: Response) => {
  try {
    const data = await transactionService.transaction(req.user!.email, req.body);
    return sendSuccess(res, 'Transaksi berhasil', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const limitRaw = req.query.limit;
    const limit = limitRaw !== undefined ? parseInt(limitRaw as string) : null;

    const data = await transactionService.getTransactionHistory(req.user!.email, offset, limit);
    return sendSuccess(res, 'Get History Berhasil', data);
  } catch (error: any) {
    return sendError(res, error.message, error.appStatus, error.statusCode);
  }
};
