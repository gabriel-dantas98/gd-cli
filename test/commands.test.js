const { test } = require('node:test');
const assert = require('node:assert/strict');

test('comando aws expõe atributos do inquirer', () => {
  const aws = require('../commands/aws');
  const attr = aws.getInquirerAttr();

  assert.equal(attr.type, 'list');
  assert.equal(attr.name, 'aws');
  assert.deepEqual(attr.choices, ['ec2', 'rds', 'ssm']);
  assert.match(attr.message, /AWS/i);
});

test('comando gcp expõe atributos do inquirer', () => {
  const gcp = require('../commands/gcp');
  const attr = gcp.getInquirerAttr();

  assert.equal(attr.type, 'list');
  assert.equal(attr.name, 'gcp');
  assert.deepEqual(attr.choices, ['help', 'compute', 'gke']);
});

test('classe Command preserva defaults do construtor', () => {
  const Command = require('../core/command/prompt');
  const cmd = new Command('foo', 'f', 'string', 'descrição', () => {}, ['a'], 'default');

  const attr = cmd.getInquirerAttr();
  assert.equal(attr.name, 'foo');
  assert.equal(attr.message, 'descrição');
  assert.deepEqual(attr.choices, ['a']);
});