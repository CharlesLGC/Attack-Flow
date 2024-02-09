const ThreatActor = require('../entity/ThreatActor');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class ThreatActorSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const threatActorRepository = dataSource.getRepository(ThreatActor);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.THREATACTOR_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const threatActorData = {
          path: `Path ${i}`,
          name: `ThreatActor ${i}`,
          description: `description ${i} for asset ${i}`,
          types: {
            type1: `ThreatActor type ${i}`,
            type2: `ThreatActor type ${i + 1}`,
          },
          aliases: {
            alias1: `ThreatActor alias ${i}`,
            alias2: `ThreatActor alias ${i + 1}`,
          },
          first_seen: `2022-11-11T12:12:12+00:00Z`,
          roles: {
            role1: `ThreatActor role ${i}`,
            role2: `ThreatActor role ${i + 1}`,
          },
          goals: {
            goal1: `ThreatActor goal ${i}`,
            goal2: `ThreatActor goal ${i + 1}`,
          },
          sophistication: `Sophistication ${i}`,
          resource_level: `Resource Level ${i}`,
          primary_motivation: `Motivation ${i}`,
          annotation_id: annotation.id,
        };
        const threatActor = threatActorRepository.create(threatActorData);
        const newThreatActor = await threatActorRepository.save(threatActor);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            threat_actor: newThreatActor.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = ThreatActorSeeder;
