/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import config from 'config';
import { HTTPServer } from './app/server/server';
import router from './app/api/routes';

export const app = new HTTPServer(config.get('PORT'), router, config.get('JWT_EXPIRE'), config.get('SECRET_KEY'));
app.connection();
