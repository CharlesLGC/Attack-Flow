const express = require('express');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const UserProject = require('../entity/UserProject');
const Version = require('../entity/Version');
const Annotation = require('../entity/Annotation');
const AnnotationVersion = require('../entity/AnnotationVersion');

const router = express.Router();

router.get('', verify, async (req, res, next) => {
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
    const versions = await dataSource.getRepository(Version).find({
      where: {
        project_id: projectID,
      },
    });
    return res.json(versions);
  } catch (err) {
    return next(err);
  }
});

router.post('/create', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.projectID == null || data.title == null) {
    return next(new Error('missing data'));
  }

  const { projectID, title } = data;

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
    const version = dataSource.getRepository(Version).create({
      title,
      project_id: projectID,
    });
    const newVersion = await dataSource.getRepository(Version).save(version);
    const annotations = await dataSource.getRepository(Annotation).find({
      where: {
        project: projectID,
        is_currently_existing: true,
      },
    });

    // Loop over each annotation and add it to the AnnotationVersion table
    const promises = [];
    annotations.forEach((annotation) => {
      const annotationVersion = dataSource
        .getRepository(AnnotationVersion)
        .create({
          version: newVersion.id,
          annotation: annotation.id,
        });
      const promise = dataSource
        .getRepository(AnnotationVersion)
        .save(annotationVersion);
      promises.push(promise);
    });
    await Promise.all(promises);
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
