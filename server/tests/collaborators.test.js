const request = require('supertest');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const runAllSeeders = require('../seeders');
const UserProject = require('../entity/UserProject');

const app = require('../app', { exports: true });

jest.mock('../middlewares/verify', () => ({
  verify: jest.fn(),
}));

describe('Collaborators Routes', () => {
  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    await runAllSeeders(dataSource);
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('root', () => {
    it('should return all collaborators of an attackflow that you have access to', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const targetProject = projects[0];
      const users = await dataSource.getRepository(UserProject).find({
        where: {
          project: targetProject.project,
        },
      });
      const res = await request(app).get(
        `/collaborators?projectID=${targetProject.project}`,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(users.length);
      expect(res.body[0].email).toBeDefined();
    });
    it('should not return if no access to attackflow', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'unknownuser@gmail.com',
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: 'alice@attackflow.com',
        },
      });
      const targetProject = projects[0];
      const res = await request(app).get(
        `/collaborators?projectID=${targetProject.project}`,
      );
      expect(res.statusCode).toBe(500);
    });
    it('should return error if projectID is missing', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const res = await request(app).get(`/collaborators`);
      expect(res.statusCode).toBe(500);
    });
    it('should return error if projectID is empty', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const res = await request(app).get(`/collaborators?projectID=`);
      expect(res.statusCode).toBe(500);
    });
    it('should return error if exists', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      jest
        .spyOn(dataSource, 'getRepository')
        .mockImplementationOnce(() => new Error('Mock error'));
      const res = await request(app).get('/collaborators?projectID=');
      expect(res.statusCode).toBe(500);
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });
  });

  describe('/add', () => {
    it('should add a new collaborator for an attackflow that you have access to', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const targetProject = projects[0];
      const res = await request(app)
        .post('/collaborators/add')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          email: 'john@attackflow.com',
        });
      expect(res.statusCode).toBe(200);
      const userProject = await dataSource.getRepository(UserProject).find({
        where: {
          project: targetProject.project,
          user: 'john@attackflow.com',
        },
      });
      expect(userProject.length).toBe(1);
    });
    it('should not add a new collaborator if collaborator does not exist', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const targetProject = projects[0];
      const res = await request(app)
        .post('/collaborators/add')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          email: 'unknownuser@gmail.com',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not add a new collaborator if the user is already a collaborator for an attackflow that you have access to', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const targetProject = projects[0];
      const res = await request(app)
        .post('/collaborators/add')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          email,
        });
      expect(res.statusCode).toBe(200);
      const userProject = await dataSource.getRepository(UserProject).find({
        where: {
          project: targetProject.project,
          user: email,
        },
      });
      expect(userProject.length).toBe(1);
    });
    it('should not a new version if no access to attackflow', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'unknownuser@gmail.com',
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: 'alice@attackflow.com',
        },
      });
      const targetProject = projects[0];
      const res = await request(app)
        .post('/collaborators/add')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          email: 'new_email@gmail.com',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if projectID is missing', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const res = await request(app)
        .post('/collaborators/add')
        .set('Content-type', 'application/json')
        .send({
          email: 'new_email@gmail.com',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if email is missing', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: 'alice@attackflow.com',
        },
      });
      const targetProject = projects[0];
      const res = await request(app)
        .post('/collaborators/add')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
        });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/delete', () => {
    it('should delete collaborator for an attackflow that you have access to', async () => {
      const email = 'alice@attackflow.com';
      const targetEmail = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const targetProject = projects[0];
      const userProject = dataSource.getRepository(UserProject).create({
        user: targetEmail,
        project: targetProject.project,
      });
      await dataSource.getRepository(UserProject).save(userProject);
      const res = await request(app)
        .post('/collaborators/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          email: targetEmail,
        });
      expect(res.statusCode).toBe(200);
      const userProjectQuery = await dataSource
        .getRepository(UserProject)
        .find({
          where: {
            project: targetProject.project,
            user: targetEmail,
          },
        });
      expect(userProjectQuery.length).toBe(0);
    });
    it('should delete collaborator if the specified email is ourself for an attackflow that you have access to', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const targetProject = projects[0];
      const res = await request(app)
        .post('/collaborators/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          email,
        });
      expect(res.statusCode).toBe(200);
      const userProject = await dataSource.getRepository(UserProject).find({
        where: {
          project: targetProject.project,
          user: email,
        },
      });
      expect(userProject.length).toBe(0);
    });
    it('should not a new version if no access to attackflow', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'unknownuser@gmail.com',
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: 'alice@attackflow.com',
        },
      });
      const targetProject = projects[0];
      const res = await request(app)
        .post('/collaborators/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          email: 'john@attackflow.com',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if projectID is missing', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const res = await request(app)
        .post('/collaborators/delete')
        .set('Content-type', 'application/json')
        .send({
          email: 'john@attackflow.com',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if email is missing', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(UserProject).find({
        where: {
          user: 'alice@attackflow.com',
        },
      });
      const targetProject = projects[0];
      const res = await request(app)
        .post('/collaborators/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
        });
      expect(res.statusCode).toBe(500);
    });
  });
});
