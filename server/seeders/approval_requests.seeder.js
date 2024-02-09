const User = require('../entity/User');
const Project = require('../entity/Project');
const ApprovalRequest = require('../entity/ApprovalRequest');

class AnnotationSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const approvalRequestsDataArray = [];
      try {
        const userRepository = dataSource.getRepository(User);
        const userDataArray = await userRepository.find({
          where: {
            is_admin: false,
          },
        });

        const projectRepository = dataSource.getRepository(Project);
        const projectDataArray = await projectRepository.find();

        for (let i = 0; i < projectDataArray.length * 3; i++) {
          const combinedData = {
            project: projectDataArray[i % projectDataArray.length].id,
            user: userDataArray[i % userDataArray.length].email,
            status: i % 2 === 0,
            description: 'test description',
          };
          approvalRequestsDataArray.push(combinedData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      const approvalRequestsRepository =
        dataSource.getRepository(ApprovalRequest);
      approvalRequestsDataArray.forEach(async (approvalRequestsData) => {
        const approvalRequests =
          approvalRequestsRepository.create(approvalRequestsData);
        await approvalRequestsRepository.save(approvalRequests);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = AnnotationSeeder;
