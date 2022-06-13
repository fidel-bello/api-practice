/* eslint-disable no-console */
import { createServer, ServerResponse, IncomingMessage } from 'http';

export class HTTPServer {
  private _port: number;

  constructor(port: number) {
    this._port = port;
  }

  public set port(port: number) {
    this._port = port;
  }

  public get port(): number {
    return this._port;
  }

  public connection() {
    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      res.end('successful');
    });
    server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
