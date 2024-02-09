const express = require('express');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const UserProject = require('../entity/UserProject');
const User = require('../entity/User');

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
    const userProjects = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
      },
    });

    // Get User Profiles
    const promises = [];
    userProjects.forEach((data) => {
      const promise = dataSource.getRepository(User).find({
        where: {
          email: data.user,
        },
      });
      promises.push(promise);
    });

    let users = await Promise.all(promises);
    users = users.map((user) => user[0]);
    if (users[0] != null) {
      return res.json(users);
    }
    return res.json([]);
  } catch (err) {
    return next(err);
  }
});

router.post('/add', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.projectID == null || data.email == null) {
    return next(new Error('missing data'));
  }

  const { projectID, email: inviteEmail } = data;

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

    const user = await dataSource.getRepository(User).find({
      where: {
        email: inviteEmail,
      },
    });
    if (user.length === 0) {
      return next(new Error('user does not exist'));
    }

    const invitedUserProject = await dataSource
      .getRepository(UserProject)
      .find({
        where: {
          project: projectID,
          user: inviteEmail,
        },
      });

    // Exit early if the user is already a collaborator
    if (invitedUserProject.length === 1) return res.json({});

    const newUserProject = dataSource.getRepository(UserProject).create({
      project: projectID,
      user: inviteEmail,
    });
    await dataSource.getRepository(UserProject).save(newUserProject);
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

router.post('/delete', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.projectID == null || data.email == null) {
    return next(new Error('missing data'));
  }

  const { projectID, email: collaborator } = data;

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

    const user = await dataSource.getRepository(User).find({
      where: {
        email: collaborator,
      },
    });
    if (user.length === 0) {
      return next(new Error('user does not exist'));
    }

    const deletedUserProject = await dataSource
      .getRepository(UserProject)
      .find({
        where: {
          project: projectID,
          user: collaborator,
        },
      });

    // Exit early if the user does not exist
    if (deletedUserProject.length === 0) return res.json({});

    await dataSource.getRepository(UserProject).delete({
      project: projectID,
      user: collaborator,
    });
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
