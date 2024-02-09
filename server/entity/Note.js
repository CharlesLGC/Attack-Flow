const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Note',
  tableName: 'note',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    content: {
      type: 'text',
    },
    authors: {
      type: 'json',
    },
    object_refs: {
      type: 'json', // TODO: add validation function to make sure all values are annotation foreign keys
    },
    annotation_id: {
      type: 'varchar',
    },
  },
  relations: {
    annotation: {
      target: 'Annotation',
      type: 'one-to-one',
      joinColumn: { name: 'annotation_id', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});
