const inquirer = require("inquirer");
const commander = require("commander");
const path = require("path");
const fs = require("fs");

const promptCommand = require("./core/command/prompt");
const inquirerCommand = require("./core/command/inquirer");

// Full path name commands dir 
const commandsDir = path.join(__dirname, 'commands');

const requireCommand = (file) => {
// Gets a command file from the command directory and require that

    let file_without_extension = file.replace(".js", "");

    return require(`./commands/${file_without_extension}`);
}

const initPromptCommands = async (commands) =>  {
    const program = new commander.Command();
    
    commands.forEach(element => {
        console.log(`-${element.alias}, --${element.param_name} <${element.type}>  ${element.description} ${element.action} ${element.default_value}`);
        program.option(`-${element.alias}, --${element.param_name} <${element.type}>`, element.description, element.action, element.default_value);
    });        

    program.parse(process.argv);

    return program;
}

const initInquirerCommands = async (commands) => {
    
    inquirer.prompt(commands).then(optionSelected => { console.log(optionSelected); });
    
};

const initTool = async (commandsPrompt, commandsInquirer ) => {
    let promptCommands = await initPromptCommands(commandsPrompt);
    let inquirerCommands = await initInquirerCommands(commandsInquirer);
    console.log(inquirerCommands);
}

// Self invoke function to start process the import all and init cli interface
(() => {

    fs.readdir(commandsDir, (err, files) => {
        if (err) console.log("Deu ruim, só não tava bom!");
        
        var requiredCommands = files.map(requireCommand); 
        var commandsInquirerAttr = requiredCommands.map((command) => { return command.getInquirerAttr();})
    
        // *** TEST IMPORT's ***
        // requiredCommands.forEach(element => {
        //     console.log(`${element.constructor.name} is imported!`);
        // });

        initTool(requiredCommands, commandsInquirerAttr);
    });
})();

