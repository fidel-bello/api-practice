/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { SchemaDefinition } from 'mongoose';
import config from 'config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Model } from '../model/mongoModel';
import { IUserModel } from './interface/user';

declare module '../model/mongoModel' {
  interface Model {
      comparePassword: (enterPassword: string, user: string) => Promise<boolean>
      getToken(): string;
      generateToken: ({ username, id }: IUserModel) => Promise<string>
  }
}

Model.prototype.comparePassword = async function (enteredPassword: string, user: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, user);
};

Model.prototype.getToken = function () {
  return jwt.sign({ id: this._id }, config.get('SECRET_KEY'), {
    expiresIn: parseInt(config.get('JWT_EXPIRE'), 10), algorithm: config.get('ALGORITHM')
  });
};

const userDefinition: SchemaDefinition = {
  username: { type: String, required: true, unique: true },
  name: { type: String },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
};

const userModel: Model = new Model(userDefinition);

userModel.schema.pre<IUserModel>('save', async function encrypt(next): Promise<void> {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
});

userModel.model = mongoose.model<IUserModel>('User', userModel.schema);

export default userModel;
