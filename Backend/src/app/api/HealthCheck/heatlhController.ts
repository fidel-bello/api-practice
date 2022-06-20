/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars
  export const healthCheck = (_req: Request, res: Response, _next: NextFunction) => res.status(200).json({
  success: true,
  message: 'Working perfectly'
});
