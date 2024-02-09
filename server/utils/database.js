const typeorm = require('typeorm');

const Action = require('../entity/Action');
const Annotation = require('../entity/Annotation');
const AnnotationVersion = require('../entity/AnnotationVersion');
const ApprovalRequest = require('../entity/ApprovalRequest');
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
const Project = require('../entity/Project');
const Relationship = require('../entity/Relationship');
const Software = require('../entity/Software');
const TestUser = require('../entity/TestUser');
const ThreatActor = require('../entity/ThreatActor');
const Tool = require('../entity/Tool');
const Url = require('../entity/Url');
const User = require('../entity/User');
const UserAccount = require('../entity/UserAccount');
const UserProject = require('../entity/UserProject');
const Version = require('../entity/Version');
const Vulnerability = require('../entity/Vulnerability');

const entities = [
  Action,
  Annotation,
  AnnotationVersion,
  ApprovalRequest,
  Asset,
  Campaign,
  Condition,
  Directory,
  File,
  Identity,
  Infrastructure,
  IPv4,
  Malware,
  Note,
  Process,
  Project,
  Relationship,
  Software,
  TestUser,
  ThreatActor,
  Tool,
  Url,
  User,
  UserAccount,
  UserProject,
  Version,
  Vulnerability,
];

let dataSource;
if (process.env.NODE_ENV !== 'test') {
  dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: 'host.docker.internal',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'attackflow',
    synchronize: true,
    entities,
    seeds: ['../seeders/*.seeder.js'],
  });
} else {
  dataSource = new typeorm.DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    synchronize: false,
    logging: false,
    entities,
    seeds: ['../seeders/*.seeder.js'],
  });
}

module.exports = dataSource;
