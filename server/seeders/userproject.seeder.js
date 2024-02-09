const UserProject = require('../entity/UserProject');
const User = require('../entity/User');
const Project = require('../entity/Project');

class UserProjectSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const userProjectDataArray = [];
      try {
        const userRepository = dataSource.getRepository(User);
        const userDataArray = await userRepository.find();

        const projectRepository = dataSource.getRepository(Project);
        const projectDataArray = await projectRepository.find();

        for (let i = 0; i < userDataArray.length; i++) {
          const userData = userDataArray[i];
          const projectData = projectDataArray[i];

          const index = i === 0 ? userDataArray.length - 1 : i - 1;
          const newUserData = userDataArray[i];
          const newProjectData = projectDataArray[index];
          const combinedData = {
            user: userData.email,
            project: projectData.id,
          };

          const newCombinedData = {
            user: newUserData.email,
            project: newProjectData.id,
          };
          userProjectDataArray.push(combinedData);
          userProjectDataArray.push(newCombinedData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      const userProjectRepository = dataSource.getRepository(UserProject);
      userProjectDataArray.forEach(async (userProjectData) => {
        const userProject = userProjectRepository.create(userProjectData);
        await userProjectRepository.save(userProject);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = UserProjectSeeder;
