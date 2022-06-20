/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import userModel from './userModel';
import { IUserModel } from './interface/user';
import * as jwt from '../middleware/jwt';

export class UserController {
  constructor(init?: Partial<UserController>) {
    Object.assign(this, init);
  }

  public postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as unknown as IUserModel;
      const result = await userModel.add(data) as IUserModel;
      jwt.sendToken({ user: result, statusCode: 200, res });
    } catch (error) {
      const message = `400, token cannot be created: ${error}`;
      next(message);
    }
  };
}
