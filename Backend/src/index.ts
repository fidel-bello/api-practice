/* eslint-disable import/no-extraneous-dependencies */
import config from 'config';
import { HTTPServer } from './app/server/server';
import router from './app/api/routes';

const app = new HTTPServer(config.get('PORT'), router);
app.connection();
