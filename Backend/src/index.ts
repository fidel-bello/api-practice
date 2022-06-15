import { HTTPServer } from './app/server/server';
import router from './app/api/routes';

const app = new HTTPServer(8080, router);
app.connection();
