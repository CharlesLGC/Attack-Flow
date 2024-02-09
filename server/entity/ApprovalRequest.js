const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'ApprovalRequest',
  tableName: 'approvalRequest',
  columns: {
    id: {
      primary: true,
      type: 'text',
      generated: 'uuid',
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
    },
    status: {
      type: 'boolean',
    },
    description: {
      type: 'text',
    },
    user: {
      type: 'varchar',
    },
    project: {
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
