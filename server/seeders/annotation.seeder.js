const Annotation = require('../entity/Annotation');
const User = require('../entity/User');
const Project = require('../entity/Project');
const { constants, types } = require('../utils/constants');

class AnnotationSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const annotationDataArray = [];
      try {
        const userRepository = dataSource.getRepository(User);
        const userDataArray = await userRepository.find();

        const projectRepository = dataSource.getRepository(Project);
        const projectDataArray = await projectRepository.find();

        const exampleContent = [
          { text: 'Content 1' },
          { text: 'Content 2' },
          { text: 'Content 3' },
        ];

        const exampleComment = [
          { text: 'Comment 1' },
          { text: 'Comment 2' },
          { text: 'Comment 3' },
        ];

        const examplePosition = [
          {
            boundingRect: {
              height: 1200,
              pageNumber: 1,
              width: 200,
              x1: 100,
              x2: 100,
              y1: 100,
              y2: 100,
            },
            rects: [
              {
                height: 1200,
                pageNumber: 1,
                width: 200,
                x1: 100,
                x2: 100,
                y1: 100,
                y2: 100,
              },
            ],
            pageNumber: 1,
          },
          {
            boundingRect: {
              height: 1000,
              pageNumber: 1,
              width: 250,
              x1: 120,
              x2: 120,
              y1: 120,
              y2: 120,
            },
            rects: [
              {
                height: 1000,
                pageNumber: 1,
                width: 250,
                x1: 120,
                x2: 120,
                y1: 120,
                y2: 120,
              },
            ],
            pageNumber: 1,
          },
          {
            boundingRect: {
              height: 900,
              pageNumber: 2,
              width: 150,
              x1: 160,
              x2: 160,
              y1: 160,
              y2: 160,
            },
            rects: [
              {
                height: 900,
                pageNumber: 2,
                width: 150,
                x1: 160,
                x2: 160,
                y1: 160,
                y2: 160,
              },
            ],
            pageNumber: 2,
          },
        ];
        // This loop adds each entity into annotation table with its 'id' field as a foreign key
        const total = constants.NUMBER_TO_SEED * types.length;
        for (let i = 0; i < total; i++) {
          const combinedData = {
            is_currently_existing: i % 2 === 0,
            highlight_comment: exampleComment[i % 3],
            highlight_content: exampleContent[i % 3],
            highlight_position: examplePosition[i % 3],
            project: projectDataArray[i % 4].id,
            user: userDataArray[i % 4].email,
          };
          annotationDataArray.push(combinedData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      const annotationRepository = dataSource.getRepository(Annotation);
      annotationDataArray.forEach(async (annotationData) => {
        const annotation = annotationRepository.create(annotationData);
        await annotationRepository.save(annotation);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = AnnotationSeeder;
