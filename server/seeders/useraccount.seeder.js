const UserAccount = require('../entity/UserAccount');
const User = require('../entity/User');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class UserAccountSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const userAccountRepository = dataSource.getRepository(UserAccount);
      const userRepository = dataSource.getRepository(User);
      const userDataArray = await userRepository.find();

      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.USERACCOUNT_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });
      const displayNameArray = [
        'Professor Beh',
        'Jason Yu',
        'JianJian',
        'Hokkien Juicy Boy',
      ];
      const isPrivilegedArray = [true, false, true, false];

      annotationDataArray.forEach(async (annotation, i) => {
        const userAccountData = {
          email: userDataArray[i % userDataArray.length].email,
          display_name: displayNameArray[i],
          is_privileged: isPrivilegedArray[i],
          annotation_id: annotation.id,
        };
        const userAccount = userAccountRepository.create(userAccountData);
        const newUserAccount = await userAccountRepository.save(userAccount);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            user_account: newUserAccount.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = UserAccountSeeder;
