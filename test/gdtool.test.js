const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { spawnSync } = require("node:child_process");

const root = path.join(__dirname, "..");

test("gdtool prints the same options and prompts the same lists", () => {
    const preload = path.join(os.tmpdir(), `gdcli-inquirer-preload-${process.pid}.js`);
    fs.writeFileSync(
        preload,
        [
            "const Module = require('module');",
            "const orig = Module.prototype.require;",
            "Module.prototype.require = function (id) {",
            "  if (id === 'inquirer') {",
            "    return {",
            "      prompt(questions) {",
            "        console.log('INQUIRER ' + JSON.stringify(questions));",
            "        return { then() {} };",
            "      },",
            "    };",
            "  }",
            "  return orig.apply(this, arguments);",
            "};",
            "",
        ].join("\n")
    );

    const result = spawnSync(process.execPath, ["-r", preload, path.join(root, "gdtool.js")], {
        encoding: "utf8",
        cwd: root,
    });

    fs.unlinkSync(preload);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(
        result.stdout,
        [
            "-a, --aws <command>  Command to manipulate AWS resources [object Object] undefined",
            "-g, --gcp <command>  Command to manipulate GCP resources [object Object] undefined",
            'INQUIRER [{"type":"list","name":"aws","message":"Command to manipulate AWS resources","choices":["ec2","rds","ssm"]},{"type":"list","name":"gcp","message":"Command to manipulate GCP resources","choices":["help","compute","gke"]}]',
            "",
        ].join("\n")
    );
    assert.equal(result.stderr, "");
});
