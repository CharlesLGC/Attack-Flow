const request = require('supertest');
const { verify } = require('../middlewares/verify');
const dataSource = require('../utils/database');
const runAllSeeders = require('../seeders');
const User = require('../entity/User');

const app = require('../app', { exports: true });

describe('Initial test', () => {
  it('index route returns 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8',
    );
    expect(res.body.data).toBe('Hello World');
  });
  it('unregistered route returns 404', async () => {
    const res = await request(app).get('/testing123notfound');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8',
    );
    expect(res.body.data).toBe('404 not found');
  });
});

jest.mock('../middlewares/verify', () => ({
  verify: jest.fn(),
}));
describe('Authentication test', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    await runAllSeeders(dataSource);
  });

  describe('Creating User Test', () => {
    it('Login counter of 1', async () => {
      verify.mockImplementationOnce((req, _, next) => {
        req.auth = {
          payload: {
            loginCounter: 1,
            name: 'testuser10@gmail.com',
            email: 'testuser10@gmail.com',
            password: 'Abc12345!',
          },
        };
        next();
      });
      const res = await request(app).get('/verify');
      expect(res.body.data).toBe('Successful');

      const user = await dataSource.getRepository(User).find({
        where: {
          name: 'testuser10@gmail.com',
        },
      });
      expect(user.length).toBe(1);
    });

    it('Login counter of 2', async () => {
      verify.mockImplementationOnce((req, _, next) => {
        req.auth = {
          payload: {
            loginCounter: 2,
            name: 'testuser11@gmail.com',
            email: 'testuser11@gmail.com',
            password: 'Abc12345!',
          },
        };
        next();
      });
      const res = await request(app).get('/verify');
      expect(res.body.data).toBe('Successful');

      const user = await dataSource.getRepository(User).find({
        where: {
          name: 'testuser11@gmail.com',
        },
      });
      expect(user.length).toBe(0);
    });
  });
});
