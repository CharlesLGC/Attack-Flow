const express = require('express');
const dataSource = require('../utils/database');
const { verify } = require('../middlewares/verify');
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

const router = express.Router();

router.get('', async (req, res, next) => {
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
      },
    });
    if (userProject.length === 0) {
      return next(new Error('project does not exist'));
    }
    const annotations = await dataSource.getRepository(Annotation).find({
      where: {
        project: projectID,
      },
      order: {
        created_at: 'DESC',
      },
      relations,
    });
    return res.json(annotations);
  } catch (err) {
    return next(err);
  }
});

router.get('/get', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const { projectID, annotationID } = req.query;
  if (
    typeof projectID === 'undefined' ||
    projectID === null ||
    projectID === '' ||
    typeof annotationID === 'undefined' ||
    annotationID === null ||
    annotationID === ''
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

    const annotation = await dataSource.getRepository(Annotation).find({
      where: {
        id: annotationID,
      },
      relations,
    });
    if (annotation.length === 0) {
      return next(new Error('annotation does not exist'));
    }
    return res.json(annotation[0]);
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
    data.highlightContent == null ||
    data.highlightComment == null ||
    data.highlightPosition == null
  ) {
    return next(new Error('incomplete annotation data'));
  }

  const {
    projectID,
    highlightContent,
    highlightComment,
    highlightPosition,
    action,
    asset,
    campaign,
    condition,
    directory,
    file,
    identity,
    infrastructure,
    ipv4,
    malware,
    note,
    process,
    software,
    threatActor,
    tool,
    url,
    userAccount,
    vulnerability,
  } = data;

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

    const annotation = await dataSource.getRepository(Annotation).create({
      project: projectID,
      user: email,
      highlight_content: highlightContent,
      highlight_comment: highlightComment,
      highlight_position: highlightPosition,
    });
    const newAnnotation = await dataSource
      .getRepository(Annotation)
      .save(annotation);

    if (action != null) {
      const { tag, name, description, confidence } = action;
      if (
        tag == null ||
        name == null ||
        description == null ||
        confidence == null
      ) {
        return next(new Error('incomplete action data'));
      }

      const actionData = await dataSource.getRepository(Action).create({
        tag,
        name,
        description,
        confidence,
        annotation_id: newAnnotation.id,
      });
      const newAction = await dataSource.getRepository(Action).save(actionData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          action: newAction.id,
        },
      );
      return res.json(newAction);
    }
    if (asset != null) {
      const { name, description } = asset;
      if (name == null || description == null) {
        return next(new Error('incomplete asset data'));
      }

      const assetData = await dataSource.getRepository(Asset).create({
        name,
        description,
        annotation_id: newAnnotation.id,
      });
      const newAsset = await dataSource.getRepository(Asset).save(assetData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          asset: newAsset.id,
        },
      );
      return res.json(newAsset);
    }
    if (campaign != null) {
      const { name, description, firstSeen, objective } = campaign;
      if (
        name == null ||
        description == null ||
        firstSeen == null ||
        objective == null
      ) {
        return next(new Error('incomplete campaign data'));
      }

      const campaignData = await dataSource.getRepository(Campaign).create({
        name,
        description,
        first_seen: firstSeen,
        objective,
        annotation_id: newAnnotation.id,
      });
      const newCampaign = await dataSource
        .getRepository(Campaign)
        .save(campaignData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          campaign: newCampaign.id,
        },
      );
      return res.json(newCampaign);
    }
    if (condition != null) {
      const { description } = condition;
      if (description == null) {
        return next(new Error('incomplete condition data'));
      }

      const conditionData = await dataSource.getRepository(Condition).create({
        description,
        annotation_id: newAnnotation.id,
      });
      const newCondition = await dataSource
        .getRepository(Condition)
        .save(conditionData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          condition: newCondition.id,
        },
      );
      return res.json(newCondition);
    }
    if (directory != null) {
      const { path } = directory;
      if (path == null) {
        return next(new Error('incomplete directory data'));
      }

      const directoryData = await dataSource.getRepository(Directory).create({
        path,
        annotation_id: newAnnotation.id,
      });
      const newDirectory = await dataSource
        .getRepository(Directory)
        .save(directoryData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          directory: newDirectory.id,
        },
      );
      return res.json(newDirectory);
    }
    if (file != null) {
      const { name } = file;
      if (name == null) {
        return next(new Error('incomplete file data'));
      }

      const fileData = await dataSource.getRepository(File).create({
        name,
        annotation_id: newAnnotation.id,
      });
      const newFile = await dataSource.getRepository(File).save(fileData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          file: newFile.id,
        },
      );
      return res.json(newFile);
    }
    if (identity != null) {
      const { authorName, authorEmail } = identity;
      if (authorName == null || authorEmail == null) {
        return next(new Error('incomplete identity data'));
      }

      const identityData = await dataSource.getRepository(Identity).create({
        author_name: authorName,
        author_email: authorEmail,
        annotation_id: newAnnotation.id,
      });
      const newIdentity = await dataSource
        .getRepository(Identity)
        .save(identityData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          identity: newIdentity.id,
        },
      );
      return res.json(newIdentity);
    }
    if (infrastructure != null) {
      const { name, description } = infrastructure;
      if (name == null || description == null) {
        return next(new Error('incomplete infrastructure data'));
      }

      const infrastructureData = await dataSource
        .getRepository(Infrastructure)
        .create({
          name,
          description,
          annotation_id: newAnnotation.id,
        });
      const newInfrastructure = await dataSource
        .getRepository(Infrastructure)
        .save(infrastructureData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          infrastructure: newInfrastructure.id,
        },
      );
      return res.json(newInfrastructure);
    }
    if (ipv4 != null) {
      const { value } = ipv4;
      if (value == null) {
        return next(new Error('incomplete ipv4 data'));
      }

      const ipv4Data = await dataSource.getRepository(IPv4).create({
        value,
        annotation_id: newAnnotation.id,
      });
      const newIpv4 = await dataSource.getRepository(IPv4).save(ipv4Data);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          ipv4: newIpv4.id,
        },
      );
      return res.json(newIpv4);
    }
    if (malware != null) {
      const { name, description, isFamily, type, capabilities } = malware;
      if (
        name == null ||
        description == null ||
        isFamily == null ||
        type == null ||
        capabilities == null
      ) {
        return next(new Error('incomplete malware data'));
      }

      const malwareData = await dataSource.getRepository(Malware).create({
        name,
        description,
        is_family: isFamily,
        type,
        capabilities,
        annotation_id: newAnnotation.id,
      });
      const newMalware = await dataSource
        .getRepository(Malware)
        .save(malwareData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          malware: newMalware.id,
        },
      );
      return res.json(newMalware);
    }
    if (note != null) {
      const { content, authors, objectRefs } = note;
      if (content == null || authors == null || objectRefs == null) {
        return next(new Error('incomplete note data'));
      }

      const noteData = await dataSource.getRepository(Note).create({
        content,
        authors,
        object_refs: objectRefs,
        annotation_id: newAnnotation.id,
      });
      const newNote = await dataSource.getRepository(Note).save(noteData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          note: newNote.id,
        },
      );
      return res.json(newNote);
    }
    if (process != null) {
      const { commandLine } = process;
      if (commandLine == null) {
        return next(new Error('incomplete process data'));
      }

      const processData = await dataSource.getRepository(Process).create({
        command_line: commandLine,
        annotation_id: newAnnotation.id,
      });
      const newProcess = await dataSource
        .getRepository(Process)
        .save(processData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          process: newProcess.id,
        },
      );
      return res.json(newProcess);
    }
    if (software != null) {
      const { path } = software;
      if (path == null) {
        return next(new Error('incomplete software data'));
      }

      const softwareData = await dataSource.getRepository(Software).create({
        path,
        annotation_id: newAnnotation.id,
      });
      const newSoftware = await dataSource
        .getRepository(Software)
        .save(softwareData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          software: newSoftware.id,
        },
      );
      return res.json(newSoftware);
    }
    if (threatActor != null) {
      const {
        path,
        name,
        description,
        types,
        aliases,
        firstSeen,
        roles,
        goals,
        sophistication,
        resourceLevel,
        primaryMotivation,
      } = threatActor;
      if (
        path == null ||
        name == null ||
        description == null ||
        types == null ||
        aliases == null ||
        firstSeen == null ||
        roles == null ||
        goals == null ||
        sophistication == null ||
        resourceLevel == null ||
        primaryMotivation == null
      ) {
        return next(new Error('incomplete threat actor data'));
      }

      const threatActorData = await dataSource
        .getRepository(ThreatActor)
        .create({
          path,
          name,
          description,
          types,
          aliases,
          first_seen: firstSeen,
          roles,
          goals,
          sophistication,
          resource_level: resourceLevel,
          primary_motivation: primaryMotivation,
          annotation_id: newAnnotation.id,
        });
      const newThreatActor = await dataSource
        .getRepository(ThreatActor)
        .save(threatActorData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          threat_actor: newThreatActor.id,
        },
      );
      return res.json(newThreatActor);
    }
    if (tool != null) {
      const { name, description, types } = tool;
      if (name == null || description == null || types == null) {
        return next(new Error('incomplete tool data'));
      }

      const toolData = await dataSource.getRepository(Tool).create({
        name,
        description,
        types,
        annotation_id: newAnnotation.id,
      });
      const newTool = await dataSource.getRepository(Tool).save(toolData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          tool: newTool.id,
        },
      );
      return res.json(newTool);
    }
    if (url != null) {
      const { value } = url;
      if (value == null) {
        return next(new Error('incomplete url data'));
      }

      const urlData = await dataSource.getRepository(Url).create({
        value,
        annotation_id: newAnnotation.id,
      });
      const newUrl = await dataSource.getRepository(Url).save(urlData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          url: newUrl.id,
        },
      );
      return res.json(newUrl);
    }
    if (userAccount != null) {
      const {
        email: userAccountEmail,
        displayName,
        isPrivileged,
      } = userAccount;
      if (
        userAccountEmail == null ||
        displayName == null ||
        isPrivileged == null
      ) {
        return next(new Error('incomplete user account data'));
      }

      const userAccountData = await dataSource
        .getRepository(UserAccount)
        .create({
          email: userAccountEmail,
          display_name: displayName,
          is_privileged: isPrivileged,
          annotation_id: newAnnotation.id,
        });
      const newUserAccount = await dataSource
        .getRepository(UserAccount)
        .save(userAccountData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          user_account: newUserAccount.id,
        },
      );
      return res.json(newUserAccount);
    }
    if (vulnerability != null) {
      const { name, description } = vulnerability;
      if (name == null || description == null) {
        return next(new Error('incomplete vulnerability data'));
      }

      const vulnerabilityData = await dataSource
        .getRepository(Vulnerability)
        .create({
          name,
          description,
          annotation_id: newAnnotation.id,
        });
      const newVulnerability = await dataSource
        .getRepository(Vulnerability)
        .save(vulnerabilityData);
      await dataSource.getRepository(Annotation).update(
        {
          id: newAnnotation.id,
        },
        {
          vulnerability: newVulnerability.id,
        },
      );
      return res.json(newVulnerability);
    }
    return next(new Error('no child annotation found'));
  } catch (err) {
    return next(err);
  }
});

router.post('/delete', verify, async (req, res, next) => {
  const { payload } = req.auth;
  const { email } = payload;

  // Validation
  const data = req.body;
  if (data.id == null || data.projectID == null) {
    return next(new Error('missing annotation or project id'));
  }

  const { projectID, id } = data;

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

    const annotation = await dataSource.getRepository(Annotation).find({
      where: {
        id,
        project: projectID,
        user: email,
      },
    });
    if (annotation.length === 0) {
      return next(new Error('annotation not found'));
    }

    await dataSource.getRepository(Annotation).delete({
      id,
    });
  } catch (err) {
    return next(err);
  }
  return res.json({});
});

module.exports = router;
