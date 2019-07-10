const commander = require('commander');
const program = new commander.Command();

program
  .option('-f, --float <number>', 'float argument', () => { console.log("F") })
  .option('-i, --integer <number>', 'integer argument', () => { console.log("f") })
  .option('-v, --verbose', 'verbosity that can be increased', () => { console.log("v") }, 0)
  .option('-c, --collect <value>', 'repeatable value', () => { console.log("c") }, [])
  .option('-l, --list <items>', 'comma separated list', () => { console.log("l") });

program.parse(process.argv);