import { HTTPServer } from './app/server/server';

const app = new HTTPServer(8080);
app.connection();
