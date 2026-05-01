import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  message: string,
  data: unknown = null,
  httpStatus = 200,
) => {
  return res.status(httpStatus).json({
    status: 0,
    message,
    data,
  });
};

export const sendError = (res: Response, message: string, statusCode: number, httpStatus = 400) => {
  return res.status(httpStatus).json({
    status: statusCode,
    message,
    data: null,
  });
};
