const constants = {
  NUMBER_TO_SEED: 4,
};

const types = [
  'ACTION',
  'ASSET',
  'CAMPAIGN',
  'CONDITION',
  'DIRECTORY',
  'FILE',
  'IDENTITY',
  'INFRASTRUCTURE',
  'IPV4',
  'MALWARE',
  'NOTE',
  'PROCESS',
  'SOFTWARE',
  'THREATACTOR',
  'TOOL',
  'URL',
  'USERACCOUNT',
  'VULNERABILITY',
];

const relations = {};

(() => {
  types.forEach((type, i) => {
    // Constants
    constants[`${type}_SEEDER_OFFSET`] = i * constants.NUMBER_TO_SEED;

    // Relations
    if (type === 'THREATACTOR') {
      relations.threat_actor = true;
    } else if (type === 'USERACCOUNT') {
      relations.user_account = true;
    } else {
      relations[type.toLowerCase()] = true;
    }
  });
})();

module.exports = { types, constants, relations };
