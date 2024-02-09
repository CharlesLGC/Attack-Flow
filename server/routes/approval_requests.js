const express = require('express');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const ApprovalRequest = require('../entity/ApprovalRequest');
const User = require('../entity/User');
const Project = require('../entity/Project');
const UserProject = require('../entity/UserProject');

const router = express.Router();

router.get('/list', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  try {
    const user = await dataSource.getRepository(User).find({
      where: {
        email,
        is_admin: true,
      },
    });
    if (user.length === 0) {
      return next(new Error('user does not exist or user is not an admin'));
    }
    const requests = await dataSource.getRepository(ApprovalRequest).find({
      where: { status: false },
      relations: {
        project: true,
      },
    });
    return res.json(requests);
  } catch (err) {
    return next(err);
  }
});

router.post('/update', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.requestID == null || data.approve == null) {
    return next(new Error('incomplete update approval request data'));
  }

  const { requestID, approve } = data;

  try {
    const user = await dataSource.getRepository(User).find({
      where: {
        email,
        is_admin: true,
      },
    });
    if (user.length === 0) {
      return next(new Error('user does not exist or user is not an admin'));
    }
    const request = await dataSource.getRepository(ApprovalRequest).find({
      where: { id: requestID, status: false },
    });
    if (request.length === 0) {
      return next(new Error('request does not exist'));
    }
    await dataSource.getRepository(ApprovalRequest).update(
      {
        id: requestID,
      },
      {
        status: true,
      },
    );
    if (approve === true) {
      await dataSource.getRepository(Project).update(
        {
          id: request[0].project,
        },
        {
          is_approved: true,
        },
      );
    }
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

router.post('/create', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.description == null || data.projectID == null) {
    return next(new Error('incomplete approval request data'));
  }

  const { description, projectID } = data;

  try {
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('user does not exist or user is not an admin'));
    }

    const request = await dataSource.getRepository(ApprovalRequest).create({
      description,
      status: false,
      user: email,
      project: projectID,
    });
    const newRequest = await dataSource
      .getRepository(ApprovalRequest)
      .save(request);
    return res.json(newRequest);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
