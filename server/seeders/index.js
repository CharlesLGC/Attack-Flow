const { runSeeders } = require('typeorm-extension');
const Annotation = require('../entity/Annotation');
const { types } = require('../utils/constants');

async function runAllSeeders(dataSource) {
  // Do not run seeders when it's production
  if (process.env.NODE_ENV === 'production') return;

  const annotations = await dataSource.getRepository(Annotation).find();
  if (annotations.length > 0) return;

  const seederOptions1 = {
    seeds: ['./seeders/user.seeder.js', './seeders/project.seeder.js'],
  };
  const seederOptions2 = {
    seeds: [
      './seeders/annotation.seeder.js',
      './seeders/version.seeder.js',
      './seeders/userproject.seeder.js',
    ],
  };
  const typesSeeders = types.map(
    (type) => `./seeders/${type.toLowerCase()}.seeder.js`,
  );
  const seederOptions3 = {
    seeds: [
      './seeders/annotationversion.seeder.js',
      './seeders/approval_requests.seeder.js',
      './seeders/relationship.seeder.js',
      './seeders/version.seeder.js',
      ...typesSeeders,
    ],
  };

  // The order of seederOptions matter because there are dependencies involved.
  // For example, annotations require project ID
  // Additionally, we will only synchronize in docker and not the testing environment to prevent errors.
  await runSeeders(dataSource, seederOptions1);
  if (process.env.NODE_ENV !== 'test') await dataSource.synchronize();
  await runSeeders(dataSource, seederOptions2);
  if (process.env.NODE_ENV !== 'test') await dataSource.synchronize();
  await runSeeders(dataSource, seederOptions3);
  if (process.env.NODE_ENV !== 'test') await dataSource.synchronize();
}

module.exports = runAllSeeders;
