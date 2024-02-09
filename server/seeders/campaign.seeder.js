const Campaign = require('../entity/Campaign');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class CampaignSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const campaignRepository = dataSource.getRepository(Campaign);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.CAMPAIGN_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });
      annotationDataArray.forEach(async (annotation, i) => {
        const campaignData = {
          name: `name ${i} for campaign ${i}`,
          description: `description ${i} for campaign ${i}`,
          first_seen: '2021-12-12T11:11:11+00:00Z',
          objective: `objective ${i} for campaign ${i}`,
          annotation_id: annotation.id,
        };
        const campaign = campaignRepository.create(campaignData);
        const newCampaign = await campaignRepository.save(campaign);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            campaign: newCampaign.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = CampaignSeeder;
