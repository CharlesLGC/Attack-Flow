const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Tool',
  tableName: 'tool',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    types: {
      type: 'json',
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
