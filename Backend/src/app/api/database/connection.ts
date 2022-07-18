/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import mongoose from 'mongoose';
import { logger } from '../logger/logger';

// use global promise for mongoose and node
(<any>mongoose).Promise = global.Promise;

interface IOnConnectedCallBack {
    () : void;
}

export default class MongoConnection {
  private readonly URL: string;

  private _onConnectedCallBack!: IOnConnectedCallBack;

  private _isConnectedBefore: boolean = false;

  public get isConnectedBefore(): boolean {
    return this._isConnectedBefore;
  }

  public set isConnectedBefore(value: boolean) {
    this._isConnectedBefore = value;
  }

  private startConnection = async () => {
    logger.log({
      level: 'info',
      message: `Connecting to Mongo at ${this.URL}`
    });
    await mongoose.connect(this.URL);
  };

  private _onConnected = () => {
    logger.log({
      level: 'info',
      message: `Connected to MongoDB at ${this.URL}`
    });
    this.isConnectedBefore = true;
    this._onConnectedCallBack();
  };

  public get onConnected() {
    return this._onConnected;
  }

  public set onConnected(value) {
    this._onConnected = value;
  }

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
