const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const fs = require('fs');
const dataSource = require('./utils/database');
const runAllSeeders = require('./seeders');
const TestUser = require('./entity/TestUser');
const Project = require('./entity/Project');
const User = require('./entity/User');
const UserProject = require('./entity/UserProject');
const Vulnerability = require('./entity/Vulnerability');
const Annotation = require('./entity/Annotation');

const attackflowsRouter = require('./routes/attackflows');
const annotationsRouter = require('./routes/annotations');
const approvalRequestsRouter = require('./routes/approval_requests');
const collaboratorsRouter = require('./routes/collaborators');
const versionsRouter = require('./routes/versions');
const relationshipsRouter = require('./routes/relationships');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}
app.use('/uploads', express.static(uploadsPath));
app.use('/public', express.static(path.join(__dirname, 'public')));

const { verify } = require('./middlewares/verify');

app.get('/', (_, res) => {
  res.json({ data: 'Hello World' });
});

app.get('/verify', verify, async (req, res, next) => {
  try {
    const { payload } = req.auth;
    if (payload.loginCounter === 1) {
      const userData = await dataSource.getRepository(User).create({
        email: payload.email,
        name: payload.name,
        is_admin: false,
      });

      await dataSource.getRepository(User).save(userData);
    }
    res.json({ data: 'Successful' });
  } catch (err) {
    next(err);
  }
});

app.get('/test-annotation', async (_, res) => {
  const projectData = await dataSource.getRepository(Project).create({
    title: 'test project title',
    description: 'test description',
    is_approved: false,
    is_hidden: false,
  });
  const newProject = await dataSource.getRepository(Project).save(projectData);

  const userData = await dataSource.getRepository(User).create({
    email: 'test@gmail.com',
    name: 'test user name',
    is_admin: false,
  });
  const newUser = await dataSource.getRepository(User).save(userData);

  const annotationData = await dataSource.getRepository(Annotation).create({
    project: newProject.id,
    user: newUser.email,
    content: 'test',
    is_currently_existing: true,
  });
  const newAnnotation = await dataSource
    .getRepository(Annotation)
    .save(annotationData);

  const vulnerabilityData = await dataSource
    .getRepository(Vulnerability)
    .create({
      name: 'test project title',
      description: 'test description',
      annotation_id: newAnnotation.id,
    });
  const newVulnerability = await dataSource
    .getRepository(Vulnerability)
    .save(vulnerabilityData);

  res.json({
    project: newProject,
    user: newUser,
    vulnerability: newVulnerability,
    annotation: newAnnotation,
  });
});

app.get('/test-composite', async (_, res) => {
  const projectData = await dataSource.getRepository(Project).create({
    title: 'test project title',
    description: 'test description',
    is_approved: false,
    is_hidden: false,
  });
  const newProject = await dataSource.getRepository(Project).save(projectData);

  const userData = await dataSource.getRepository(User).create({
    email: 'test@gmail.com',
    name: 'test user name',
    is_admin: false,
  });
  const newUser = await dataSource.getRepository(User).save(userData);

  const relationData = await dataSource.getRepository(UserProject).create({
    user: newUser.email,
    project: newProject.id,
  });
  const newRelation = await dataSource
    .getRepository(UserProject)
    .save(relationData);

  res.json({
    project: newProject,
    user: newUser,
    relation: newRelation,
  });
});

app.get('/test-add', async (_, res) => {
  const data = await dataSource.getRepository(TestUser).create({
    name: 'jason',
  });
  const newTestUser = await dataSource.getRepository(TestUser).save(data);
  res.send(newTestUser);
});

app.get('/test-list', async (_, res) => {
  const users = await dataSource.getRepository(TestUser).find();
  res.send(users);
});

app.use('/attackflows', attackflowsRouter);
app.use('/annotations', annotationsRouter);
app.use('/approval-requests', approvalRequestsRouter);
app.use('/collaborators', collaboratorsRouter);
app.use('/relationships', relationshipsRouter);
app.use('/versions', versionsRouter);

// Catch 404 routes
app.use((_, res) => {
  res.status(404).json({ data: '404 not found' });
});

// Error Handler
app.use((err, req, res) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Internal Server Error';
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
});

(async () => {
  try {
    await dataSource.initialize();
    if (process.env.NODE_ENV !== 'test') {
      await runAllSeeders(dataSource);
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.info(
          `Server running on port ${port}, http://localhost:${port}`,
        );
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
})();

module.exports = app;
