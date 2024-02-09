const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Condition',
  tableName: 'condition',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
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
