const request = require('supertest');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const runAllSeeders = require('../seeders');
const Project = require('../entity/Project');
const UserProject = require('../entity/UserProject');

const app = require('../app', { exports: true });

jest.mock('../middlewares/verify', () => ({
  verify: jest.fn(),
}));

describe('Attackflows Routes', () => {
  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    await runAllSeeders(dataSource);
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('/list', () => {
    it('should return list of userProjects with populated projects', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'alice@attackflow.com',
          },
        };
        next();
      });
      const res = await request(app).get('/attackflows/list');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
    it('should return empty list if no projects found', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'unknownuser@gmail.com',
          },
        };
        next();
      });
      const res = await request(app).get('/attackflows/list');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });

  describe('/get', () => {
    it('should return the project that was rightfully created by user', async () => {
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
      const res = await request(app).get(
        `/attackflows/get?projectID=${projectID}`,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].id).toBe(projectID);
    });
    it('should not return project because not created by user', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'any_email@gmail.com',
          },
        };
        next();
      });
      const projects = await dataSource.getRepository(Project).find();
      const projectID = projects[0].id;
      const res = await request(app).get(
        `/attackflows/get?projectID=${projectID}`,
      );
      expect(res.statusCode).toBe(500);
    });
    it('should return error if no projectID query parameter', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const res = await request(app).get(`/attackflows/get`);
      expect(res.statusCode).toBe(500);
    });
    it('should return error if empty projectID query parameter', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const res = await request(app).get(`/attackflows/get?projectID=`);
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
      const res = await request(app).get(
        '/attackflows/get?projectID=testingID',
      );
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/approve', () => {
    it('should return list of approved attackflows only', async () => {
      const res = await request(app).get('/attackflows/approved');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(
        'application/json; charset=utf-8',
      );
      const attackflows = res.body;
      attackflows.forEach((attackflow) => {
        expect(attackflow.is_approved).toBe(true);
      });
      expect(attackflows.length).toBe(2);
    });
    it('should return error if exists', async () => {
      jest
        .spyOn(dataSource, 'getRepository')
        .mockImplementationOnce(() => new Error('Mock error'));
      const res = await request(app).get('/attackflows/approved');
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/create', () => {
    beforeEach(() => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
    });
    it('should return 200 when success', async () => {
      const res = await request(app)
        .post('/attackflows/create')
        .set('Content-type', 'application/json')
        .send({
          title: 'test title',
          description: 'test description',
        });
      expect(res.statusCode).toBe(200);
    });
    it('should return error if title is missing', async () => {
      const res = await request(app)
        .post('/attackflows/create')
        .set('Content-type', 'application/json')
        .send({
          description: 'test description',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if description is missing', async () => {
      const res = await request(app)
        .post('/attackflows/create')
        .set('Content-type', 'application/json')
        .send({
          title: 'test title',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if database exists', async () => {
      jest
        .spyOn(dataSource, 'getRepository')
        .mockImplementationOnce(() => new Error('Mock error'));
      const res = await request(app)
        .post('/attackflows/create')
        .set('Content-type', 'application/json')
        .send({
          title: 'test title',
          description: 'test description',
        });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/delete', () => {
    it('should return delete the attackflow that you have access to', async () => {
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
        .post('/attackflows/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
        });
      expect(res.statusCode).toBe(200);
      const deletedProject = await dataSource.getRepository(Project).find({
        where: {
          id: targetProject.project,
        },
      });
      expect(deletedProject.length).toBe(0);
    });
    it('should not delete project if the user does not have access', async () => {
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
        .post('/attackflows/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
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
        .post('/attackflows/delete')
        .set('Content-type', 'application/json')
        .send({});
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/update', () => {
    it('should update the attackflow that you have access to', async () => {
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
        .put('/attackflows/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          title: 'a new and cool title',
          description: 'a new and cool description',
        });
      expect(res.statusCode).toBe(200);
      const project = await dataSource.getRepository(Project).find({
        where: {
          id: targetProject.project,
        },
      });
      expect(project[0].title).toBe('a new and cool title');
      expect(project[0].description).toBe('a new and cool description');
    });
    it('should not update the attackflow that the user has no access to', async () => {
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
        .put('/attackflows/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          title: 'a new and cool title',
          description: 'a new and cool description',
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
        .put('/attackflows/update')
        .set('Content-type', 'application/json')
        .send({
          title: 'a new and cool title',
          description: 'a new and cool description',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if there is an unknown field', async () => {
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
        .put('/attackflows/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          title: 'a new and cool title',
          description: 'a new and cool description',
          someRandomField: 'hello world',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should update the attackflow even if all editable fields are not present', async () => {
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
      const project = await dataSource.getRepository(Project).find({
        where: {
          id: targetProject.project,
        },
      });
      const res = await request(app)
        .put('/attackflows/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          description: 'a new and cool description',
        });
      expect(res.statusCode).toBe(200);
      const updatedProject = await dataSource.getRepository(Project).find({
        where: {
          id: targetProject.project,
        },
      });
      expect(updatedProject[0].title).toBe(project[0].title);
      expect(updatedProject[0].description).toBe('a new and cool description');
    });
  });

  describe('/hide', () => {
    it('should hide the attackflow that you have access to', async () => {
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
        .put('/attackflows/hide')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          hide: true,
        });
      expect(res.statusCode).toBe(200);
      const project = await dataSource.getRepository(Project).find({
        where: {
          id: targetProject.project,
        },
      });
      expect(project[0].is_hidden).toBe(true);
    });
    it('should show the attackflow that you have access to', async () => {
      const email = 'john@attackflow.com';
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
        .put('/attackflows/hide')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          hide: false,
        });
      expect(res.statusCode).toBe(200);
      const project = await dataSource.getRepository(Project).find({
        where: {
          id: targetProject.project,
        },
      });
      expect(project[0].is_hidden).toBe(false);
    });
    it('should not publish or unpublish the attackflow that the user has no access to', async () => {
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
        .put('/attackflows/hide')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          hide: false,
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
        .put('/attackflows/hide')
        .set('Content-type', 'application/json')
        .send({
          hide: false,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if hide is missing', async () => {
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
        .put('/attackflows/hide')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
        });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/upload-file/:id', () => {
    it('should upload the file to the attackflow that you have access to', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        req.files = {
          file: {
            name: 'sample-name',
            mimetype: 'application/sample-type',
            data: Buffer.from('sample content'),
            mv: () => {},
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
        .post(`/attackflows/upload-file/${targetProject.project}`)
        .set('Content-type', 'application/json');
      expect(res.statusCode).toBe(200);
      const project = await dataSource.getRepository(Project).find({
        where: {
          id: targetProject.project,
        },
      });
      expect(project[0].url).toBe('uploads/sample-name');
    });
    it('should not upload the file to the attackflow that you have no access to', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'unknownuser@gmail.com',
          },
        };
        req.files = {
          file: {
            name: 'sample-name',
            mimetype: 'application/sample-type',
            data: Buffer.from('sample content'),
            mv: () => {},
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
        .post(`/attackflows/upload-file/${targetProject.project}`)
        .set('Content-type', 'application/json');
      expect(res.statusCode).toBe(500);
    });
    it('should return error if projectID is invalid', async () => {
      const email = 'alice@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        req.files = {
          file: {
            name: 'sample-name',
            mimetype: 'application/sample-type',
            data: Buffer.from('sample content'),
            mv: () => {},
          },
        };
        next();
      });
      const res = await request(app)
        .post(`/attackflows/upload-file/test`)
        .set('Content-type', 'application/json');
      expect(res.statusCode).toBe(500);
    });
    it('should upload the file to the attackflow that you have access to', async () => {
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
        .post(`/attackflows/upload-file/${targetProject.project}`)
        .set('Content-type', 'application/json');
      expect(res.statusCode).toBe(500);
    });
  });
});
