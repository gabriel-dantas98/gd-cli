const inquirer = require("inquirer");

module.exports = class Inquirer {
    constructor(name, message, choices) {
        this.type = "list",
        this.name = name,
        this.message = message,
        this.choices = choices
    }

    showOptions(){
            
        inquirer
        .prompt([
            {
            type: 'list',
            name: 'reptiles',
            message: 'Which reptiles do you love?',
            choices: choices,
            },
        ])
        .then(answers => {
            console.info('Answer:', answers.reptiles);
        });   
    }
}