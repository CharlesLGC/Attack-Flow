const express = require('express');
const dataSource = require('../utils/database');
const Project = require('../entity/Project');
const UserProject = require('../entity/UserProject');
const { verify } = require('../middlewares/verify');
const Annotation = require('../entity/Annotation');

const router = express.Router();

router.get('/list', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  try {
    const userProjects = await dataSource.getRepository(UserProject).find({
      where: {
        user: email,
      },
    });
    const promises = [];
    userProjects.forEach((userProject) => {
      const promise = dataSource.getRepository(Project).find({
        where: {
          id: userProject.project,
        },
      });
      promises.push(promise);
    });
    let projects = await Promise.all(promises);
    projects = projects.map((project) => project[0]);
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/approved', async (_, res, next) => {
  try {
    const attackflows = await dataSource.getRepository(Project).find({
      where: {
        is_approved: true,
      },
    });
    res.json(attackflows);
  } catch (err) {
    next(err);
  }
});

router.post('/create', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.description == null || data.title == null) {
    return next(new Error('missing data'));
  }

  const { title, description } = data;

  try {
    // TODO: Use Transaction
    const project = await dataSource.getRepository(Project).create({
      description,
      title,
      is_approved: false,
      is_hidden: true,
    });
    const newProject = await dataSource.getRepository(Project).save(project);
    const userProject = await dataSource.getRepository(UserProject).create({
      project: newProject.id,
      user: email,
    });
    await dataSource.getRepository(UserProject).save(userProject);
  } catch (err) {
    return next(err);
  }

  return res.json({});
});

router.get('/get', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const { projectID } = req.query;
  if (
    typeof projectID === 'undefined' ||
    projectID === null ||
    projectID === ''
  ) {
    return next(new Error('missing data'));
  }

  try {
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }
    const project = await dataSource.getRepository(Project).find({
      where: {
        id: projectID,
      },
    });
    return res.json(project);
  } catch (err) {
    return next(err);
  }
});

router.post('/delete', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.projectID == null) {
    return next(new Error('missing data'));
  }

  const { projectID } = data;

  try {
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }
    // Use Transaction
    await dataSource.getRepository(UserProject).delete({
      project: projectID,
    });
    await dataSource.getRepository(Project).delete({
      id: projectID,
    });
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

router.put('/update', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.projectID == null) {
    return next(new Error('missing data'));
  }

  const { projectID } = data;

  // Remove id from data object
  delete data.projectID;

  try {
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }
    await dataSource.getRepository(Project).update(
      {
        id: projectID,
      },
      data,
    );
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

router.put('/hide', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.projectID == null || data.hide == null) {
    return next(new Error('missing data'));
  }

  const { projectID, hide } = data;

  try {
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }
    await dataSource.getRepository(Project).update(
      {
        id: projectID,
      },
      {
        is_hidden: hide,
      },
    );
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

router.post('/upload-file/:id', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Check if file exists
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    req.files.file == null
  ) {
    return next(new Error('No files were uploaded'));
  }

  // Validation
  const { id: projectID } = req.params;
  if (
    typeof projectID === 'undefined' ||
    projectID === null ||
    projectID === ''
  ) {
    return next(new Error('missing data'));
  }

  const { file } = req.files;
  const uploadPath = `uploads/${file.name}`;

  try {
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }

    await file.mv(uploadPath);

    // Create entry into database
    await dataSource.getRepository(Project).update(
      {
        id: projectID,
      },
      {
        url: uploadPath,
      },
    );

    // Remove all annotations
    await dataSource.getRepository(Annotation).delete({
      project: projectID,
    });
  } catch (err) {
    next(err);
  }

  return res.send({});
});

module.exports = router;
