const IPv4 = require('../entity/IPv4');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class IPv4Seeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const ipv4Repository = dataSource.getRepository(IPv4);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.IPV4_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });
      const values = ['194.31.98.141', '255.255.255.255', '192.99.99.99'];

      annotationDataArray.forEach(async (annotation, i) => {
        const ipv4Data = {
          value: values[i % 3],
          annotation_id: annotation.id,
        };
        const ipv4 = ipv4Repository.create(ipv4Data);
        const newIpv4 = await ipv4Repository.save(ipv4);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            ipv4: newIpv4.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = IPv4Seeder;
