/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../../../user/userModel';

export const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = user.getToken();
  const millisecs = 24 * 60 * 1000;
  const options = {
    expires: new Date(Date.now() + parseInt(config.get('COOKIE_EXPIRE'), 10) * millisecs),
    httpOnly: true
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message: `Welcome, ${user.username}`,
    token,
    user
  });
};

export const isAuth = async (req: any, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error('Must loggin to access this route');
    const decoded: any = jwt.verify(token, config.get('SECRET_KEY'));
    req.user = await userModel.details(decoded.id);
    next();
  } catch (error) {
    if (error) throw error;
  }
};
