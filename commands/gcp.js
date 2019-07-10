const Command = require('../core/command');

class GcpCommands extends Command {

    constructor(){
        super();
        this.param_name = "gcp";
        this.alias = "g"
        this.type = "command";
        this.description = "Command to manipulate GCP resources";
        this.action = this.gcpAction();
        this.default = this.helpMe();
        this.choices = ["help", "compute", "gke"];
    };

    gcpAction() {
        return { "compute": "manjado", "gke": "manjado2"};
    }

    helpMe() {
        return "TVN Metodology";
    }
};

module.exports = new GcpCommands();