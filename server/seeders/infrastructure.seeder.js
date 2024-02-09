const Infrastructure = require('../entity/Infrastructure');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class InfrastructureSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const infrastructureRepository = dataSource.getRepository(Infrastructure);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.INFRASTRUCTURE_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });
      annotationDataArray.forEach(async (annotation, i) => {
        const infrastructureData = {
          name: `infrastructure ${i}`,
          description: `description ${i} for infrastructure ${i}`,
          annotation_id: annotation.id,
        };
        const infrastructure =
          infrastructureRepository.create(infrastructureData);
        const newInfrastructure =
          await infrastructureRepository.save(infrastructure);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            infrastructure: newInfrastructure.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = InfrastructureSeeder;
