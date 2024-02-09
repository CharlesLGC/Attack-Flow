const Asset = require('../entity/Asset');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class AssetSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const assetRepository = dataSource.getRepository(Asset);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.ASSET_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const assetData = {
          name: `name ${i} for asset ${i}`,
          description: `description ${i} for asset ${i}`,
          annotation_id: annotation.id,
        };
        const asset = assetRepository.create(assetData);
        const newAsset = await assetRepository.save(asset);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            asset: newAsset.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = AssetSeeder;
