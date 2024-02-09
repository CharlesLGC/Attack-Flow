const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Infrastructure',
  tableName: 'infrastructure',
  schema: 'public',
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
