const Version = require('../entity/Version');
const Project = require('../entity/Project');

class VersionSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const versionDataArray = [];
      try {
        const projectRepository = dataSource.getRepository(Project);
        const projectDataArray = await projectRepository.find();

        const titleArray = ['1.0', '1.1', '1.2', '2.0', '3.0'];

        for (let i = 0; i < projectDataArray.length; i++) {
          const projectData = projectDataArray[i];
          const combinedData = {
            title: titleArray[i % 5],
            project_id: projectData.id,
          };
          versionDataArray.push(combinedData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      const versionRepository = dataSource.getRepository(Version);
      versionDataArray.forEach(async (versionData) => {
        const version = versionRepository.create(versionData);
        await versionRepository.save(version);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

module.exports = VersionSeeder;
