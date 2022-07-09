/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import userModel from './userModel';
import { IUserModel } from './interface/user';
import * as jwt from '../utils/helpers/auth/jwt';

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
    try {
      const data = req.body;
      const { username, password } = data;
      if (!username || !password) throw new Error('Must include email or password');
      const user = await userModel.logInOnly(data) as unknown as IUserModel;
      const passwordMatch = user.comparePassword(password);
      if (!passwordMatch) throw new Error('Invalid email or password');
      jwt.sendToken(user, 200, res);
    } catch (error) {
      const message = `400, user not found: ${error}`;
      JSON.stringify(message);
    }
  };
}
