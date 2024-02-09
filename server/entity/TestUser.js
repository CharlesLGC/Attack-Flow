const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'TestUser',
  tableName: 'testuser',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
});
