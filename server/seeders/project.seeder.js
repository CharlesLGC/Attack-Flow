const Project = require('../entity/Project');

class ProjectSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const projectDataArray = [
        {
          title: 'title 1 for project 1',
          url: 'public/1696816570529***file-raid.pdf',
          description: 'description 1 for project 1',
          is_approved: false,
          is_hidden: true,
        },
        {
          title: 'Microsoft Phishing',
          url: 'public/1696816570529***file-raid.pdf',
          image:
            'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          description:
            '100 million user accounts were compromised due to a misconfiguration in Azure.',
          is_approved: true,
          is_hidden: true,
        },
        {
          title: 'title 3 for project 3',
          url: 'public/1696816570529***file-raid.pdf',
          description: 'description 3 for project 3',
          is_approved: false,
          is_hidden: true,
        },
        {
          title: 'DDOS Attack on Dubai',
          url: 'public/1696816570529***file-raid.pdf',
          image:
            'https://images.pexels.com/photos/2041556/pexels-photo-2041556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          description:
            'Cloudflare has recently gotten a surge of data that was unimaginable over 2 hours.',
          is_approved: true,
          is_hidden: false,
        },
      ];

      const projectRepository = dataSource.getRepository(Project);
      projectDataArray.forEach(async (projectData) => {
        const project = projectRepository.create(projectData);
        await projectRepository.save(project);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = ProjectSeeder;
