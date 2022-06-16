import mongoose from 'mongoose';
import { logger } from '../../server/logger';

// use global promise for mongoose and node
(<any>mongoose).Promise = global.Promise;

interface IOnConnectedCallBack {
    () : void;
}

export default class MongoConnection {
  
  private URL: string;

  private _onConnectedCallBack!: IOnConnectedCallBack;

  private isConnectedBefore: boolean = false;

  private startConnection = async () => {
    logger.log({
      level: 'info',
      message: `Connecting to Mongo at ${this.URL}`
    });
    await  mongoose.connect(this.URL).catch((error) => {
      console.log(error);
      process.exit(1);
    });
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
  public set url(url: string) {
    this.URL = url;
  }
  public get url(): string {
    return this.URL;
  }
  
  get onConnectedCallBack(): IOnConnectedCallBack {
    return this._onConnectedCallBack;
  }

  public connect(onConnectedCallBack: IOnConnectedCallBack) {
    this._onConnectedCallBack = onConnectedCallBack;
    this.startConnection();
  }
}
