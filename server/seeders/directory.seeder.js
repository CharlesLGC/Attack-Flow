const Directory = require('../entity/Directory');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class DirectorySeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const directoryRepository = dataSource.getRepository(Directory);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.DIRECTORY_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const directoryData = {
          path: `path ${i} for directory ${i}`,
          annotation_id: annotationDataArray[i].id,
        };
        const directory = directoryRepository.create(directoryData);
        const newDirectory = await directoryRepository.save(directory);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            directory: newDirectory.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = DirectorySeeder;
