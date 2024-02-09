const request = require('supertest');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const runAllSeeders = require('../seeders');
const Relationship = require('../entity/Relationship');
const UserProject = require('../entity/UserProject');
const Annotation = require('../entity/Annotation');

const app = require('../app', { exports: true });

jest.mock('../middlewares/verify', () => ({
  verify: jest.fn(),
}));

describe('Relationship Routes', () => {
  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    await runAllSeeders(dataSource);
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('root', () => {
    beforeEach(async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'alice@attackflow.com',
          },
        };
        next();
      });
    });
    it('should return list of relationships linked to an annotation', async () => {
      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          status: 'effect',
        },
      });
      const annotationID = relationships[0].source;
      const res = await request(app).get(
        `/relationships?annotationID=${annotationID}`,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
    it('should return list of relationships linked to an annotation', async () => {
      const res = await request(app).get('/relationships?annotationID=testID');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
    it('should return error if no projectID query parameter', async () => {
      const res = await request(app).get(`/relationships`);
      expect(res.statusCode).toBe(500);
    });
    it('should return error if empty projectID query parameter', async () => {
      const res = await request(app).get(`/relationships?annotationID=`);
      expect(res.statusCode).toBe(500);
    });
    it('should return error if exists', async () => {
      jest
        .spyOn(dataSource, 'getRepository')
        .mockImplementationOnce(() => new Error('Mock error'));
      const res = await request(app).get('/relationships?annotationID=testID');
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/create', () => {
    it('should create a new relationship for an attackflow that you have access to', async () => {
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
        },
      });
      const relationshipQuery = await dataSource
        .getRepository(Relationship)
        .find({
          where: {
            source: annotations[0].id,
            target: annotations[1].id,
          },
        });
      expect(relationshipQuery.length).toBe(0);
      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const targetRelationship = relationships[0];
      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          id: targetRelationship.id,
          projectID: targetProject.project,
          source: annotations[0].id,
          target: annotations[1].id,
          status: 'is-effect',
          type: {
            AND: true,
          },
        });
      expect(res.statusCode).toBe(200);
      const relationship = await dataSource.getRepository(Relationship).find({
        where: {
          source: annotations[0].id,
          target: annotations[1].id,
        },
      });
      expect(relationship.length).toBe(1);
    });
    it('should not create a new relationship if the relationship exists for an attackflow that you have access to', async () => {
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
        },
      });
      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const targetRelationship = relationships[0];
      const relationshipQuery = dataSource.getRepository(Relationship).create({
        id: targetRelationship.id,
        source: annotations[0].id,
        target: annotations[1].id,
        status: 'is-effect',
        type: {
          OR: true,
        },
      });
      await dataSource.getRepository(Relationship).save(relationshipQuery);
      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          source: annotations[0].id,
          target: annotations[1].id,
          status: 'is-effect',
          type: {
            AND: true,
          },
        });
      expect(res.statusCode).toBe(200);
      const relationship = await dataSource.getRepository(Relationship).find({
        where: {
          source: annotations[0].id,
          target: annotations[1].id,
        },
      });
      expect(relationship.length).toBe(1);
    });
    it('should not create a new relationship if no access to attackflow', async () => {
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          source: annotations[0].id,
          target: annotations[1].id,
          status: 'is-effect',
          type: {
            AND: true,
          },
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if projectID is missing', async () => {
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          source: annotations[0].id,
          target: annotations[1].id,
          status: 'is-effect',
          type: {
            AND: true,
          },
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if source is missing', async () => {
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          target: annotations[1].id,
          status: 'is-effect',
          type: {
            AND: true,
          },
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if target is missing', async () => {
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          source: annotations[0].id,
          status: 'is-effect',
          type: {
            AND: true,
          },
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if status is missing', async () => {
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          source: annotations[0].id,
          target: annotations[1].id,
          type: {
            AND: true,
          },
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if type is missing', async () => {
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          source: annotations[0].id,
          target: annotations[1].id,
          status: 'is-effect',
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if either annotation is in another project', async () => {
      const email = 'kate@attackflow.com';
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
      const targetProject2 = projects[1];

      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const annotations2 = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject2.project,
        },
      });

      const res = await request(app)
        .post('/relationships/create')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          source: annotations[0].id,
          target: annotations2[0].id, // Annotation from another project
          status: 'is-effect',
          type: {
            AND: true,
          },
        });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/update', () => {
    it('should update relationship if at least one valid field is provided (source)', async () => {
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

      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const targetAnnotation = annotations[0];

      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const targetRelationship = relationships[0];

      const res = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          source: targetAnnotation.id,
        });

      expect(res.statusCode).toBe(200);

      const updatedRelationship = await dataSource
        .getRepository(Relationship)
        .find({
          where: {
            id: targetRelationship.id,
            source: targetAnnotation.id,
          },
        });

      expect(updatedRelationship.length).toBe(1);
    });
    it('should update relationship if at least one valid field is provided (target)', async () => {
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

      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: targetProject.project,
        },
      });
      const targetAnnotation = annotations[0];

      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const targetRelationship = relationships[0];

      const res = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          target: targetAnnotation.id,
        });

      expect(res.statusCode).toBe(200);

      const updatedRelationship = await dataSource
        .getRepository(Relationship)
        .find({
          where: {
            id: targetRelationship.id,
            target: targetAnnotation.id,
          },
        });

      expect(updatedRelationship.length).toBe(1);
    });
    it('should update relationship if at least one valid field is provided (status)', async () => {
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

      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const targetRelationship = relationships[0];

      const res = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          status: 'related-to',
        });

      expect(res.statusCode).toBe(200);

      const updatedRelationship = await dataSource
        .getRepository(Relationship)
        .find({
          where: {
            id: targetRelationship.id,
            status: 'related-to',
          },
        });

      expect(updatedRelationship.length).toBe(1);
    });
    it('should not update relationship if status is invalid', async () => {
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

      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const targetRelationship = relationships[0];

      const res = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          status: 'bad-status',
        });

      expect(res.statusCode).toBe(500);
    });
    it('should update relationship if at least one valid field is provided (type)', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementation((req, res, next) => {
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

      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const targetRelationship = relationships[0];

      const res = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          type: {
            OR: true,
          },
        });

      expect(res.statusCode).toBe(200);

      const res2 = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          type: {
            AND: true,
          },
        });

      expect(res2.statusCode).toBe(200);

      const res3 = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          type: {
            OR: false,
          },
        });

      expect(res3.statusCode).toBe(200);

      const res4 = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          type: {
            AND: false,
          },
        });

      expect(res4.statusCode).toBe(200);
    });
    it('should not update relationship if type is invalid', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementation((req, res, next) => {
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

      const relationships = await dataSource.getRepository(Relationship).find({
        where: {
          project_id: targetProject.project,
        },
      });
      const targetRelationship = relationships[0];

      const res = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          type: {
            NOR: true,
          },
        });

      expect(res.statusCode).toBe(500);

      const res2 = await request(app)
        .put('/relationships/update')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject.project,
          id: targetRelationship.id,
          type: {
            OR: true,
            AND: true,
          },
        });

      expect(res2.statusCode).toBe(500);
    });
  });
});

