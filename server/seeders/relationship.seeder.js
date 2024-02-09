const Annotation = require('../entity/Annotation');
const Relationship = require('../entity/Relationship');
const Project = require('../entity/Project');

class RelationshipSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const relationshipDataArray = [];
      try {
        const projectRepository = dataSource.getRepository(Project);
        const projectDataArray = await projectRepository.find();
        const projectDataArrayLen = projectDataArray.length;
        const annotationRepository = dataSource.getRepository(Annotation);
        const annotationDataArray = await annotationRepository.find();
        const statusArr = ['effect', 'related-to'];

        for (let i = 0; i < projectDataArrayLen * 5; i++) {
          const currentActionData = annotationDataArray[i];
          const nextActionData = annotationDataArray[i + 1];
          const combinedData = {
            project_id: projectDataArray[i % projectDataArrayLen].id,
            source: currentActionData.id,
            target: nextActionData.id,
            status: statusArr[i % 2],
            type: {
              AND: true,
            },
          };
          relationshipDataArray.push(combinedData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      const relationshipRepository = dataSource.getRepository(Relationship);
      relationshipDataArray.forEach(async (relationshipData) => {
        const relationship = relationshipRepository.create(relationshipData);
        await relationshipRepository.save(relationship);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = RelationshipSeeder;
