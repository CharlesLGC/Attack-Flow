const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'ThreatActor',
  tableName: 'threat_actor',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    path: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    types: {
      type: 'json',
    },
    aliases: {
      type: 'json',
    },
    first_seen: {
      type: 'datetime',
    },
    roles: {
      type: 'json',
    },
    goals: {
      type: 'json',
    },
    sophistication: {
      type: 'varchar',
    },
    resource_level: {
      type: 'varchar',
    },
    primary_motivation: {
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