describe('/delete', () => {
  it('should delete relationship if valid relationship_id and project_id are provided', async () => {
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

    const relationships = await dataSource.getRepository(Relationship).find({
      where: {
        project_id: targetProject.project,
      },
    });
    const targetRelationship = relationships[0];

    const res = await request(app)
      .post('/relationships/delete')
      .set('Content-type', 'application/json')
      .send({
        projectID: targetProject.project,
        id: targetRelationship.id,
      });

    expect(res.statusCode).toBe(200);

    const deletedRelationship = await dataSource
      .getRepository(Relationship)
      .find({
        where: {
          id: targetRelationship.id,
          project_id: targetProject.project,
        },
      });

    expect(deletedRelationship.length).toBe(0);
  });
  it('should not delete relationship if invalid relationship_id is provided', async () => {
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
    const projects2 = await dataSource.getRepository(UserProject).find({
      where: {
        user: 'alice@attackflow.com',
      },
    });
    const targetProject2 = projects2[0];

    const relationships = await dataSource.getRepository(Relationship).find({
      where: {
        project_id: targetProject2.project,
      },
    });
    const targetRelationship = relationships[0];

    const res = await request(app)
      .post('/relationships/delete')
      .set('Content-type', 'application/json')
      .send({
        projectID: targetProject.project,
        id: targetRelationship.id,
      });

    expect(res.statusCode).toBe(500);
  });
  it('should not delete relationship if invalid project_id is provided', async () => {
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
    const projects2 = await dataSource.getRepository(UserProject).find({
      where: {
        user: 'alice@attackflow.com',
      },
    });
    const targetProject2 = projects2[0];

    const relationships = await dataSource.getRepository(Relationship).find({
      where: {
        project_id: targetProject.project,
      },
    });
    const targetRelationship = relationships[0];

    const res = await request(app)
      .post('/relationships/delete')
      .set('Content-type', 'application/json')
      .send({
        projectID: targetProject2.project,
        id: targetRelationship.id,
      });

    expect(res.statusCode).toBe(500);
  });
  it('should not delete relationship if user has no access to the project', async () => {
    const email = 'john@attackflow.com';
    verify.mockImplementationOnce((req, res, next) => {
      req.auth = {
        payload: {
          email: 'invaliduser@gmail.com',
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

    const relationships = await dataSource.getRepository(Relationship).find({
      where: {
        project_id: targetProject.project,
      },
    });
    const targetRelationship = relationships[0];

    const res = await request(app)
      .post('/relationships/delete')
      .set('Content-type', 'application/json')
      .send({
        projectID: targetProject.project,
        id: targetRelationship.id,
      });

    expect(res.statusCode).toBe(500);

    const deletedRelationship = await dataSource
      .getRepository(Relationship)
      .find({
        where: {
          id: targetRelationship.id,
          project_id: targetProject.project,
        },
      });

    expect(deletedRelationship.length).toBe(1);
  });
});
