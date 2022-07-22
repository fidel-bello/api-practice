/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import jwt from 'jsonwebtoken';
import config from 'config';
import mongoose, { SchemaDefinition } from 'mongoose';
import { Model } from '../../model/mongoModel';
import { IToken } from './interface/token';
import { IUserModel } from '../interface/user';

Model.prototype.generateToken = async ({ username, id }: IUserModel) => {
  const token = jwt.sign({ username, id }, config.get('SECRET_KEY'));
  await tokenModel.model.create({
    user: id,
    token
  });
  return token;
};

const tokenDefintion: SchemaDefinition = {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: { type: String }
};
const tokenModel: Model = new Model(tokenDefintion);
tokenModel.model = mongoose.model<IToken>('Token', tokenModel.schema);
export default tokenModel;
