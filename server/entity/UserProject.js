const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'UserProject',
  tableName: 'user_project',
  columns: {
    user: {
      primary: true,
      type: 'varchar',
    },
    project: {
      primary: true,
      type: 'varchar',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'user', referencedColumnName: 'email' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    project: {
      target: 'Project',
      type: 'many-to-one',
      joinColumn: { name: 'project', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});
