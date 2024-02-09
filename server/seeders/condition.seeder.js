const Condition = require('../entity/Condition');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class ConditionSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const conditionRepository = dataSource.getRepository(Condition);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.CONDITION_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });
      annotationDataArray.forEach(async (annotation, i) => {
        const conditionData = {
          description: `description ${i} for condition ${i}`,
          annotation_id: annotation.id,
        };
        const condition = conditionRepository.create(conditionData);
        const newCondition = await conditionRepository.save(condition);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            condition: newCondition.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = ConditionSeeder;
