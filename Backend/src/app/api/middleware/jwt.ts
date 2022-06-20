/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import config from 'config';
import { Response } from 'express';
import { IUserModel } from '../user/interface/user';

export const sendToken = (user: IUserModel, statusCode: number, res: Response) => {
  const token = user.schema.methods.getToken();
  const options = {
    expires: new Date(Date.now() + parseInt(config.get('JWT_EXPIRE'), 10)),
    httpOnly: true
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message: `Welcome ${user.username}`,
    token,
    user
  });
};
