import mongoose from 'mongoose';
import { logger } from '../../server/logger';

// use global promise for mongoose and node
(<any>mongoose).Promise = global.Promise;

interface IOnConnectedCallBack {
    () : void;
}

export default class MongoConnection {
  private readonly URL: string;

  private _onConnectedCallBack!: IOnConnectedCallBack;

  private isConnectedBefore: boolean = false;

  private startConnection = () => {
    logger.log({
      level: 'info',
      message: `Connecting to Mongo at ${this.URL}`
    });
    mongoose.connect(this.URL).catch(() => {});
  };

  private onConnected = () => {
    logger.log({
      level: 'info',
      message: `Connected to MongoDB at ${this.URL}`
    });
    this.isConnectedBefore = true;
    this._onConnectedCallBack();
  };

  constructor(url: string) {
    mongoose.set('debug', true);
    this.URL = url;
  }

  get onConnectedCallBack(): IOnConnectedCallBack {
    return this._onConnectedCallBack;
  }

  public connect(onConnectedCallBack: IOnConnectedCallBack) {
    this._onConnectedCallBack = onConnectedCallBack;
    this.startConnection();
  }
}
