const commander = require('commander');

module.exports = class Command {
    constructor(param_name, alias, type, description, action, choices, default_value) {
        this.param_name = param_name;
        this.alias = alias;
        this.type = type;
        this.description = description;
        this.action = action;
        this.choices = choices;
        this.default = default_value;
    };

    getInquirerAttr(){
        return {
                type: "list",
                name: this.param_name,
                message: this.description,
                choices: this.choices,
            }
    }
};
