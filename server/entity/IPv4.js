const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'IPv4',
  tableName: 'ipv4',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    value: {
      type: 'varchar',
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
