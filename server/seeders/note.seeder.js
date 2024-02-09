const Note = require('../entity/Note');
const Annotation = require('../entity/Annotation');
const { constants } = require('../utils/constants');

class NoteSeeder {
  // eslint-disable-next-line class-methods-use-this
  async run(dataSource) {
    try {
      const noteRepository = dataSource.getRepository(Note);
      const annotationRepository = dataSource.getRepository(Annotation);
      const annotationDataArray = await annotationRepository.find({
        skip: constants.NOTE_SEEDER_OFFSET,
        take: constants.NUMBER_TO_SEED,
        order: {
          id: 'ASC',
        },
      });

      annotationDataArray.forEach(async (annotation, i) => {
        const noteData = {
          content: `content for ${i}`,
          authors: {
            author1: `author ${i}`,
            author2: `author ${i + 1}`,
          },
          object_refs: {
            object1: annotation.id,
          },
          annotation_id: annotation.id,
        };
        const note = noteRepository.create(noteData);
        const newNote = await noteRepository.save(note);
        await annotationRepository.update(
          {
            id: annotation.id,
          },
          {
            note: newNote.id,
          },
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = NoteSeeder;
