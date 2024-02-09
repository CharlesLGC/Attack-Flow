const request = require('supertest');
const dataSource = require('../utils/database');

const app = require('../app', { exports: true });

describe('Test Database', () => {
  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
  });

  it('Add One TestUser', async () => {
    // Insert one user
    let res = await request(app).get('/test-add');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8',
    );
    expect(res.body.name).toBe('jason');

    // List user
    res = await request(app).get('/test-list');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8',
    );
    expect(res.body.length).toBe(1);
  });
  it('Add Two TestUser', async () => {
    // Insert two users
    let res = await request(app).get('/test-add');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8',
    );
    expect(res.body.name).toBe('jason');
    res = await request(app).get('/test-add');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8',
    );
    expect(res.body.name).toBe('jason');

    // List users
    res = await request(app).get('/test-list');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8',
    );
    expect(res.body.length).toBe(2);
  });

  it('Test composite', async () => {
    // Insert one user
    const res = await request(app).get('/test-annotation');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8',
    );
    expect(res.body.project.title).toBe('test project title');
    expect(res.body.user.email).toBe('test@gmail.com');
    expect(res.body.annotation.project).toBe(res.body.project.id);
    expect(res.body.annotation.user).toBe(res.body.user.email);
  });
});
