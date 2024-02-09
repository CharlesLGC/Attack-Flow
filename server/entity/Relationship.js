const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Relationship',
  tableName: 'relationship',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    project_id: {
      type: 'varchar',
    },
    source: {
      type: 'varchar',
    },
    target: {
      type: 'varchar',
    },
    status: {
      type: 'varchar',
    },
    type: {
      type: 'json',
    },
  },
  relations: {
    source: {
      target: 'Annotation',
      type: 'many-to-one',
      joinColumn: { name: 'source', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    target: {
      target: 'Annotation',
      type: 'many-to-one',
      joinColumn: { name: 'target', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    project: {
      target: 'Project',
      type: 'many-to-one',
      joinColumn: { name: 'project_id', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});
