const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const aws = require("../commands/aws");
const gcp = require("../commands/gcp");

test("command directory stays the modules gdtool loads", () => {
    const files = fs.readdirSync(path.join(__dirname, "..", "commands")).sort();
    assert.deepEqual(files, ["aws.js", "gcp.js"]);
});

test("aws command keeps its commander and inquirer contract", () => {
    assert.equal(aws.alias, "a");
    assert.equal(aws.param_name, "aws");
    assert.equal(aws.type, "command");
    assert.equal(aws.description, "Command to manipulate AWS resources");
    assert.deepEqual(aws.action, {
        ec2: "Do a things using EC2",
        ssm: "Automated using SSM, because it's annoyin to use",
    });
    assert.deepEqual(aws.choices, ["ec2", "rds", "ssm"]);
    assert.equal(aws.default, "Help using AWS command!");
    assert.deepEqual(aws.getInquirerAttr(), {
        type: "list",
        name: "aws",
        message: "Command to manipulate AWS resources",
        choices: ["ec2", "rds", "ssm"],
    });
});

test("gcp command keeps its commander and inquirer contract", () => {
    assert.equal(gcp.alias, "g");
    assert.equal(gcp.param_name, "gcp");
    assert.equal(gcp.type, "command");
    assert.equal(gcp.description, "Command to manipulate GCP resources");
    assert.deepEqual(gcp.action, {
        compute: "manjado",
        gke: "manjado2",
    });
    assert.deepEqual(gcp.choices, ["help", "compute", "gke"]);
    assert.equal(gcp.default, "TVN Metodology");
    assert.deepEqual(gcp.getInquirerAttr(), {
        type: "list",
        name: "gcp",
        message: "Command to manipulate GCP resources",
        choices: ["help", "compute", "gke"],
    });
});

test("loading commands does not pull unused SDKs", () => {
    const loaded = Object.keys(require.cache);
    for (const forbidden of ["aws-sdk", "@google-cloud/compute", "lodash", "commander"]) {
        const hit = loaded.filter((file) => file.includes(`/node_modules/${forbidden}/`));
        assert.deepEqual(hit, [], forbidden);
    }
});

test("package dependencies are only the CLI runtime", () => {
    const pkg = require("../package.json");
    assert.deepEqual(Object.keys(pkg.dependencies).sort(), ["commander", "inquirer"]);
});
