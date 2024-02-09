const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Campaign',
  tableName: 'campaign',
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
    first_seen: {
      type: 'datetime',
    },
    objective: {
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
