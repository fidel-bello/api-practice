/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import userModel from './userModel';
import { ISample } from './interface/user';

export class UserController {
  constructor(init?: Partial<UserController>) {
    Object.assign(this, init);
  }

  public postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as unknown as ISample;
      const result = await userModel.add(data);
      res.status(200).json({
        result
      });
    } catch (err) { next(err); }
  };
}
