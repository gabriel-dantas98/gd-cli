const assert = require('assert');
const path = require('path');
const fs = require('fs');

const commandsDir = path.join(__dirname, '..', 'commands');
const commandFiles = fs.readdirSync(commandsDir).filter((f) => f.endsWith('.js'));

assert.ok(commandFiles.length >= 2, 'commands dir should expose aws and gcp');

for (const file of commandFiles) {
  const mod = require(path.join(commandsDir, file));
  assert.ok(mod.param_name, `${file} must export param_name`);
  assert.ok(mod.getInquirerAttr, `${file} must export getInquirerAttr`);
  const attr = mod.getInquirerAttr();
  assert.strictEqual(attr.name, mod.param_name);
  assert.ok(Array.isArray(attr.choices) && attr.choices.length > 0);
}

console.log(`smoke: ok (${commandFiles.length} commands)`);