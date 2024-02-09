const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Identity',
  tableName: 'identity',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    author_name: {
      type: 'varchar',
    },
    author_email: {
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
