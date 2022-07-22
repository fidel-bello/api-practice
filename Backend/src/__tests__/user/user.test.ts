/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
import supertest from 'supertest';
import { generateFromEmail, generateUsername } from 'unique-username-generator';

jest.setTimeout(30000);
const port = 8080;
const url = `http://localhost:${port}`;
const request = supertest(url);
const randomEmail = generateFromEmail('john.doe@email.com', 4);
const randomUsername = generateUsername('-', 3);
const randomAge = Math.floor(Math.random() * 40) + 15;

describe('Register user', () => {
  test('should create a new user', async () => {
    const res = await request.post('/v1/register').send({
      testGenerated: true,
      username: randomUsername,
      name: 'John Doe',
      email: randomEmail,
      password: 'johnDoe123',
      age: randomAge
    });
    const { statusCode, body } = res;
    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.token).toBeTruthy();
  });
});

describe('login', () => {
  test('should login the user', async () => {
    const res = await request.post('/v1/login').send({
      testGenerated: true,
      username: randomUsername,
      password: 'johnDoe123',
    });
    const { statusCode, body } = res;
    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
  });
});

describe('logout', () => {
  test('should logout user', async () => {
    const res = await request.get('/v1/logout');
    const { statusCode, body } = res;
    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
  });
});

describe('get all users', () => {
  test('route should get all the registered users', async () => {
    const res = await request.get('/v1/users');
    const { statusCode } = res;
    expect(statusCode).toBe(200);
  });
});
