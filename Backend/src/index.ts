import { HTTPServer } from './app/server/server';
import router from './app/api/routes';
import config from 'config';

const app = new HTTPServer(config.get('PORT'), router);
app.connection();
