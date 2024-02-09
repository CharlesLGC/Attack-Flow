const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Project',
  tableName: 'project',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    title: {
      type: 'varchar',
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
    },
    url: {
      type: 'varchar',
      nullable: true,
    },
    image: {
      type: 'varchar',
      nullable: true,
    },
    description: {
      type: 'text',
    },
    is_approved: {
      type: 'boolean',
    },
    is_hidden: {
      type: 'boolean',
    },
  },
});
