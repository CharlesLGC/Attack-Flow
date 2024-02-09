const Action = require('../entity/Action');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class ActionSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const actionRepository = dataSource.getRepository(Action);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.ACTION_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });
      const confidenceArray = [80, 90, 100];

      annotationDataArray.forEach(async (annotation, i) => {
        const actionData = {
          tag: `tag ${i} for action ${i}`,
          name: `name ${i} for action ${i}`,
          description: `description ${i} for action ${i}`,
          confidence: confidenceArray[i % 3],
          annotation_id: annotation.id,
        };
        const action = actionRepository.create(actionData);
        const newAction = await actionRepository.save(action);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            action: newAction.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = ActionSeeder;
