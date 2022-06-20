/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import request from 'supertest';
import assert from 'assert';
import { HTTPServer } from '../../server/server';
import routes from '../../api/routes';

const server = new HTTPServer(8080, routes);

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
    test('should return a status code of 200', () => {
      request('http://localhost:8080')
        .get('/v1/healthCheck')
        .expect(200)
        .expect('Content-Type', 'application/json')
        .expect((res) => {
          assert(res.body.hasOwnProperty('status'));
          assert(res.body.hasOwnProperty('message'));
        })
        .end((err) => {
          if (err) throw err;
        });
    });
  });
});
