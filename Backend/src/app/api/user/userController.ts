/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import userModel from './userModel';
import { IUserModel } from './interface/user';

export class UserController {
  constructor(init?: Partial<UserController>) {
    Object.assign(this, init);
  }

  public postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as unknown as IUserModel;
      const result = await userModel.add(data);
      res.status(200).json({
        result
      });
    } catch (err) { next(err); }
  };
}
