const request = require('supertest');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const runAllSeeders = require('../seeders');
const ApprovalRequest = require('../entity/ApprovalRequest');
const Project = require('../entity/Project');
const UserProject = require('../entity/UserProject');

const app = require('../app', { exports: true });

jest.mock('../middlewares/verify', () => ({
  verify: jest.fn(),
}));

describe('Approval Requests Routes', () => {
  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    await runAllSeeders(dataSource);
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('/list', () => {
    it('should return pending approval requests of an attackflow for an admin', async () => {
      const email = 'root@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const requests = await dataSource.getRepository(ApprovalRequest).find({
        where: { status: false },
      });
      const res = await request(app).get('/approval-requests/list');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(requests.length);
    });
    it('should not return approval requests of an attackflow if not admin', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const res = await request(app).get('/approval-requests/list');
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
      const res = await request(app).get('/approval-requests/list');
      expect(res.statusCode).toBe(500);
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });
  });

  describe('/update', () => {
    it('should update pending approval and project if approve is true by an admin', async () => {
      const email = 'root@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const requests = await dataSource.getRepository(ApprovalRequest).find({
        where: { status: false },
      });
      const targetRequest = requests[0];
      const res = await request(app)
        .post('/approval-requests/update')
        .set('Content-type', 'application/json')
        .send({
          requestID: targetRequest.id,
          approve: true,
        });
      expect(res.statusCode).toBe(200);
      const updatedRequest = await dataSource
        .getRepository(ApprovalRequest)
        .find({
          where: { id: targetRequest.id },
        });
      expect(updatedRequest[0].status).toBe(true);
      const project = await dataSource.getRepository(Project).find({
        where: { id: targetRequest.project },
      });
      expect(project[0].is_approved).toBe(true);
    });
    it('should update pending approval only if approve is false by an admin', async () => {
      const email = 'root@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const requests = await dataSource.getRepository(ApprovalRequest).find({
        where: { status: false },
      });
      const targetRequest = requests[0];
      const res = await request(app)
        .post('/approval-requests/update')
        .set('Content-type', 'application/json')
        .send({
          requestID: targetRequest.id,
          approve: false,
        });
      expect(res.statusCode).toBe(200);
      const updatedRequest = await dataSource
        .getRepository(ApprovalRequest)
        .find({
          where: { id: targetRequest.id },
        });
      expect(updatedRequest[0].status).toBe(true);
      const project = await dataSource.getRepository(Project).find({
        where: { id: targetRequest.project },
      });
      expect(project[0].is_approved).toBe(false);
    });
    it('should not update for resolved approval requests by an admin', async () => {
      const email = 'root@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const requests = await dataSource.getRepository(ApprovalRequest).find({
        where: { status: true },
      });
      const targetRequest = requests[0];
      const res = await request(app)
        .post('/approval-requests/update')
        .set('Content-type', 'application/json')
        .send({
          requestID: targetRequest.id,
          approve: true,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not update if not an admin', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const requests = await dataSource.getRepository(ApprovalRequest).find({
        where: { status: false },
      });
      const targetRequest = requests[0];
      const res = await request(app)
        .post('/approval-requests/update')
        .set('Content-type', 'application/json')
        .send({
          requestID: targetRequest.id,
          approve: false,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not update if approve field is missing', async () => {
      const email = 'root@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const requests = await dataSource.getRepository(ApprovalRequest).find({
        where: { status: false },
      });
      const targetRequest = requests[0];
      const res = await request(app)
        .post('/approval-requests/update')
        .set('Content-type', 'application/json')
        .send({
          requestID: targetRequest.id,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not update if requestID field is missing', async () => {
      const email = 'root@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const res = await request(app)
        .post('/approval-requests/update')
        .set('Content-type', 'application/json')
        .send({
          approve: true,
        });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/create', () => {
    it('should create approval request if project exist', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const userProjects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const projectID = userProjects[0].project;
      const res = await request(app)
        .post('/approval-requests/create')
        .set('Content-type', 'application/json')
        .send({
          description: 'test description',
          projectID,
        });
      expect(res.statusCode).toBe(200);
      const requestQuery = await dataSource
        .getRepository(ApprovalRequest)
        .find({
          where: {
            id: res.body.id,
          },
        });
      expect(requestQuery.length).toBe(1);
    });
    it('should not create approval request if project does not belong to user', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const userProjects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const projectID = userProjects[0].project;
      const res = await request(app)
        .post('/approval-requests/create')
        .set('Content-type', 'application/json')
        .send({
          description: 'test description',
          projectID,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not create approval request if description field is missing', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const userProjects = await dataSource.getRepository(UserProject).find({
        where: {
          user: email,
        },
      });
      const projectID = userProjects[0].project;
      const res = await request(app)
        .post('/approval-requests/create')
        .set('Content-type', 'application/json')
        .send({
          projectID,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not create approval request if projectID field is missing', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const res = await request(app)
        .post('/approval-requests/create')
        .set('Content-type', 'application/json')
        .send({
          description: 'test description',
        });
      expect(res.statusCode).toBe(500);
    });
  });
});
