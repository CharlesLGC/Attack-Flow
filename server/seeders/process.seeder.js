const Process = require('../entity/Process');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class ProcessSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const processRepository = dataSource.getRepository(Process);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.PROCESS_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const processData = {
          command_line: `command line ${i}`,
          annotation_id: annotation.id,
        };
        const process = processRepository.create(processData);
        const newProcess = await processRepository.save(process);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            process: newProcess.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = ProcessSeeder;
