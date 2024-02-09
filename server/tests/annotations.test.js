const request = require('supertest');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const runAllSeeders = require('../seeders');
const UserProject = require('../entity/UserProject');
const Annotation = require('../entity/Annotation');
const { relations } = require('../utils/constants');
const Action = require('../entity/Action');
const Asset = require('../entity/Asset');
const Campaign = require('../entity/Campaign');
const Condition = require('../entity/Condition');
const Directory = require('../entity/Directory');
const File = require('../entity/File');
const Identity = require('../entity/Identity');
const Infrastructure = require('../entity/Infrastructure');
const IPv4 = require('../entity/IPv4');
const Malware = require('../entity/Malware');
const Note = require('../entity/Note');
const Process = require('../entity/Process');
const Software = require('../entity/Software');
const ThreatActor = require('../entity/ThreatActor');
const Tool = require('../entity/Tool');
const Url = require('../entity/Url');
const UserAccount = require('../entity/UserAccount');
const Vulnerability = require('../entity/Vulnerability');

const app = require('../app', { exports: true });

jest.mock('../middlewares/verify', () => ({
  verify: jest.fn(),
}));

const testHighlightPosition = {
  boundingRect: {
    height: 1200,
    pageNumber: 1,
    width: 200,
    x1: 100,
    x2: 100,
    y1: 100,
    y2: 100,
  },
  rects: [
    {
      height: 1200,
      pageNumber: 1,
      width: 200,
      x1: 100,
      x2: 100,
      y1: 100,
      y2: 100,
    },
  ],
  pageNumber: 1,
};
const testHighlightComment = {
  Text: 'Test Comment 1',
};
const testHighlightContent = {
  Text: 'Test Content 1',
};

