import { IModel } from '../../model/mongoModel';

export interface ISample extends IModel {
    name: string,
    age: number
}
