import { IModel } from '../../model/mongoModel';

export interface IUserModel extends IModel {
    username: string,
    name: string,
    age: number,
    email: string,
    password: string
    // eslint-disable-next-line no-unused-vars
    comparePassword(params: string): string,
    getToken(): string,
}
