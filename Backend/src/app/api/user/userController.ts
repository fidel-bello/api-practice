/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import userModel from './userModel';
import { IUserModel } from './interface/user';
import { logger } from '../logger/logger';
import { sendToken } from '../utils/helpers/auth/jwt';
import catchAsync from '../utils/middlewares/asyncErrors';
import { ErrorHandler } from '../utils/helpers/error/errorHandling';
import tokenModel from './token/token';

export class UserController {
  constructor(init?: Partial<UserController>) {
    Object.assign(this, init);
  }

  public postUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const result = await userModel.add(data) as IUserModel;
    sendToken(result, 200, res);
  });

  public postUserV2 = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const user = await userModel.add(data) as unknown as IUserModel;
    const token = await tokenModel.generateToken(user);
    res.status(200).json({
      success: true,
      token,
      user: {
        username: user.username,
        name: user.name,
        age: user.age,
        email: user.email,
      }
    });
  });

  public getSingleUser = catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
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
  });

  public logInUser = catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    if (!username || !password) throw new Error('please enter email or password');
    const user = await userModel.findbyUsername(username);
    const isMatch = await userModel.comparePassword(password, user.password);
    if (!isMatch) {
      logger.log({
        level: 'error',
        message: 'Password do not match'
      });
      throw new ErrorHandler('Passwords do not match', 404);
    }
    sendToken(user, 200, res);
  });

  public loginUserV2 = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    if (!username || !password) throw new ErrorHandler('Please enter email or password', 404);
    const user = await userModel.findbyUsername(username);
    const isMatch = await userModel.comparePassword(password, user.password);
    if (!isMatch) throw new ErrorHandler('Password or username is incorrect', 404);
    const token = await tokenModel.generateToken(user);
    res.status(200).json({
      success: true,
      message: `Welcome back ${user.username}`,
      user: {
        token,
        username: user.username,
        name: user.name,
        age: user.age,
        email: user.email,
      }
    });
  });

  public logout = catchAsync(async (_req: Request, res: Response):Promise<void> => {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
    });
    res.status(200).json({
      success: true,
      message: 'Logged Out'
    });
  });

  public AllUsers = catchAsync(async (_req: Request, res:Response): Promise<void> => {
    const users = await userModel.findAll();
    res.status(200).json({
      success: true,
      users
    });
  });
}
