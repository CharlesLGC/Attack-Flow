const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'user',
  columns: {
    email: {
      primary: true,
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    is_admin: {
      type: 'boolean',
    },
  },
});
