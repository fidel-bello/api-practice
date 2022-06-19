/* eslint-disable no-prototype-builtins */
import request from 'supertest';
import assert from 'assert';

describe('post user', () => {
  describe('while the api is hit,', () => {
    it('should post a new user', () => {
      request('http://localhost:8080')
        .post('/v1/register')
        .send({
          username: 'fbellos', name: 'Fidel', age: 23, email: 'test@email.com', password: '123456'
        })
        .expect('Content-Type', 'application/json')
        .expect(200)
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
