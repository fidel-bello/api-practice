/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
import config from 'config';
import { assert } from 'console';
import supertest from 'supertest';
import sample from './userSample.json';

const port = config.get('PORT');
const url = `http://localhost:${port}`;
const request = supertest(url);

describe('Register user', () => {
  it('should create a new user', () => {
    request.post('/v1/register').send(sample)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('token')
      .expect((res) => {
        assert(res.body.hasOwnProperty('status'));
        assert(res.body.hasOwnProperty('message'));
      });
  });
});
