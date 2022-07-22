import { IModel } from '../../../model/mongoModel';
import { IUserModel } from '../../interface/user';

export interface IToken extends IModel {
    user: IUserModel['_id'],
    token: string,
}
