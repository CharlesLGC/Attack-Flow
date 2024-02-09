const Url = require('../entity/Url');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class UrlSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const urlRepository = dataSource.getRepository(Url);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.URL_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const urlData = {
          value: `values for url ${i}`,
          annotation_id: annotation.id,
        };
        const url = urlRepository.create(urlData);
        const newUrl = await urlRepository.save(url);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            url: newUrl.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = UrlSeeder;