describe('Annotations Routes', () => {
  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    await runAllSeeders(dataSource);
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('root', () => {
    it('should return list of annotations in a project', async () => {
      const email = 'john@attackflow.com';
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          project: projectID,
        },
        relations,
        order: {
          created_at: 'DESC',
        },
      });
      const res = await request(app).get(`/annotations?projectID=${projectID}`);
      expect(res.statusCode).toBe(200);
      expect(JSON.stringify(res.body)).toBe(JSON.stringify(annotations));
    });
    it('should return error if projectID provided does not exist', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'john@attackflow.com',
          },
        };
        next();
      });
      const res = await request(app).get(
        `/annotations?projectID=testingprojectID`,
      );
      expect(res.statusCode).toBe(500);
    });
    it('should return all annotations even if email provided does not match with projectID', async () => {
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'another_email@gmail.com',
          },
        };
        next();
      });
      const userProjects = await dataSource.getRepository(UserProject).find({
        where: {
          user: 'john@attackflow.com',
        },
      });
      const res = await request(app).get(
        `/annotations?projectID=${userProjects[0].project}`,
      );
      expect(res.statusCode).toBe(200);
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
      const res = await request(app).get(`/annotations`);
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
      const res = await request(app).get(`/annotations?projectID=`);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/get', () => {
    it('should get annotation if it was part of project that you have access', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
        relations,
      });
      const targetAnnotation = annotations[0];
      const targetProject = targetAnnotation.project;
      const res = await request(app).get(
        `/annotations/get?projectID=${targetProject}&annotationID=${targetAnnotation.id}`,
      );
      expect(res.statusCode).toBe(200);
      expect(JSON.stringify(targetAnnotation)).toBe(JSON.stringify(res.body));
    });
    it('should return error if annotation does not exist', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const targetProject = targetAnnotation.project;
      const res = await request(app).get(
        `/annotations/get?projectID=${targetProject}&annotationID=testing123`,
      );
      expect(res.statusCode).toBe(500);
    });
    it('should not get annotation if no access to project', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'unknownuser@gmail.com',
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const targetProject = targetAnnotation.project;
      const res = await request(app).get(
        `/annotations/get?projectID=${targetProject}&annotationID=${targetAnnotation.id}`,
      );
      expect(res.statusCode).toBe(500);
    });
    it('should return error if no projectID', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const res = await request(app).get(
        `/annotations/get?annotationID=${targetAnnotation.id}`,
      );
      expect(res.statusCode).toBe(500);
    });
    it('should return error if projectID is empty string', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const res = await request(app).get(
        `/annotations/get?projectID=&annotationID=${targetAnnotation.id}`,
      );
      expect(res.statusCode).toBe(500);
    });
    it('should return error if no annotationID', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const targetProject = targetAnnotation.project;
      const res = await request(app).get(
        `/annotations/get?projectID=${targetProject}`,
      );
      expect(res.statusCode).toBe(500);
    });
    it('should return error if annotationID is empty string', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const targetProject = targetAnnotation.project;
      const res = await request(app).get(
        `/annotations/get?projectID=${targetProject}&annotationID=`,
      );
      expect(res.statusCode).toBe(500);
    });
  });

  describe('/create', () => {
    it('should not create annotation if no access to project', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'unknownuser@gmail.com',
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
        .post('/annotations/create')
        .set('Content-type', 'application/json')
        .send({
          projectID,
          highlightContent: testHighlightContent,
          highlightComment: testHighlightComment,
          highlightPosition: testHighlightPosition,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not create annotation if projectID is missing', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const res = await request(app)
        .post('/annotations/create')
        .set('Content-type', 'application/json')
        .send({
          highlightContent: testHighlightContent,
          highlightComment: testHighlightComment,
          highlightPosition: testHighlightPosition,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not create annotation if highlight content is missing', async () => {
      const email = 'john@attackflow.com';
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
        .post('/annotations/create')
        .set('Content-type', 'application/json')
        .send({
          projectID,
          highlightComment: testHighlightComment,
          highlightPosition: testHighlightPosition,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not create annotation if highlight comment is missing', async () => {
      const email = 'john@attackflow.com';
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
        .post('/annotations/create')
        .set('Content-type', 'application/json')
        .send({
          projectID,
          highlightContent: testHighlightContent,
          highlightPosition: testHighlightPosition,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not create annotation if highlight position is missing', async () => {
      const email = 'john@attackflow.com';
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
        .post('/annotations/create')
        .set('Content-type', 'application/json')
        .send({
          projectID,
          highlightContent: testHighlightContent,
          highlightComment: testHighlightComment,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not create annotation if no child annotation data', async () => {
      const email = 'john@attackflow.com';
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
        .post('/annotations/create')
        .set('Content-type', 'application/json')
        .send({
          projectID,
          highlightContent: testHighlightContent,
          highlightComment: testHighlightComment,
          highlightPosition: testHighlightPosition,
        });
      expect(res.statusCode).toBe(500);
    });

    describe('annotation types', () => {
      beforeEach(() => {
        const email = 'john@attackflow.com';
        verify.mockImplementationOnce((req, res, next) => {
          req.auth = {
            payload: {
              email,
            },
          };
          next();
        });
      });

      describe('/action', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              action: {
                tag: 'test tag',
                name: 'test name',
                description: 'test description',
                confidence: 80,
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Action).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if tag is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              action: {
                name: 'test name',
                description: 'test description',
                confidence: 80,
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              action: {
                tag: 'test tag',
                description: 'test description',
                confidence: 80,
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              action: {
                tag: 'test tag',
                name: 'test name',
                confidence: 80,
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if confidence is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              action: {
                tag: 'test tag',
                name: 'test name',
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/asset', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              asset: {
                name: 'test name',
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Asset).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              asset: {
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              asset: {
                name: 'test name',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/campaign', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              campaign: {
                name: 'test name',
                description: 'test description',
                firstSeen: '2021-12-12T11:11:11+00:00Z',
                objective: 'test objective',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Campaign).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              campaign: {
                description: 'test description',
                firstSeen: '2021-12-12T11:11:11+00:00Z',
                objective: 'test objective',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              campaign: {
                name: 'test name',
                firstSeen: '2021-12-12T11:11:11+00:00Z',
                objective: 'test objective',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if firstSeen is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              campaign: {
                name: 'test name',
                description: 'test description',
                objective: 'test objective',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if objective is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              campaign: {
                name: 'test name',
                description: 'test description',
                firstSeen: '2021-12-12T11:11:11+00:00Z',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/condition', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              condition: {
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Condition).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              condition: {},
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/directory', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              directory: {
                path: 'test path',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Directory).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if path is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              directory: {},
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/file', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              file: {
                name: 'test name',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(File).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              file: {},
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/identity', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              identity: {
                authorName: 'test author name',
                authorEmail: 'testemail@gmail.com',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Identity).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if author name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              identity: {
                authorEmail: 'testemail@gmail.com',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if author email is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              identity: {
                authorName: 'test author name',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/infrastructure', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              infrastructure: {
                name: 'test name',
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Infrastructure).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              infrastructure: {
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              infrastructure: {
                name: 'test name',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/ipv4', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              ipv4: {
                value: 'test value',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(IPv4).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if value is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              ipv4: {},
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/malware', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              malware: {
                name: 'test name',
                description: 'test description',
                isFamily: true,
                type: {
                  name1: 'malware type 1',
                },
                capabilities: {
                  name1: 'malware capabilities 1',
                  name2: 'malware capabilities 2',
                },
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Malware).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              malware: {
                description: 'test description',
                isFamily: true,
                type: {
                  name1: 'malware type 1',
                },
                capabilities: {
                  name1: 'malware capabilities 1',
                  name2: 'malware capabilities 2',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              malware: {
                name: 'test name',
                isFamily: true,
                type: {
                  name1: 'malware type 1',
                },
                capabilities: {
                  name1: 'malware capabilities 1',
                  name2: 'malware capabilities 2',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if is_family is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              malware: {
                name: 'test name',
                description: 'test description',
                type: {
                  name1: 'malware type 1',
                },
                capabilities: {
                  name1: 'malware capabilities 1',
                  name2: 'malware capabilities 2',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if type is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              malware: {
                name: 'test name',
                description: 'test description',
                isFamily: true,
                capabilities: {
                  name1: 'malware capabilities 1',
                  name2: 'malware capabilities 2',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if capabilities is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              malware: {
                name: 'test name',
                description: 'test description',
                isFamily: true,
                type: {
                  name1: 'malware type 1',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/note', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              note: {
                content: 'test content',
                authors: {
                  author1: 'test author 1',
                  author2: 'test author 2',
                },
                objectRefs: {
                  object1: 'test annotation id',
                },
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Note).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if content is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              note: {
                authors: {
                  author1: 'test author 1',
                  author2: 'test author 2',
                },
                objectRefs: {
                  object1: 'test annotation id',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if authors is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              note: {
                content: 'test content',
                objectRefs: {
                  object1: 'test annotation id',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if object_refs is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              note: {
                content: 'test content',
                authors: {
                  author1: 'test author 1',
                  author2: 'test author 2',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/process', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              process: {
                commandLine: 'test command line value',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Process).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if command line is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              process: {},
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/software', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              software: {
                path: 'test path',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Software).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if command line is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              software: {},
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/threat_actor', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(ThreatActor).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if path is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if types is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if aliases is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if first seen is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if roles is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if goals is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if sophistication is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                resourceLevel: 'test resource level',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if resource level is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                primaryMotivation: 'test motivation',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if primary motivation is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              threatActor: {
                path: 'test path',
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
                aliases: {
                  alias1: 'test alias 1',
                },
                firstSeen: '2022-11-11T12:12:12+00:00Z',
                roles: {
                  role1: 'test role 1',
                  role2: 'test role 2',
                },
                goals: {
                  goal1: 'test goal 1',
                },
                sophistication: 'test sophistication',
                resourceLevel: 'test resource level',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/tool', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              tool: {
                name: 'test name',
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Tool).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              tool: {
                description: 'test description',
                types: {
                  type1: 'test type 1',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              tool: {
                name: 'test name',
                types: {
                  type1: 'test type 1',
                },
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if types is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              tool: {
                name: 'test name',
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/url', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              url: {
                value: 'test value',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Url).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if value is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              url: {},
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/user_account', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              userAccount: {
                email: 'test email',
                displayName: 'test display name',
                isPrivileged: false,
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(UserAccount).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if email is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              userAccount: {
                displayName: 'test display name',
                isPrivileged: false,
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if display name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              userAccount: {
                email: 'test email',
                isPrivileged: false,
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if privilege is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              userAccount: {
                email: 'test email',
                displayName: 'test display name',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });

      describe('/vulnerability', () => {
        it('should create if all data is present', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              vulnerability: {
                name: 'test name',
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(200);
          const { id, annotation_id: annotationID } = res.body;
          const query = await dataSource.getRepository(Vulnerability).find({
            where: {
              id,
            },
          });
          const annotation = await dataSource.getRepository(Annotation).find({
            where: {
              id: annotationID,
            },
          });
          expect(query.length).toBe(1);
          expect(annotation.length).toBe(1);
        });
        it('should not create if name is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              vulnerability: {
                description: 'test description',
              },
            });
          expect(res.statusCode).toBe(500);
        });
        it('should not create if description is missing', async () => {
          const email = 'john@attackflow.com';
          const userProjects = await dataSource
            .getRepository(UserProject)
            .find({
              where: {
                user: email,
              },
            });
          const projectID = userProjects[0].project;
          const res = await request(app)
            .post('/annotations/create')
            .set('Content-type', 'application/json')
            .send({
              projectID,
              highlightContent: testHighlightContent,
              highlightComment: testHighlightComment,
              highlightPosition: testHighlightPosition,
              vulnerability: {
                name: 'test name',
              },
            });
          expect(res.statusCode).toBe(500);
        });
      });
    });
  });

  describe('/delete', () => {
    it('should delete annotation if it was created by user', async () => {
      const action = await dataSource.getRepository(Action).find({
        relations: {
          annotation: true,
        },
      });
      const targetAction = action[0];
      const targetAnnotation = targetAction.annotation;
      const email = targetAnnotation.user;
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const targetProject = targetAnnotation.project;
      const res = await request(app)
        .post('/annotations/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject,
          id: targetAnnotation.id,
        });
      expect(res.statusCode).toBe(200);
      const annotationQuery = await dataSource.getRepository(Annotation).find({
        where: {
          id: targetAnnotation.id,
        },
      });
      expect(annotationQuery.length).toBe(0);
      const actionQuery = await dataSource.getRepository(Action).find({
        where: {
          id: targetAction.id,
        },
      });
      expect(actionQuery.length).toBe(0);
    });
    it('should not delete annotation if it was not created by user', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const targetProject = targetAnnotation.project;
      const newAnnotationData = await dataSource
        .getRepository(Annotation)
        .create({
          is_currently_existing: true,
          highlightComment: { Text: 'Comment 1' },
          highlightContent: { Text: 'Content 1' },
          highlightPosition: {
            boundingRect: {
              height: 1200,
              pageNumber: 1,
              width: 200,
              x1: 100,
              x2: 100,
              y1: 100,
              y2: 100,
            },
            rects: [
              {
                height: 1200,
                pageNumber: 1,
                width: 200,
                x1: 100,
                x2: 100,
                y1: 100,
                y2: 100,
              },
            ],
            pageNumber: 1,
          },
          project: targetProject,
          user: 'kate@attackflow.com',
        });
      const newAnnotation = await dataSource
        .getRepository(Annotation)
        .save(newAnnotationData);
      const res = await request(app)
        .post('/annotations/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject,
          id: newAnnotation.id,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should not delete annotation if no access to project', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email: 'unknownuser@gmail.com',
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const targetProject = targetAnnotation.project;
      const res = await request(app)
        .post('/annotations/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject,
          id: targetAnnotation.id,
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
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const res = await request(app)
        .post('/annotations/delete')
        .set('Content-type', 'application/json')
        .send({
          id: targetAnnotation.id,
        });
      expect(res.statusCode).toBe(500);
    });
    it('should return error if annotation ID is missing', async () => {
      const email = 'john@attackflow.com';
      verify.mockImplementationOnce((req, res, next) => {
        req.auth = {
          payload: {
            email,
          },
        };
        next();
      });
      const annotations = await dataSource.getRepository(Annotation).find({
        where: {
          user: email,
        },
      });
      const targetAnnotation = annotations[0];
      const targetProject = targetAnnotation.project;
      const res = await request(app)
        .post('/annotations/delete')
        .set('Content-type', 'application/json')
        .send({
          projectID: targetProject,
        });
      expect(res.statusCode).toBe(500);
    });
  });
});
