const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: 'localhost',
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
                message: 'What would you like to do?',
                choices: ['View All Employees', 
                          'View All Roles',
                          'View All Departments',
                          'Add Employee',
                          'Add Role',
                          'Add a Department',
                          'Update Employee Role',
                          'Update Employee Manager',
                          /*'Delete an Employee',*/
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
                case "Update Employee Manager": updateEmpManager()
                break;
              /*  case "Delete an Employee": deleteEmp()
                break;*/
                case "Quit": process.exit(0)
                break;
            }
        })
}
        
function viewAllEmp(){
    db.promise().query(`select employee.id as ID,employee.first_name as FirstName, employee.last_name as LastName,role.title as Role , role.salary as Salary,department.name AS Department, employee.manager_id
                FROM employee 
                JOIN role ON employee.role_id=role.id 
                JOIN department on department.id=role.department_id;`).then(([rows])=>{
                        console.table(rows);   
                        init();
    })
    
}

function viewAllDep(){
    db.promise().query(`SELECT * FROM department`).then(([rows]) => {
        console.table(rows);
        init();
    })
}

function viewAllRole(){
    db.promise().query(`SELECT role.id, role.title as Role, role.salary as Salary, department.name as Department FROM role JOIN department on role.department_id=department.id`).then(([rows])=>{
        console.table(rows);
        init();
    })
    init();
}
//need to fix
function addEmp(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Introduce First Name of Employee'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Introduce Last Name of Employee'
            },
            {
                type: 'input',
                name: 'role',
                message: 'please enter the id number of the role of the new employee'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Please enter the id number of the manager of the new employee'
            },
        ]).then(({firstName,lastName,role,manager}) => {
            db.query('INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)',[firstName,lastName,role,manager], (err,res)=>{
                console.log('Employees Table Updated')
                init();
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
        ]).then(({department}) =>{
            db.query(`INSERT INTO department(name) VALUES (?)`,department, (err,res)=>{
                console.log('department added')
                init();
            })
        })
}

function addRole(){
    inquirer
        .prompt([
            {
                type: "input",
                name: 'newrole',
                message: 'Please Enter the new role'
            },
            {
                type: "input",
                name: 'salary',
                message: 'Please Enter the new role Salary'
            },
            {
                type: "input",
                name: 'department',
                message: 'Please Enter the id(Number) of the Department which it belongs'
            },
            ]).then(({newrole,salary,department})=>{
                db.query(`INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`,[newrole,salary,department], (err,res)=>{
                    console.log('Roles table Updated')
                    init();
                })
            })   
}

//need to fix
function updateEmpRole(){
    inquirer
        .prompt([
            {
                type: "input",
                name: 'employee',
                message: 'please enter the first name of the employee to update'
            },
            {
                type: "input",
                name: 'roleId',
                message: 'Please Enter the id of the new role of the employee',
            }
        ]).then(({employee,roleId})=>{
            db.query(`UPDATE employee SET role_id = ? WHERE first_name = "?"`,[employee,roleId], (err,res)=>{
                console.log(`Role updated for ${employee}`)
                init();
            })
        })
}

function updateEmpManager(){
    inquirer
        .prompt([{
            type: "input",
            name: 'employee',
            message: 'please enter the first name of the employee to update'
        },
        {
            type: "input",
            name: 'managerId',
            message: 'Please Enter the id of the new Manager of the employee or set it ',
        }
    ]).then(({employee,managerId})=>{
        db.query(`UPDATE employee SET manager_id = ? WHERE first_name = "?"`,[managerId,employee], (err,res)=>{
            console.log(`Manager updated for ${employee}`)
            init();
        })   
    })
}

/*
function deleteEmp(){
    inquirer
        .prompt([{
            type: "input",
            name: 'employee',
            message: 'please enter the first name of the employee to delete'
        }
    ]).then(({employee})=>{
        db.query('DELETE employee WHERE first_name = ?',[employee],(err,res)=>{
            err ? console.error(err) : console.log(`${employee} deleted from database`)
        })
    })
    init();
}
*/
init();