/* eslint-disable no-undef */
import request from 'supertest';
import { HTTPServer } from '../../../server/server';
import routes from '../../routes';
import assert from 'assert';

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
    test('should return a status code of 200',function() {
      request('http://localhost:8080')
          .get('/v1/healthCheck')
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect(function (res) {
              assert(res.body.hasOwnProperty('status'));
              assert(res.body.hasOwnProperty('message'));
            })
          .end(function (err, res){
            if(err) throw  err;
          })
    });
  });
});
