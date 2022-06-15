/* eslint-disable no-undef */
import supertest from 'supertest';
import { HTTPServer } from '../../../server/server';
import routes from '../../routes';

const server = new HTTPServer(8080, routes);
const { app } = server;

describe('port', () => {
  describe('while running, the port, ', () => {
    it('should be on 8080', () => {
      const { port } = server;
      expect(port).toBe(8080);
    });
  });
});

describe('healthCheck', () => {
  describe('given route is successful', () => {
    it('should return a status code of 200', async () => {
      const { statusCode } = await supertest(app).get('/v1/healthCheck');
      expect(statusCode).toBe(200);
    });
  });
});
