// Import
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/managerClass');
const Engineer = require('./lib/engineerClass');
const Intern = require('./lib/internClass');

// Variables
var managerQuestions = ['What is the manager\'s name?', 'What is the manager\'s employee ID?', 'What is the manager\'s email address?', 'What is the manager\'s office number?'];
var engineerQuestions = ['What is the engineer\'s name?', 'What is the engineer\'s employee ID?', 'What is the engineer\'s email address?', 'What is the engineer\'s Github link?'];
var internQuestions = ['What is the intern\'s name?', 'What is the intern\'s employee ID?', 'What is the intern\'s email address?', 'What is the intern\'s school?'];

var employeeSelection = '';
var newEmployee;

// HTML Skeleton
var htmlSkeletonStart = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
</head>
<header>
    <div class='flex' id="headerBox">
        <h1 id="header">My Team</h1>
    </div>
</header>
<body>
  <div class="flex" id="teamBox">
`
var htmlSkeletonEnd = `  
  </div>
</body>
</html>
`
// Functions
function createHTML(data) {
    fs.writeFile('index.html', data, (err) =>
      err ? console.log(err) : console.log('Congratulations, your HTML file was successfully created')
    );
}

function appendEmployeeCard() {
  var htmlEmployeeCard = `
        <div class = 'employeeCard flex'>
            <div class = 'cardTop flex'>
                <h1>${newEmployee.getName()}</h1>
                <h2>${newEmployee.getRole()}</h2>
            </div>
            <div class = 'cardBottom flex'>
                <p>ID: ${newEmployee.getID()}</p>
                <p>E-mail:<a href="mailto:${newEmployee.getEmail()}"> ${newEmployee.getEmail()}</a></p>
${appendEmployeeSpecific()}
            </div>
        </div>
`;

htmlSkeletonStart += htmlEmployeeCard;
}

function appendEmployeeSpecific(){
  if(newEmployee.getRole() == 'Manager'){
    return (`                <p>Office Number: ${newEmployee.getOfficeNumber()}</p>`);
  }
  else if(newEmployee.getRole() == 'Engineer'){
    return (`                <p>Github Link: <a href="${newEmployee.getGithub()}">${newEmployee.getGithub()}</a></p>`);
  }
  else if(newEmployee.getRole() == 'Intern'){
    return (`                <p>School: ${newEmployee.getSchool()}</p>`);
  }
}

function managerFunction(){
 inquirer
 .prompt([
    {
        type: 'input',
        name: 'managerName',
        message: managerQuestions[0],
    },
    {
      type: 'input',
      name: 'managerID',
      message: managerQuestions[1],
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: managerQuestions[2],
    },
    {
      type: 'input',
      name: 'managerOffice',
      message: managerQuestions[3],
    }
 ])
 .then((data) => {
  newEmployee = new Manager(data.managerName, data.managerID, data.managerEmail, data.managerOffice);
  appendEmployeeCard();
  addEmployee();
 })
 
}

function engineerFunction(){
  inquirer
  .prompt([
    {
        type: 'input',
        name: 'engineerName',
        message: engineerQuestions[0],
    },
    {
      type: 'input',
      name: 'engineerID',
      message: engineerQuestions[1],
    },
    {
      type: 'input',
      name: 'engineerEmail',
      message: engineerQuestions[2],
    },
    {
      type: 'input',
      name: 'engineerGithub',
      message: engineerQuestions[3],
    }
 ])
 .then((data) => {
  newEmployee = new Engineer(data.engineerName, data.engineerID, data.engineerEmail, data.engineerGithub)
  appendEmployeeCard();
  addEmployee();
 })
}

function internFunction(){
  inquirer
  .prompt([
    {
        type: 'input',
        name: 'internName',
        message: internQuestions[0],
    },
    {
      type: 'input',
      name: 'internID',
      message: internQuestions[1],
    },
    {
      type: 'input',
      name: 'internEmail',
      message: internQuestions[2],
    },
    {
      type: 'input',
      name: 'internSchool',
      message: internQuestions[3],
    }
 ])
 .then((data) => {
  newEmployee = new Intern(data.internName, data.internID, data.internEmail, data.internSchool)
  appendEmployeeCard();
  addEmployee();
})
}

function addEmployee(){
  inquirer
  .prompt([
    {
        type: 'list',
        name: 'addEmployeePrompt',
        message: 'Would you like to add an Engineer, Intern, or finish?',
        choices: ['Engineer', 'Intern', 'Finish']
    },
  ])
  .then((data) => {
    employeeSelection = data.addEmployeePrompt;
    if(employeeSelection == 'Engineer'){
      employeeType = 'Engineer'
      engineerFunction();
    }
    else if (employeeSelection == 'Intern'){
      employeeType = 'Intern'
      internFunction();
    }
    else {
      htmlSkeletonStart += htmlSkeletonEnd;
      createHTML(htmlSkeletonStart);
      console.log(htmlSkeletonStart);
    }
  })
}

function init(){
  managerFunction();
}

init();