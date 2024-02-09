const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Annotation',
  tableName: 'annotation',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
    },
    highlight_content: {
      type: 'json',
      nullable: true,
    },
    highlight_comment: {
      type: 'json',
      nullable: true,
    },
    highlight_position: {
      type: 'json',
      nullable: true,
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
    },
    is_currently_existing: {
      type: 'boolean',
      default: true,
    },
    project: {
      type: 'varchar',
    },
    user: {
      type: 'varchar',
    },
    action: {
      type: 'varchar',
      nullable: true,
    },
    asset: {
      type: 'varchar',
      nullable: true,
    },
    campaign: {
      type: 'varchar',
      nullable: true,
    },
    condition: {
      type: 'varchar',
      nullable: true,
    },
    directory: {
      type: 'varchar',
      nullable: true,
    },
    file: {
      type: 'varchar',
      nullable: true,
    },
    identity: {
      type: 'varchar',
      nullable: true,
    },
    infrastructure: {
      type: 'varchar',
      nullable: true,
    },
    ipv4: {
      type: 'varchar',
      nullable: true,
    },
    malware: {
      type: 'varchar',
      nullable: true,
    },
    note: {
      type: 'varchar',
      nullable: true,
    },
    process: {
      type: 'varchar',
      nullable: true,
    },
    software: {
      type: 'varchar',
      nullable: true,
    },
    threat_actor: {
      type: 'varchar',
      nullable: true,
    },
    tool: {
      type: 'varchar',
      nullable: true,
    },
    url: {
      type: 'varchar',
      nullable: true,
    },
    user_account: {
      type: 'varchar',
      nullable: true,
    },
    vulnerability: {
      type: 'varchar',
      nullable: true,
    },
  },
  relations: {
    project: {
      target: 'Project',
      type: 'many-to-one',
      joinColumn: { name: 'project', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'user', referencedColumnName: 'email' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    action: {
      target: 'Action',
      type: 'one-to-one',
      joinColumn: { name: 'action', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    asset: {
      target: 'Asset',
      type: 'one-to-one',
      joinColumn: { name: 'asset', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    campaign: {
      target: 'Campaign',
      type: 'one-to-one',
      joinColumn: { name: 'campaign', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    condition: {
      target: 'Condition',
      type: 'one-to-one',
      joinColumn: { name: 'condition', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    directory: {
      target: 'Directory',
      type: 'one-to-one',
      joinColumn: { name: 'directory', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    file: {
      target: 'File',
      type: 'one-to-one',
      joinColumn: { name: 'file', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    identity: {
      target: 'Identity',
      type: 'one-to-one',
      joinColumn: { name: 'identity', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    infrastructure: {
      target: 'Infrastructure',
      type: 'one-to-one',
      joinColumn: { name: 'infrastructure', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    ipv4: {
      target: 'IPv4',
      type: 'one-to-one',
      joinColumn: { name: 'ipv4', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    malware: {
      target: 'Malware',
      type: 'one-to-one',
      joinColumn: { name: 'malware', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    note: {
      target: 'Note',
      type: 'one-to-one',
      joinColumn: { name: 'note', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    process: {
      target: 'Process',
      type: 'one-to-one',
      joinColumn: { name: 'process', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    software: {
      target: 'Software',
      type: 'one-to-one',
      joinColumn: { name: 'software', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    threat_actor: {
      target: 'ThreatActor',
      type: 'one-to-one',
      joinColumn: { name: 'threat_actor', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    tool: {
      target: 'Tool',
      type: 'one-to-one',
      joinColumn: { name: 'tool', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    url: {
      target: 'Url',
      type: 'one-to-one',
      joinColumn: { name: 'url', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    user_account: {
      target: 'UserAccount',
      type: 'one-to-one',
      joinColumn: { name: 'user_account', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    vulnerability: {
      target: 'Vulnerability',
      type: 'one-to-one',
      joinColumn: { name: 'vulnerability', referencedColumnName: 'id' },
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});
