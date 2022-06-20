/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { SchemaDefinition } from 'mongoose';
import config from 'config';
import jwt from 'jsonwebtoken';
import { Model } from '../model/mongoModel';
import { IUserModel } from './interface/user';

const userDefinition: SchemaDefinition = {
  username: { type: String, required: true, unique: true },
  name: { type: String },
  age: { type: Number, required: true },
  password: { type: String, required: true },
};

const userModel: Model = new Model(userDefinition);

userModel.schema.methods.getToken = function getToken() {
  return jwt.sign({ id: this._id }, config.get('SECRET_KEY'), {
    expiresIn: parseInt(config.get('JWT_EXPIRE'), 10), algorithm: config.get('ALGORITHM')
  });
};

userModel.model = mongoose.model<IUserModel>('user', userModel.schema);

export default userModel;
