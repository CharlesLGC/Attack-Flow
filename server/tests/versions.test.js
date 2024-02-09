const request = require('supertest');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const runAllSeeders = require('../seeders');
const Version = require('../entity/Version');
const UserProject = require('../entity/UserProject');
const Annotation = require('../entity/Annotation');
const AnnotationVersion = require('../entity/AnnotationVersion');

const app = require('../app', { exports: true });

jest.mock('../middlewares/verify', () => ({
  verify: jest.fn(),
}));

describe('Versions Routes', () => {
  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    await runAllSeeders(dataSource);
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('root', () => {
    it('should return all versions of an attackflow that you have access to', async () => {
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
      const versions = await dataSource.getRepository(Version).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const res = await request(app).get(
        `/versions?projectID=${targetProject.project}`,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(versions.length);
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
        `/versions?projectID=${targetProject.project}`,
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
      const res = await request(app).get(`/versions`);
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
      const res = await request(app).get(`/versions?projectID=`);
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
      const res = await request(app).get('/versions?projectID=');
      expect(res.statusCode).toBe(500);
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });
  });

  describe('/create', () => {
    it('should create a new version for an attackflow that you have access to', async () => {
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
          is_currently_existing: true,
        },
      });
      const annotationVersions = await dataSource
        .getRepository(AnnotationVersion)
        .find();
      const res = await request(app)
        .post('/versions/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          title: '6.0',
        });
      expect(res.statusCode).toBe(200);
      const version = await dataSource.getRepository(Version).find({
        where: {
          title: '6.0',
          project_id: targetProject.project,
        },
      });
      expect(version.length).toBe(1);
      const newAnnotationVersions = await dataSource
        .getRepository(AnnotationVersion)
        .find();
      expect(newAnnotationVersions.length).toBe(
        annotationVersions.length + annotations.length,
      );
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
        .post('/versions/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          title: '6.0',
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
        .post('/versions/create')
        .set('Content-type', 'application/json')
        .send({
          title: '6.0',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if title is missing', async () => {
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
        .post('/versions/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
        });
      expect(res.statusCode).toBe(500);
    });
  });
});
