/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
import supertest from 'supertest';
import sample from './userSample.json';

jest.setTimeout(30000);
const port = 8080;
const url = `http://localhost:${port}`;
const request = supertest(url);

describe('Register user', () => {
  test('should create a new user', async () => {
    const res = await request.post('/v1/register').send(sample);
    const { statusCode, body } = res;
    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.token).toBeTruthy();
  });
});
