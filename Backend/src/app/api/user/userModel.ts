import mongoose, { SchemaDefinition } from 'mongoose';
import { Model } from '../model/mongoModel';
import { ISample } from './interface/user';

const userDefinition: SchemaDefinition = {
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
};

const userModel: Model = new Model(userDefinition);
userModel.model = mongoose.model<ISample>('user', userModel.schema);

export default userModel;
