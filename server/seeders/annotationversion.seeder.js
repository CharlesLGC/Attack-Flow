const AnnotationVersion = require('../entity/AnnotationVersion');
const Annotation = require('../entity/Annotation');
const Version = require('../entity/Version');

class AnnotationVersionSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const annotationVersionDataArray = [];

      try {
        const annotationRepository = dataSource.getRepository(Annotation);
        const annotationDataArray = await annotationRepository.find();

        const versionRepository = dataSource.getRepository(Version);
        const versionDataArray = await versionRepository.find();

        for (let i = 0; i < annotationDataArray.length; i++) {
          const annotationData = annotationDataArray[i];
          const versionData = versionDataArray[i % versionDataArray.length];
          const combinedData = {
            annotation: annotationData.id,
            version: versionData.id,
          };
          annotationVersionDataArray.push(combinedData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      const annotationVersionRepository =
        dataSource.getRepository(AnnotationVersion);
      annotationVersionDataArray.forEach(async (annotationVersionData) => {
        const annotationVersion = annotationVersionRepository.create(
          annotationVersionData,
        );
        await annotationVersionRepository.save(annotationVersion);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = AnnotationVersionSeeder;
