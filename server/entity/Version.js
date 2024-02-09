const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Version',
  tableName: 'version',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    title: {
      type: 'varchar',
    },
    project_id: {
      type: 'varchar',
    },
  },
  relations: {
    project: {
      target: 'Project',
      type: 'many-to-one',
      joinColumn: { name: 'project_id', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});
