const express = require('express');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
const Relationship = require('../entity/Relationship');
const Annotation = require('../entity/Annotation');
const UserProject = require('../entity/UserProject');

const router = express.Router();

router.get('', verify, async (req, res, next) => {
  // Validation
  const { annotationID } = req.query;
  if (
    typeof annotationID === 'undefined' ||
    annotationID === null ||
    annotationID === ''
  ) {
    return next(new Error('missing data'));
  }

  try {
    const relationships = await dataSource.getRepository(Relationship).find({
      where: [
        {
          source: annotationID,
        },
        {
          target: annotationID,
        },
      ],
    });
    return res.json(relationships);
  } catch (err) {
    return next(err);
  }
});

router.get('/get-children', verify, async (req, res, next) => {
  // Validation
  const { annotationID } = req.query;
  if (
    typeof annotationID === 'undefined' ||
    annotationID === null ||
    annotationID === ''
  ) {
    return next(new Error('missing data'));
  }

  try {
    const relationships = await dataSource.getRepository(Relationship).find({
      where: [
        {
          source: annotationID,
        },
      ],
    });
    return res.json(relationships);
  } catch (err) {
    return next(err);
  }
});

router.get('/get-by-projectID', async (req, res, next) => {
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
    const relationships = await dataSource.getRepository(Relationship).find({
      where: [
        {
          project_id: projectID,
        },
      ],
    });
    return res.json(relationships);
  } catch (err) {
    return next(err);
  }
});

router.post('/get-unrelated-annotations', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  const { projectID } = req.body;

  // Validate the projectID
  if (!projectID) {
    return next(new Error('missing projectID'));
  }

  try {
    // Check to see if the user has access to the project
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });

    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }

    // Get all annotations for the project
    const allAnnotations = await dataSource.getRepository(Annotation).find({
      where: {
        project: projectID,
      },
    });

    // Get all relationships for the project
    const allRelationships = await dataSource.getRepository(Relationship).find({
      where: {
        project_id: projectID,
      },
    });

    // Create sets of all source and target annotation IDs
    const sourceSet = new Set(allRelationships.map((rel) => rel.source));
    const targetSet = new Set(allRelationships.map((rel) => rel.target));
    // Find annotations that are not in sourceSet or targetSet
    const unrelatedAnnotations = allAnnotations
      .filter((annotation) => {
        return !sourceSet.has(annotation.id) && !targetSet.has(annotation.id);
      })
      .map((annotation) => annotation.id)
      .filter(Boolean);

    return res.json(unrelatedAnnotations);
  } catch (err) {
    return next(err);
  }
});

router.post('/create', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (
    data.projectID == null ||
    data.source == null ||
    data.target == null ||
    data.status == null ||
    data.type == null
  ) {
    return next(new Error('missing data'));
  }

  const { projectID, source, target, status, type } = data;

  try {
    // Check to see if the user has access to the project
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }

    // Check if both annotations belong to the same project
    const sourceAnnotation = await dataSource.getRepository(Annotation).find({
      where: {
        id: source,
        project: projectID,
      },
    });
    const targetAnnotation = await dataSource.getRepository(Annotation).find({
      where: {
        id: target,
        project: projectID,
      },
    });
    if (sourceAnnotation.length === 0 || targetAnnotation.length === 0) {
      return next(new Error('annotations do not belong to the same project'));
    }

    const relationshipQuery = await dataSource
      .getRepository(Relationship)
      .find({
        where: {
          source,
          target,
        },
      });

    // Exit early if the relationship already exists
    if (relationshipQuery.length > 0) {
      return res.json({});
    }

    const relationship = dataSource.getRepository(Relationship).create({
      project_id: projectID,
      source,
      target,
      status,
      type,
    });
    await dataSource.getRepository(Relationship).save(relationship);
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
  if (data.id == null || data.projectID == null)
    return next(new Error('missing relationship or project id'));

  // At least one field needs to have value
  const flag =
    data.source != null ||
    data.target != null ||
    data.status != null ||
    data.type != null;

  if (!flag)
    return next(
      new Error(
        'please provide a property to update (source, target, status, type)',
      ),
    );

  try {
    // Find relationship
    const relationshipQuery = await dataSource
      .getRepository(Relationship)
      .find({
        where: {
          id: data.id,
        },
      });

    // Return error if relationship not found
    if (relationshipQuery.length === 0) {
      return next(new Error('relationship not found'));
    }

    const targetRelationship = relationshipQuery[0];

    const { projectID, source, target, status, type } = data;

    // Check to see if the user has access to the project
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }
    if (source != null) {
      const sourceAnnotation = await dataSource.getRepository(Annotation).find({
        where: {
          id: source,
          project: projectID,
        },
      });

      if (sourceAnnotation.length === 0) {
        return next(
          new Error('source annotation do not belong to the same project'),
        );
      }

      targetRelationship.source = source;
    }
    if (target != null) {
      const targetAnnotation = await dataSource.getRepository(Annotation).find({
        where: {
          id: target,
          project: projectID,
        },
      });

      if (targetAnnotation.length === 0) {
        return next(
          new Error('target annotation do not belong to the same project'),
        );
      }
      targetRelationship.target = target;
    }
    if (status != null) {
      if (status !== 'effect' && status !== 'related-to')
        return next(new Error('invalid status'));

      targetRelationship.status = status;
    }
    if (type != null) {
      if (type.AND && type.OR) return next(new Error('invalid type'));
      if (type.AND !== undefined) {
        if (type.AND !== true && type.AND !== false)
          return next(new Error('invalid type'));
      } else if (type.OR !== undefined) {
        if (type.OR !== true && type.OR !== false)
          return next(new Error('invalid type'));
      } else {
        return next(new Error('invalid type'));
      }

      targetRelationship.type = type;
    }
    await dataSource.getRepository(Relationship).save(targetRelationship);
  } catch (err) {
    return next(err);
  }
  return res.json({});
});

router.post('/delete', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.id == null || data.projectID == null)
    return next(new Error('missing relationship or project id'));

  try {
    // Find relationship
    const relationshipQuery = await dataSource
      .getRepository(Relationship)
      .find({
        where: {
          id: data.id,
          project_id: data.projectID,
        },
      });

    // Return error if relationship not found
    if (relationshipQuery.length === 0) {
      return next(new Error('relationship not found'));
    }

    // Check to see if the user has access to the project
    const userProject = await dataSource.getRepository(UserProject).find({
      where: {
        project: data.projectID,
        user: email,
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }

    await dataSource.getRepository(Relationship).delete({
      id: data.id,
    });
  } catch (err) {
    return next(err);
  }
  return res.json({});
});

module.exports = router;
