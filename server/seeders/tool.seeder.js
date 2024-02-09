const Tool = require('../entity/Tool');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class ToolSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const toolRepository = dataSource.getRepository(Tool);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.TOOL_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const toolData = {
          name: `name ${i} for asset ${i}`,
          description: `description ${i} for asset ${i}`,
          types: {
            type1: `type ${i} for tool`,
            type2: `type ${i + 1} for tool`,
          },
          annotation_id: annotation.id,
        };
        const tool = toolRepository.create(toolData);
        const newTool = await toolRepository.save(tool);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            tool: newTool.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = ToolSeeder;
