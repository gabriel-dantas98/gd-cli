const Command = require('../core/command/prompt');

class AwsCommands extends Command {

    constructor(){
        super();
        this.param_name = "aws";
        this.alias = "a";
        this.type = "command";
        this.description = "Command to manipulate AWS resources";
        this.action = this.awsAction();
        this.choices = ["ec2", "rds", "ssm"];
        this.default = this.helpMe(); 
    };

    awsAction(){
        return {"ec2": "Do a things using EC2", "ssm": "Automated using SSM, because it's annoyin to use"}; 
    };

    helpMe(){
        return "Help using AWS command!";
    }

};


module.exports = new AwsCommands();