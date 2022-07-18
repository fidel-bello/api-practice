/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import userModel from './userModel';
import { IUserModel } from './interface/user';
import * as jwt from '../utils/helpers/auth/jwt';
import { logger } from '../logger/logger';
import { sendToken } from '../utils/helpers/auth/jwt';

export class UserController {
  constructor(init?: Partial<UserController>) {
    Object.assign(this, init);
  }

  public postUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const result = await userModel.add(data) as IUserModel;
      jwt.sendToken(result, 200, res);
    } catch (error) {
      if (error) throw error;
    }
  };

  public getSingleUser = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const user = req.params.id;
      const result = await userModel.details(user) as unknown as IUserModel;
      res.status(200).json({
        success: true,
        user: {
          username: result.username,
          name: result.name,
          age: result.age,
          email: result.email,
        },
      });
    } catch (error) {
      if (error) throw error;
    }
  };

  public logInUser = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    if (!username || !password) throw new Error('please enter email or password');
    const user = await userModel.findbyUsername(username);
    const isMatch = await userModel.comparePassword(password, user.password);
    if (!isMatch) {
      logger.log({
        level: 'error',
        message: 'Password do not match'
      });
      throw new Error('Invalid password');
    }
    sendToken(user, 200, res);
  };

  public logout = async (_req: Request, res: Response):Promise<void> => {
    try {
      res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
      });
      res.status(200).json({
        success: true,
        message: 'Logged Out'
      });
    } catch (error) {
      if (error) throw error;
    }
  };
}
