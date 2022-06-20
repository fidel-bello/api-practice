/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express, { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from 'config';
import MongoConnection from '../api/database/connection';

const mongoConnection = new MongoConnection(config.get('URL'));

export const expressApp = express();
expressApp.use(cors());
expressApp.use(cookieParser());
expressApp.use(urlencoded({ extended: true }));
expressApp.use(json());

export class HTTPServer {
  private readonly _port: number;

  private readonly _router: Router;

  private useRouter() {
    this.app.use(this._router);
  }

  public app = expressApp;

  constructor(port: number, router: Router) {
    this._port = port;
    this._router = router;
    this.useRouter();
  }

  public get port(): number {
    return this._port;
  }

  public connection(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mongoConnection.connect(() => {});
    const server = this.app.listen(this.port, () => {
      console.log(`Server listening on PORT: ${this.port}`);
    });
    process.on('unhandledRejection', (error: Error) => {
      console.error(error.message);
      server.close(() => {
        process.exit(1);
      });
    });
  }
}
