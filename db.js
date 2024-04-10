// Required modules
const mysql = require('mylsql')
const inquirer = require('inquirer')


// Establishes a database connection
//
//
//
// need to figure out my username/password
//
//
//
const connection = mysql.createconnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'employee_tracker_db'
})

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database')

    //Start of the application logic here
    inquirer.createPromptModule([
        // 
        {
            name: "menuOptions",
            type: "list",
            message: "What would you like to do?:",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]

        },
    ]).then((answers) => {
        // Handles the user's selection
        if (answers.menuOptions === 'View All Departments') {
            // Displays all departments
            console.log('Displaying all departments')

        } else if (answers.menuOptions === 'View All Roles') {
            // Displays all roles
            console.log('Displaying all roles')

        } else if (answers.menuOptions === 'View All Employees') {
            // Displays all employees
            console.log('Displaying employees')

        } else if (answers.menuOptions === 'Add a Department') {
            // Adds a department
            console.log('Please add a department')

        } else if (answers.menuOptions === 'Add a Role') {
            // Adds a role
            console.log('Please add a role')

        } else if (answers.menuOptions === 'Add an Employee') {
            // Adds an employee
            console.log('Please add an employee')

        } else if (answers.menuOptions === 'Update an Employee Role') {
            // Updates an employee role
            console.log('Please update the employees role')
        }
    })

})