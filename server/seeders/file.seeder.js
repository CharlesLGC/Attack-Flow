const File = require('../entity/File');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class FileSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const fileRepository = dataSource.getRepository(File);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.FILE_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const fileData = {
          name: `fileName${i}.png`,
          annotation_id: annotation.id,
        };
        const file = fileRepository.create(fileData);
        const newFile = await fileRepository.save(file);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            file: newFile.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = FileSeeder;
