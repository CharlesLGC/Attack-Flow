const User = require('../entity/User');

class UserSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      // Note: Password for all users is Password123! (case-sensitive)
      const userDataArray = [
        {
          email: 'root@attackflow.com',
          name: 'Admin',
          is_admin: true,
        },
        {
          email: 'john@attackflow.com',
          name: 'john',
          is_admin: false,
        },
        {
          email: 'kate@attackflow.com',
          name: 'kate',
          is_admin: false,
        },
        {
          email: 'alice@attackflow.com',
          name: 'alice',
          is_admin: false,
        },
      ];

      const userRepository = dataSource.getRepository(User);
      userDataArray.forEach(async (userData) => {
        const user = userRepository.create(userData);
        await userRepository.save(user);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = UserSeeder;
