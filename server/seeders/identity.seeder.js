const Identity = require('../entity/Identity');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class IdentitySeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const identityRepository = dataSource.getRepository(Identity);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.IDENTITY_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });
      annotationDataArray.forEach(async (annotation, i) => {
        const identityData = {
          author_name: `author ${i} for identity ${i}`,
          author_email: `author${i}@gmail.com`,
          annotation_id: annotation.id,
        };
        const identity = identityRepository.create(identityData);
        const newIdentity = await identityRepository.save(identity);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            identity: newIdentity.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = IdentitySeeder;
