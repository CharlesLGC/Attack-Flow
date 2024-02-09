const Software = require('../entity/Software');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class SoftwareSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const softwareRepository = dataSource.getRepository(Software);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.SOFTWARE_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const softwareData = {
          path: `path ${i} for software ${i}`,
          name: `software ${i}`,
          description: `description ${i} for software ${i}`,
          alias: `alias ${i} for software ${i}`,
          first_seen: '2021-12-12T11:11:11+00:00Z',
          roles: `role for software ${i}`,
          goals: `goal for software ${i}`,
          sophistication: `sophistication for software ${i}`,
          resource_level: `resource_level for software ${i}`,
          primary_motivation: `primary_motivation for software ${i}`,
          annotation_id: annotation.id,
        };
        const software = softwareRepository.create(softwareData);
        const newSoftware = await softwareRepository.save(software);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            software: newSoftware.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = SoftwareSeeder;
