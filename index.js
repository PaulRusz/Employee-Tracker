// Required modules
const mysql = require('mysql')
const inquirer = require('inquirer')

const Table = require('cli-table3')


// Establishes a database connection
//
//
//
// need to figure out my username/password
//
//
//
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'employee_tracker_db'
})

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.message);
        return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);

    // Perform database operations using the 'connection' object

    // Close the connection when done
    connection.end((err) => {
        if (err) {
            console.error('Error closing database connection: ' + err.message);
        } else {
            console.log('Database connection closed.');
        }

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
                const departments = [
                    { id: 1, name: "Finance" },
                    { id: 2, name: "Sales" },
                    { id: 3, name: "Software" },
                ];

                // Creates a new table
                const table = new Table({
                    head: ['ID', 'Department Name'],
                    colWidths: [10, 20]
                })

                // Populate the table with department data
                departments.forEach(department => {
                    table.push([department.id, department.name])
                })

                // Display Table
                console.log(table.toString())


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
})
