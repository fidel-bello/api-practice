/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-cycle
import { IModel } from '../../model/mongoModel';

export interface IUserModel extends IModel {
    username: string,
    name: string,
    age: number,
    email: string,
    password: string,
}
