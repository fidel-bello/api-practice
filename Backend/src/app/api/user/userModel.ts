import mongoose, { SchemaDefinition } from 'mongoose';
import { Model } from '../model/mongoModel';
import { IUserModel } from './interface/user';

const userDefinition: SchemaDefinition = {
  username: { type: String, required: true, unique: true },
  name: { type: String },
  age: { type: Number, required: true },
  password: { type: String, required: true },
};

const userModel: Model = new Model(userDefinition);
userModel.model = mongoose.model<IUserModel>('user', userModel.schema);

export default userModel;
