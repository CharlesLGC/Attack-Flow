const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Action',
  tableName: 'action',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    tag: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    confidence: {
      type: 'int',
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
