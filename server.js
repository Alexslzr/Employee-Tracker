const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Babywhale22@',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );


function init(){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'query',
                message: 'what would you like to do',
                choices: ['View All Employees', 
                          'View All Roles',
                          'View All Departments',
                          'Add Employee',
                          'Add Role',
                          'Add a Department',
                          'Update Employee Role',
                          'Quit']
            }
        ]).then((response)=>{
            switch(response.query){
                case "View All Employees": viewAllEmp()
                break;
                case "View All Departments": viewAllDep()
                break;
                case "View All Roles": viewAllRole()
                break;
                case "Add Employee": addEmp()
                break;
                case "Add Role": addRole()
                break;
                case "Add a Department": addDep()
                break;
                case "Update Employee Role": updateEmpRole()
                break;
                case "Quit": 
                break;
            }
        })
}
        
function viewAllEmp(){
    db.query(`SELECT * FROM employee`, (err, res)=>{
        err ? console.error(err) : console.table(res) 
    })
}

function viewAllDep(){
    db.query(`SELECT * FROM department`, (err, res) => {
        err ? console.error(err) : console.table(res);
    })
}

function viewAllRole(){
    db.query(`SELECT * FROM role`, (err, res)=>{
        err ? console.error(err) : console.table(res)
    } )
}

function addEmp(){
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'firstName',
                message: 'Introduce First Name of Employee',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Introduce Last Name of Employee',
            },
            {
                type: 'input',
                name: 'role',
                message: 'please select a role',
                choices: ["Human Resources","Engineering","Sales","Finance"]
            },
            {
                type: 'input',
                name: 'role',
                message: 'Who is his/her manager',
                choices: ["Alejandro Salazar","Clarissa Jacobs","Graciela Caro","Joel Guzman"]
            },
        ).then(({firstName,lastName,role,manager}) => {
            db.query('INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES(?)',(err, res)=>{
                err ? console.error(err) : console.log('Employees Table Updated')
            })
        })
}

function addDep(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Please enter the new Department'
            }
        ]).then((response) =>{
            db.query(`INSERT INTO department(name) VALUES (?)`,response.department, (err,res)=>{
                err ? console.error(err) : console.log('Roles Table updated')
            })
        })
}

function addRole(){
    inquirer
        prompt([
            {
                type: "input",
                name: 'newrole',
                message: 'Please Enter the new role'
            },
            {
                type: "input",
                name: 'newrole',
                message: 'Please Enter the new role Salary'
            },
            {
                type: "input",
                name: 'dept_id',
                message: 'Please Enter the id(Number) of the Department which it belongs',
            },
        ]).then((response)=>{
            db.query('INSERT INTO role(title, salary, department_id) VALUES(?,?,?)',[response.newrole,response.salary,response.department],(err, res)=>{
                err ? console.error(err) : console.log('Roles table Updated');
            })
        })
}

function updateEmpRole(){

}

init();