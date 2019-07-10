const inquirer = require('inquirer');

inquirer
.prompt([
  {
    type: 'list',
    name: 'reptiles',
    message: 'Which reptiles do you love?',
    choices: [
      'aws', 'gcp', 'iot', 'home',
    ],
  },
])
.then(answers => {
  console.info('Answer:', answers.reptiles);
  secondStep(answers.reptiles);

});

const secondStep = (option) => {
  if(option === "aws"){
    callInquirer(["ec2", "ssm", "rds"]);
  }
  else if (option == "gcp") {
    callInquirer(["compute", "sql", "storage"])
  }
};


const callInquirer  = (choices) => {

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