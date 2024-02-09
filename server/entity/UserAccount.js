const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'UserAccount',
  tableName: 'user_account',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    email: {
      type: 'varchar',
    },
    display_name: {
      type: 'varchar',
    },
    is_privileged: {
      type: 'boolean',
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
