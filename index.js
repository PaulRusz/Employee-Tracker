// Required modules
const { Pool } = require('pg');
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');


const Table = require('cli-table3');

// Express middleware
const app = express();

// 
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: "Ptr199101!",
    database: 'employee_tracker_db',
    port: 5432,
});

pool.connect();

pool.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + pool.threadId);
    afterConnection();
});

// function after connection is established and welcome image shows 
afterConnection = () => {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*        EMPLOYEE MANAGER         *")
    console.log("*                                 *")
    console.log("***********************************")
    displayMainMenu();
};

// Initialize an empty stack to store menu history
const menuHistory = [];

// Function to display the main menu
function displayMainMenu() {
    inquirer.prompt([
        // 
        {
            name: "menuOptions",
            type: "list",
            message: "What would you like to do?:",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", 'Back']

        },
    ])
        .then((answers) => {
            handleUserChoices(answers)
        })
}


//Start of the application logic here
function handleUserChoices(answers) {
    // Handles the user's selection
    if (answers.menuOptions === 'Back') {
        const previousMenu = menuHistory.pop()
        if (previousMenu) {
            previousMenu()
        }
        else {
            menuHistory.push(displayMainMenu);
        }
    } else {
        switch (answers.menuOptions) {
            case 'View All Departments':
                displayDepartments();
                break;
            case 'View All Roles':
                displayRoles();
                break;
            case 'View All Employees':
                displayEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateRole();
                break;
        }
    }
}


// Displays all departments
const departments = [
    { id: 1, name: "Finance" },
    { id: 2, name: "Sales" },
    { id: 3, name: "Software" },
];
// Displays all roles
const roles = [
    { id: 1, role: "Lawyer", department: "Software", salary: "$10,000" },
    { id: 2, role: "Office Manager", department: "Finance", salary: "$10,000" }
]
// Displays all employees
const employees = [
    { id: 1, firstName: "Paul", lastName: "Berkley", jobTitle: "Lawyer", department: "Software", reportingManager: "Sue Chrysler" },
    { id: 2, firstName: "Travis", lastName: "Stewart", jobTitle: "Office Manager", department: "Finance", reportingManager: "Christian Taylor" }
]



// Departments
function displayDepartments() {

    // Creates a new table to view Departments
    const departmentTable = new Table({
        head: ['ID', 'Department Name'],
        colWidths: [10, 20]
    })

    // Populate the table with department data
    departments.forEach(department => {
        departmentTable.push([department.id, department.name])
    })

    // Display Table
    console.log(departmentTable.toString())
}


// Roles
function displayRoles() {

    // Creates a table to view the roles
    const roleTable = new Table({
        head: ['ID', 'Role', 'Department Name', 'Salary'],
        colWidths: [10, 20]
    })
    roles.forEach(role => {
        roleTable.push([role.id, role.role, role.department, role.salary])
    })

    console.log(roleTable.toString())
}



// Employees
function displayEmployees() {

    // Creates table to view employees
    const employeeTable = new Table({
        head: ['ID', 'First Name', 'Last Name', 'Job Title', 'Department', 'Employee Manager'],
        colWidths: [10, 20],
    })
    employees.forEach(employee => {
        employeeTable.push([employee.id, employee.firstName, employee.lastName, employee.jobTitle, employee.department, employee.reportingManager])
    })

    console.log(employeeTable.toString())
}



// Adds a department to the database
function addDepartment() {

    // const departmentTable = new Table({
    //     head: ['ID', 'Department Name'],
    //     colWidths: [10, 20]
    // })

    // Populate the table with department data
    // departments.forEach(department => {
    //     departmentTable.push([department.id, department.name])
    // })

    inquirer.prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'Enter the name of the new department'
        }
    ]).then((answers) => {
        // const newDepartment = {
        //     //id: departments.length + 1,
        //     name: answers.departmentName
        // }

        pool.query(`INSERT INTO departments (department_name) VALUES ('${answers.departmentName}')`, (error, results) => {
            if (error) {
                console.error('Error executing query', error)
            } else {
                console.table('Success! New Department has been added.', results.rows)
            }
        })

        // departments.push(newDepartment)
        // departmentTable.push(newDepartment)
        // console.log(`The department ${newDepartment.name} has been added.`)

        // console.log(departmentTable.toString())
    })
}



// Adds a role to the database
function addRole() {
    inquirer.prompt([
        {
            name: 'roleName',
            type: 'input',
            message: "Enter the new role's name:",
        },
        {
            name: 'roleDepartment',
            type: 'input',
            message: "Enter the department the role will be a part of:"
        },
        {
            name: 'roleSalary',
            type: 'input',
            message: "Enter the role's salary:"
        },
    ]).then((answers) => {
        const newRole = {
            title: answers.roleName,
            salary: answers.roleSalary,
            department: answers.roleDepartment
        }

        pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${newRole.title}', ${newRole.salary}, ${newRole.department})`, (error, results) => {
            if (error) {
                console.error('Error executing query', error)
            } else {
                console.table('Success!  New Role has been added.', [results.rows])
            }
        })
    })
}


// Adds an employee to the database
function addEmployee() {

    inquirer.prompt([
        {
            name: 'addEmployeeFirstName',
            type: 'input',
            message: "Enter the new employee's First Name:",
        },
        {
            name: 'addEmployeeLastName',
            type: 'input',
            message: "Enter the employee's last name:"
        },
        {
            name: 'addEmployeeRole',
            type: 'input',
            message: "Enter the employee's role:"
        },
        {
            name: 'addEmployeeManager',
            type: 'input',
            message: "Enter the employee's manager:"
        }

    ]).then((answers) => {
        const newEmployee = {
            id: employees.length + 1,
            firstName: answers.employeeFirstName,
            lastName: answers.employeeLastName,
            role: answers.employeeRole,
            manager: answers.employeeManager
        }

        // roles.push(newEmployee)

        pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newEmployee.firstName}', '${newEmployee.lastName}', '${newEmployee.role}', '${newEmployee.manager}')`, (error, results) => {
            if (error) {
                console.error('Error executing query', error)
            } else {
                console.table('Success!  New Employee data has been added.', [results.rows])
            }
        })
        console.log('New employee added!')
    })
}



// Updates an employee role & updates role in the database
function updateRole(employeeId, newRoleId) {
    const updateEmployeeQuery = 'UPDATE employee SET role_id = $1 WHERE id = $2';
    const updateEmployeeValues = [newRoleId, employeeId];

    client.query(updateEmployeeQuery, updateEmployeeValues, (err, res) => {
        if (err) {
            console.error('Error updating employee role', err)
        } else {
            console.log('Employee role updated!')
        }
    })
}




// Calls the Main Menu
//displayMainMenu();






// do i need this?
// const fs = require('fs');

// function executeQueriesFromFile(db, filePath) {
//     const sqlQueries = fs.readFileSync(filePath, 'utf8').split(';');
//     sqlQueries.forEach((query) => {
//         db.query(query, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err);
//             } else {
//                 console.log('Query executed successfully.');
//             }
//         });
//     });
// }

// module.exports = {
//     executeQueriesFromFile,
// };