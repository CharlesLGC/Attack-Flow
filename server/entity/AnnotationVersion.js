const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'AnnotationVersion',
  tableName: 'annotation_version',
  columns: {
    version: {
      primary: true,
      type: 'varchar',
    },
    annotation: {
      primary: true,
      type: 'varchar',
    },
  },
  relations: {
    version: {
      target: 'Version',
      type: 'many-to-one',
      joinColumn: { name: 'version', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    annotation: {
      target: 'Annotation',
      type: 'many-to-one',
      joinColumn: { name: 'annotation', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});
